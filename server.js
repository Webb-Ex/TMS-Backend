const express = require('express'); 
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDB = require("./config/dbConnection");

// Connect to database
connectDB();

// Create Express app
const app = express();

// Body Parser Middleware
app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
const userForPointRoutes = require("./routes/userForPointRoutes");
const pointManagerRoutes = require("./routes/pointManagerRoutes");
const pointDriverRoutes = require("./routes/pointDriverRoutes");
const vehicleInfoRoutes = require("./routes/vehicleInfoRoutes");
const riderRoutes = require("./routes/riderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const rideDetailsRoutes = require("./routes/rideDetailsRoutes");
const rideDetailsPointRoutes = require("./routes/rideDetailsPointRoutes");

// // Mount routes
app.use("/api", userRoutes);
app.use("/api", userForPointRoutes);
app.use("/api", pointManagerRoutes);
app.use("/api", pointDriverRoutes);
app.use("/api", vehicleInfoRoutes);
app.use("/api", riderRoutes);
app.use("/api", addressRoutes);
app.use("/api", rideDetailsRoutes);
app.use("/api", rideDetailsPointRoutes);

// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});