const express = require('express');
const bodyParser = require('body-parser');
const ussdRoutes = require('./routes/ussdRoutes');
const app = express();
const PORT = 3000;
const Queue = require('./Queue');
const connectDB = require('./config/db');
connectDB();

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/admin', async (req, res) => {
    const queues = await Queue.find().sort({ position: 1 });
    res.render('admin', { queues });
});
app.post('/admin/delete/:id', async (req, res) => {
    await Queue.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
});

// Connect to MongoDB
require('dotenv').config(); 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection failed:', err.message));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', ussdRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
