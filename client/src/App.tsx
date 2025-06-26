import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between">
        <div className="text-2xl font-bold">HealNet</div>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/chat" className="hover:underline">Counselor Chat</Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
