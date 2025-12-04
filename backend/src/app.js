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

db.createTables();
db.createIndexes();

app.use("/api", router);

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend berjalan di port ${PORT}`));
