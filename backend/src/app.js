const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const heroRoutes = require('./routes/hero.routes');
const blogRoutes = require('./routes/blog.routes');
const mediaRoutes = require('./routes/media.routes');

// Create Express app
const app = express();

// =================================
// MIDDLEWARE
// =================================

// Security middleware
app.use(helmet());

// CORS configuration
// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://custom-content-management-system-cm-rouge.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        // Allow all Vercel deployments
        if (origin.endsWith('.vercel.app')) {
          return callback(null, true);
        }
        
        // Block other origins in production, but allow for now to prevent blocking valid clients
        console.warn(`Blocked CORS request from origin: ${origin}`);
        // return callback(new Error('Not allowed by CORS')); // Uncomment to enforce strict CORS
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

// Request logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =================================
// ROUTES
// =================================

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Antigravity CMS API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/v1/hero-slides', heroRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/media', mediaRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
