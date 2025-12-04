const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
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

app.use("/api", router);

const PORT = process.env.PORT || 6000;

// Start server after DB bootstrap so errors are visible
(async () => {
	try {
		await db.createTables();
		await db.createIndexes();

		app.listen(PORT, () => console.log(`Backend berjalan di port ${PORT}`));
	} catch (err) {
		console.error("Failed to start backend:", err);
		process.exit(1);
	}
})();
