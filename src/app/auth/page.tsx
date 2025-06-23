"use client";

import React from "react";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, increment, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db, app } from '@/lib/firebase';
import { FcGoogle } from 'react-icons/fc';
import Link from "next/link";

const auth = getAuth(app);

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [referrerId, setReferrerId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setReferrerId(ref);
  }, [searchParams]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push('/dashboard');
    });
    return () => unsubscribe();
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!isLogin && password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCred.user.uid), {
          uid: userCred.user.uid,
          email,
          balance: 5,
          referrerId: referrerId || null,
          referrals: [],
          createdAt: serverTimestamp(),
        });
        if (referrerId) {
          await updateDoc(doc(db, 'users', referrerId), {
            balance: increment(10),
            referrals: arrayUnion(userCred.user.uid),
          });
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', userCred.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCred.user.uid), {
          uid: userCred.user.uid,
          email: userCred.user.email,
          balance: 5,
          referrerId: referrerId || null,
          referrals: [],
          createdAt: serverTimestamp(),
        });
        if (referrerId) {
          await updateDoc(doc(db, 'users', referrerId), {
            balance: increment(10),
            referrals: arrayUnion(userCred.user.uid),
          });
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${referrerId ? 'bg-green-50' : 'bg-main-bg-light'}`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${referrerId ? 'text-green-700' : 'text-primary-text-light'}`}>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
          <p className={`${referrerId ? 'text-green-700' : 'text-muted-text-light'}`}>{isLogin ? 'Welcome back!' : 'Create your account'}</p>
          {referrerId && (
            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                🎉 You&apos;re signing up with a referral! You and your referrer will get bonus rewards.
              </p>
            </div>
          )}
        </div>

        <div className={`rounded-lg p-6 mb-4 ${referrerId ? 'bg-green-50' : 'bg-card-bg-light'}`}>
          {error && (
            <p className="text-red-600 text-sm mb-2 text-center font-medium">{error}</p>
          )}
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-1 ${referrerId ? 'text-green-700' : 'text-primary-text-light'}`}>Email</label>
              <input
                id="email"
                type="email"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${referrerId ? 'border-green-200 bg-green-50 text-green-700 focus:ring-green-400' : 'border-border-light bg-card-bg-light text-primary-text-light focus:ring-accent'}`}
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-1 ${referrerId ? 'text-green-700' : 'text-primary-text-light'}`}>Password</label>
              <input
                id="password"
                type="password"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${referrerId ? 'border-green-200 bg-green-50 text-green-700 focus:ring-green-400' : 'border-border-light bg-card-bg-light text-primary-text-light focus:ring-accent'}`}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${referrerId ? 'text-green-700' : 'text-primary-text-light'}`}>Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${referrerId ? 'border-green-200 bg-green-50 text-green-700 focus:ring-green-400' : 'border-border-light bg-card-bg-light text-primary-text-light focus:ring-accent'}`}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${referrerId ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400' : 'bg-accent text-white hover:bg-accent/90 focus:ring-accent'}`}
            >
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${referrerId ? 'border-green-200' : 'border-border-light'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${referrerId ? 'text-green-700' : 'text-muted-text-light'}`}>or</span>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className={`w-full border py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 mb-6 transition-colors ${referrerId ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400' : 'bg-card-bg-light border-border-light text-primary-text-light hover:bg-hover-light'}`}
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="text-center">
          <button
            className={`text-accent font-semibold hover:underline transition`}
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>

        <Link href="/offerwall">
          <button className="px-6 py-3 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition">
            Complete Offers
          </button>
        </Link>
      </div>
    </div>
  );
} 