import { useEffect, useRef, useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">🗨️ Counselor Chat</h1>

      <div className="border rounded-md p-4 h-80 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="mb-2 p-2 bg-indigo-100 rounded-md max-w-sm"
            >
              {msg}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded-md p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
