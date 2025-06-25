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
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

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
    fetch('https://healnet-y6tm.onrender.com/api/resources')  // ✅ Correct API Endpoint
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Add Resource to Backend
  const handleAddResource = () => {
    if (!newTitle || !newDescription) {
      alert('Please fill both title and description!');
      return;
    }

    fetch('https://healnet-y6tm.onrender.com/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, description: newDescription }),
    })
      .then((res) => res.json())
      .then((_data) => {
        setResources((prev) => [...prev, { title: newTitle, description: newDescription }]);
        setNewTitle('');
        setNewDescription('');
      })
      .catch((err) => console.error(err));
  };

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

      {/* ➕ Add Resource Form */}
      <div className="mt-4 mb-6">
        <h3 className="text-xl font-semibold mb-2">➕ Add Resource</h3>
        <input
          type="text"
          placeholder="Title"
          className="border px-2 py-1 mr-2"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border px-2 py-1 mr-2"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleAddResource}
        >
          Add
        </button>
      </div>

      {/* 📚 Resources List */}
      <h2 className="text-2xl font-semibold mb-2">📚 Resources</h2>
      {resources.length === 0 ? (
        <p>No resources yet. Add one above!</p>
      ) : (
        <ul className="list-disc pl-5">
          {resources.map((resource, index) => (
            <li key={index}>
              <strong>{resource.title}</strong>: {resource.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
