import { useState } from 'react';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export const useSignUp = () => {
  const [error, setError] = useState('');

  async function signUp(email: string, password: string) {
    if (email.length === 0 || password.length === 0) {
      setError('Email and password cannot be empty');
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error?.message) {
        console.log(error?.message);

        setError(error?.message);
      }
    }
  }
  return { signUp, error };
};
