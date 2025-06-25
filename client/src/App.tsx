import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">HealNet</div>
        <div className="flex gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/chat" className="hover:underline">
            Counselor Chat
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm py-4 text-gray-500">
        © 2025 HealNet. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
