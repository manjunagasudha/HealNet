import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Chat from './Chat';

function Home() {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">HealNet</h1>
        <nav className="flex justify-center gap-8 mb-6">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/chat" className="text-indigo-600 hover:underline">Counselor Chat</Link>
        </nav>

        <h2 className="text-2xl font-semibold mb-4">📚 Resources</h2>
        <p>👉 Resources content goes here</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">🚑 Emergency Contacts</h2>
        <ul className="space-y-2">
          <li>Women Helpline - 181</li>
          <li>Police - 100</li>
          <li>Mental Health - 080-4611-0007</li>
          <li>Child Helpline - 1098</li>
          <li>Ambulance - 108</li>
        </ul>
      </div>
    </div>
  );
}

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
