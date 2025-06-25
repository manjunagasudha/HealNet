import { useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './firebase';

type Resource = {
  id?: number;
  title: string;
  description: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);

  // ✅ Firebase Anonymous Login
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

  // ✅ Fetch Resources from Backend
  useEffect(() => {
    fetch('https://healnet-y6tm.onrender.com')  // 🔥 Replace with your backend URL
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">HealNet</h1>

      {user ? (
        <p className="mb-4">
          ✅ Logged in anonymously as: <strong>{user.uid}</strong>
        </p>
      ) : (
        <p>Loading user...</p>
      )}

      <h2 className="text-2xl font-semibold mt-5 mb-2">📚 Resources</h2>
      <ul className="list-disc pl-5">
        {resources.map((resource, index) => (
          <li key={index}>
            <strong>{resource.title}</strong>: {resource.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
