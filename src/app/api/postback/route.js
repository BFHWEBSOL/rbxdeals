/* eslint-env node */
/* eslint-disable no-undef */
import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// --- Firebase Admin SDK Initialization (Safe Singleton) ---
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}
const db = getFirestore();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Accept both 'cid' and 'subid' as user ID
    const subid = searchParams.get('subid') || searchParams.get('cid');
    // Accept both 'virtual_currency' and 'payout' as credited amount
    const creditedAmount = searchParams.get('virtual_currency') || searchParams.get('payout');
    const password = searchParams.get('password');
    const offer_id = searchParams.get('offer_id');
    const txid = searchParams.get('txid');
    const status = searchParams.get('status');

    // Security: Check password
    if (password !== 'P@55w0rdForPostback2025') {
      return NextResponse.json(
        { error: 'Forbidden: Invalid password' },
        { status: 403 }
      );
    }

    // Validate required parameters
    if (!subid || !creditedAmount || isNaN(Number(creditedAmount))) {
      return NextResponse.json(
        { error: 'Missing or invalid subid/cid or payout/virtual_currency' },
        { status: 400 }
      );
    }

    // Reference to the user document
    const userRef = db.collection('users').doc(subid);

    // Atomically increment robuxBalance
    await userRef.update({
      robuxBalance: FieldValue.increment(Number(creditedAmount)),
    });

    return NextResponse.json({
      success: true,
      credited: Number(creditedAmount),
      user: subid,
      offer_id,
      txid,
      status
    });
  } catch (error) {
    // Handle user not found or other errors
    if (error.code === 5) { // Firestore 'not-found'
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 