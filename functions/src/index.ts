import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// Example CPA postback: /cpa-postback?uid=USER_ID&amount=100
export const cpaPostback = functions.https.onRequest(async (req, res) => {
  const { uid, amount } = req.query;
  if (!uid || !amount) {
    res.status(400).send('Missing uid or amount');
    return;
  }
  const userRef = db.collection('users').doc(uid as string);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    res.status(404).send('User not found');
    return;
  }
  const userData = userSnap.data();
  const earned = Number(amount);
  // Update user balance
  await userRef.update({
    balance: admin.firestore.FieldValue.increment(earned),
  });
  // Handle referral bonus
  if (userData?.referrerId) {
    const referrerRef = db.collection('users').doc(userData.referrerId);
    await referrerRef.update({
      balance: admin.firestore.FieldValue.increment(Math.floor(earned * 0.1)),
      referrals: admin.firestore.FieldValue.arrayUnion(uid),
    });
  }
  res.status(200).send('OK');
});

// Secret key for postback validation
const POSTBACK_SECRET = 'P@55w0rdForPostback2025';

export const postback = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'GET') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const {
      network,
      subid,
      virtual_currency,
      reward,
      password,
      lead_id,
    } = req.query;

    // Log incoming request
    console.log('Received postback:', req.query);

    // Security: Check password
    if (password !== POSTBACK_SECRET) {
      console.warn('Invalid password for postback:', password);
      res.status(403).send('Forbidden');
      return;
    }

    // Validate required parameters
    if (!network || !subid) {
      res.status(400).send('Missing network or subid');
      return;
    }

    // Determine points field and value
    let points: number | undefined;
    if (network === 'cpalead') {
      points = Number(virtual_currency);
    } else {
      points = Number(reward);
    }

    if (!points || isNaN(points) || points <= 0) {
      res.status(400).send('Invalid or missing points value');
      return;
    }

    // Prevent double-crediting using lead_id
    if (lead_id) {
      const convRef = db.collection('conversions').doc(lead_id as string);
      const convSnap = await convRef.get();
      if (convSnap.exists) {
        console.log('Duplicate conversion:', lead_id);
        res.status(200).send('OK');
        return;
      }
      // Mark this conversion as processed
      await convRef.set({
        subid,
        network,
        points,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    // Atomically increment user's points
    const userRef = db.collection('users').doc(subid as string);
    await db.runTransaction(async (transaction) => {
      const userSnap = await transaction.get(userRef);
      if (!userSnap.exists) {
        throw new functions.https.HttpsError('not-found', 'User not found');
      }
      transaction.update(userRef, {
        points: admin.firestore.FieldValue.increment(points),
      });
    });

    console.log(
      `Credited ${points} points to user ${subid} for network ${network}`
    );
    res.status(200).send('OK');
  } catch (error: any) {
    console.error('Postback error:', error);
    if (error instanceof functions.https.HttpsError && error.code === 'not-found') {
      res.status(404).send('User not found');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
}); 