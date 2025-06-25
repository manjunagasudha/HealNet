import { useState, useEffect } from 'react';

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput('');
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600 text-center">
          🗨️ Counselor Chat
        </h1>

        <div
          id="chat-box"
          className="border h-80 p-4 rounded-md overflow-y-auto bg-gray-50 mb-4"
        >
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet. Say hi 👋</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg mb-2 w-fit"
              >
                {msg}
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-md px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

