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