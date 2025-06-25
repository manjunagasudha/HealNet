import { useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">HealNet</h1>
      {user ? (
        <p>Logged in anonymously as: <strong>{user.uid}</strong></p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

