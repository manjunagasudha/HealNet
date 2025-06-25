const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
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

    } catch (err) {
        console.error(err);
    }
}

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
