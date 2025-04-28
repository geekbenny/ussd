const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const Queue = require('./Queue');
const connectDB = require('./config/db');
connectDB();
const path = require('path');
const ussdRoutesPath = path.join(__dirname, '..', 'routes', 'ussdRoutes.js');

// Debugging line - will show the exact path being used
console.log('Looking for ussdRoutes at:', ussdRoutesPath); 

try {
  const ussdRoutes = require(ussdRoutesPath);
} catch (err) {
  console.error('Failed to require ussdRoutes:', err);
  process.exit(1);
}

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
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', ussdRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
