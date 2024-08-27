const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ruix Backend API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

require('dotenv').config();