import { useState } from 'react';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export const useSignIn = () => {
  const [error, setError] = useState('');

  async function signIn(email: string, password: string) {
    if (email.length === 0 || password.length === 0) {
      setError('Email and password cannot be empty');
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error?.message) {
        console.log(error?.message);
        setError(error?.message);
      }
    }
  }
  return { signIn, error };
};
