const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});

const app = express();
app.use(cors());
app.use(express.json());

// Resume routes
const resumeRoutes = require('./routes/resume');
app.use('/api/resumes', resumeRoutes);

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Suggestion routes
const suggestionRoutes = require('./routes/suggestion');
app.use('/api/suggestion', suggestionRoutes);

// PDF routes
const pdfRoutes = require('./routes/pdf');
app.use('/api/pdf', pdfRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Smart Resume Builder API is running');
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
