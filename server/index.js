const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const http = require('http');
const { WebSocketServer } = require('ws');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ MongoDB Connected');

    const db = client.db('HealNet');
    const resources = db.collection('resources');

    // API Routes
    app.get('/', (req, res) => {
      res.send('HealNet Backend is Running ✅');
    });

    app.get('/api/resources', async (req, res) => {
      const data = await resources.find().toArray();
      res.json(data);
    });

    app.post('/api/resources', async (req, res) => {
      const newResource = req.body;
      const result = await resources.insertOne(newResource);
      res.json(result);
    });

    // WebSocket Setup
    const server = http.createServer(app);
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
      console.log('🟢 New client connected');

      ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast message to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            client.send(message.toString());
          }
        });
      });

      ws.on('close', () => {
        console.log('🔴 Client disconnected');
      });
    });

    const PORT = process.env.PORT || 10000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ DB Connection Error:', err);
  }
}

connectDB();
