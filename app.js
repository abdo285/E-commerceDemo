// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use(cartRoutes);

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://abdoelbeherey:ETavG9Ft9NlaTe6d@cluster0.s22lsm6.mongodb.net/myEcommerceDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
