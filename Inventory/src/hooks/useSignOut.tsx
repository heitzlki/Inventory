import { getAuth, signOut as signOutFirebase } from 'firebase/auth';

const auth = getAuth();

export const useSignOut = () => {
  async function signOut() {
    try {
      await signOutFirebase(auth);
    } catch (error: any) {
      console.log(error);
    }
  }

  return {
    signOut,
  };
};
