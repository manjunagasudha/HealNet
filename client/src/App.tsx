import { useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './firebase';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Chat from './Chat'; // ✅ Import Chat Component

type Resource = {
  _id?: string;
  title: string;
  description: string;
};

type EmergencyContact = {
  name: string;
  contact: string;
};

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const backendUrl = 'https://healnet-y6tm.onrender.com/api/resources';

  const emergencyContacts: EmergencyContact[] = [
    { name: 'Women Helpline', contact: '181' },
    { name: 'Police', contact: '100' },
    { name: 'Mental Health Helpline', contact: '080-4611-0007' },
    { name: 'Child Helpline', contact: '1098' },
    { name: 'Emergency Ambulance', contact: '108' },
  ];

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

  // ✅ Fetch Resources
  useEffect(() => {
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Add Resource Handler
  const handleAdd = () => {
    if (!title.trim() || !description.trim()) return;

    const newResource = { title, description };
    fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newResource),
    })
      .then((res) => res.json())
      .then((savedResource) => {
        setResources([...resources, savedResource]);
        setTitle('');
        setDescription('');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">

        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
          HealNet
        </h1>

        <nav className="flex justify-center gap-6 mb-8">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link to="/chat" className="text-indigo-600 hover:underline">
            Counselor Chat
          </Link>
        </nav>

        {user ? (
          <div className="bg-green-100 text-green-800 p-3 rounded-md mb-6">
            ✅ Logged in anonymously as: <strong>{user.uid}</strong>
          </div>
        ) : (
          <p>Loading user...</p>
        )}

        {/* ➕ Add Resource */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">➕ Add Resource</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Title"
              className="flex-1 border rounded-md p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="flex-1 border rounded-md p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={handleAdd}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* 📚 Resources */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">📚 Resources</h2>
          {resources.length === 0 ? (
            <p className="text-gray-500">No resources yet. Add one above!</p>
          ) : (
            <ul className="space-y-4">
              {resources.map((resource) => (
                <li
                  key={resource._id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold">{resource.title}</h3>
                  <p className="text-gray-600">{resource.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🚑 Emergency Contacts */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">🚑 Emergency Contacts</h2>
          <ul className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <li
                key={index}
                className="border rounded-lg p-4 bg-red-50 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{contact.name}</h3>
                <p className="text-red-700 font-mono text-lg">
                  📞 {contact.contact}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ✅ App with Routing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
