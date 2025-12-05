const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./database/create-database");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files (if teacher uploads saved under backend/uploads)
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Global error logging to help debugging crashes
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

let router;

const PORT = process.env.PORT || 5000;

// Start server after DB bootstrap so errors are visible
(async () => {
  try {
    // Try database setup, but don't fail if it errors
    try {
      await db.createTables();
      await db.createIndexes();
      await db.insertSampleData();
      console.log("✅ Database tables and indexes created successfully");
    } catch (dbErr) {
      console.error(
        "⚠️  Database setup failed (continuing anyway):",
        dbErr.message
      );
      console.log("💡 Server will start without database connection");
      console.log("💡 Please check your .env file and database credentials");
    }

    // attempt to require router; if it fails, log and start server without routes
    try {
      router = require("./routes/router");
      app.use("/api", router);
      console.log("✅ API routes loaded successfully");
    } catch (rErr) {
      console.error(
        "Failed to load router, continuing without API routes:",
        rErr
      );
    }

    app.listen(PORT, () => {
      console.log(`\n🚀 Backend berjalan di port ${PORT}`);
      console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
      console.log(`📁 Uploads URL: http://localhost:${PORT}/uploads\n`);
    });
  } catch (err) {
    console.error("Failed to start backend (bootstrap error):", err);
    // Start server anyway on a fallback basis
    app.listen(PORT, () =>
      console.log(`Backend berjalan di port ${PORT} (dengan error)`)
    );
  }
})();
