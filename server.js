const express = require('express');
require('./configurations/database'); // Import the Knex instance
const customerRoutes= require('./routes/customerRoutes');
const walletRoutes= require('./routes/walletRoutes');
const transactionRoutes= require('./routes/transactionRoutes');
const app = express();

/* app.get('/', async (req, res) => {
  try {
    // Example query to select all records from a table named 'users'
    const users = await db('users').select();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/customer', customerRoutes);
app.use('/wallet', walletRoutes);
app.use('/trans', transactionRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


