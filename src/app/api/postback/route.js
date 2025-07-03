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

    const subid = searchParams.get('subid');
    const virtual_currency = searchParams.get('virtual_currency');
    const password = searchParams.get('password');

    // Security: Check password
    if (password !== 'P@55w0rdForPostback2025') {
      return NextResponse.json(
        { error: 'Forbidden: Invalid password' },
        { status: 403 }
      );
    }

    // Validate required parameters
    if (!subid || !virtual_currency || isNaN(Number(virtual_currency))) {
      return NextResponse.json(
        { error: 'Missing or invalid subid or virtual_currency' },
        { status: 400 }
      );
    }

    // Reference to the user document
    const userRef = db.collection('users').doc(subid);

    // Atomically increment robuxBalance
    await userRef.update({
      robuxBalance: FieldValue.increment(Number(virtual_currency)),
    });

    return NextResponse.json({ success: true, credited: Number(virtual_currency) });
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