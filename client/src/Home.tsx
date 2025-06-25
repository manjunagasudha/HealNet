import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './firebase';

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

  useEffect(() => {
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = () => {
    if (!title.trim() || !description.trim()) return;

    const newResource = { title, description };
    fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newResource),
    })
      .then((res) => res.json())
      .then(() => {
     setResources([...resources, newResource]);
     setTitle('');
     setDescription('');
    toast.success('Resource added successfully!');
})

      
  };

  return (
  <>
    <Toaster position="top-center" />
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <h1 className="text-4xl font-bold text-center mb-4 text-indigo-600">
        HealNet - Resources
      </h1>

      <div className="mb-4">
        {user ? (
          <div className="bg-green-100 text-green-800 p-3 rounded-md">
            ✅ Logged in anonymously as: <strong>{user.uid}</strong>
          </div>
        ) : (
          <p>Loading user...</p>
        )}
      </div>

      {/* Add Resource Form */}
      <div className="mb-8">
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

      {/* Resources List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">📚 Resources</h2>
        {resources.length === 0 ? (
          <p className="text-gray-500 animate-pulse">⏳ Loading resources...</p>
        ) : (
          <ul className="space-y-4">
            {resources.map((resource, index) => (
              <li
                key={index}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold">{resource.title}</h3>
                <p className="text-gray-600">{resource.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Emergency Contacts */}
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
  </>
);

