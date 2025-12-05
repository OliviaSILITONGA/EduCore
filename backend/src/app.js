const express = require("express");
const cors = require("cors");
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

const PORT = process.env.PORT || 6000;

// Start server after DB bootstrap so errors are visible
(async () => {
	try {
		await db.createTables();
		await db.createIndexes();

		// attempt DB bootstrap
		// attempt to require router; if it fails, log and start server without routes
		try {
			router = require("./routes/router");
			app.use("/api", router);
		} catch (rErr) {
			console.error("Failed to load router, continuing without API routes:", rErr);
		}

		app.listen(PORT, () => console.log(`Backend berjalan di port ${PORT}`));
	} catch (err) {
		console.error("Failed to start backend (bootstrap error):", err);
		// don't exit immediately — keep process alive for debugging
	}
})();
