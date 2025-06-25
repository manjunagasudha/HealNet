const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Dummy Resources API
app.get('/api/resources', (req, res) => {
  res.json([
    { id: 1, title: 'Mental Health Support', description: 'Get free counseling' },
    { id: 2, title: 'Emergency Help', description: 'Call 1098 for child help' },
  ]);
});

// Emergency Contacts API
app.get('/api/emergency-contacts', (req, res) => {
  res.json([
    { name: 'Women Helpline', contact: '181' },
    { name: 'Police', contact: '100' },
    { name: 'Mental Health', contact: '080-4611-0007' },
  ]);
});

// Start Server
app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});

app.get('/', (req, res) => {
  res.send('HealNet Backend is Running ✅');
});
