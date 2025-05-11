
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const flp = require("flp");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// File storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Welcome to the FLP file transfer server!");
});

// Upload route
app.post("/upload", upload.single("flp"), (req, res) => {
  const password = Math.random().toString(36).slice(2, 8); // 6-char key
  const uploadedFilePath = req.file.path;

  // Parse the FLP file using the `flp` library
  flp.parseFile(uploadedFilePath, (err, projectInfo) => {
    if (err) {
      console.error("FLP parse error:", err);
      return res.status(500).json({ error: "Failed to parse FLP file" });
    }

    // write to file 
    const effectPlugins = [...new Set(projectInfo.effectPlugins)];
    const sampleList = [...new Set(projectInfo.sampleList)]
    const data = {
      password,
      filename: req.file.filename,
      effectPlugins, // parsed metadata like project name, tempo, etc.
      sampleList,
    };

    // Save mapping to a JSON file
    fs.writeFileSync(`uploads/${password}.json`, JSON.stringify(data, null, 2));

    // Send response with both password and metadata
    res.json({ password, effectPlugins });
  });
});

// Download route
app.get("/download/:password", (req, res) => {
  const pass = req.params.password;
  try {
    const mapping = JSON.parse(fs.readFileSync(`uploads/${pass}.json`, "utf8"));
    res.download(path.join(__dirname, "uploads", mapping.filename));
  } catch {
    res.status(404).json({ error: "File not found" });
  }
});
app.get('/info/:password', (req, res) => {
  const pass = req.params.password;
  try {
    const mapping = JSON.parse(fs.readFileSync(`uploads/${pass}.json`, "utf8"));
    res.json({
      effectPlugins: mapping.effectPlugins || [],
      sampleList: mapping.sampleList || []
    });
  } catch {
    res.status(404).json({ error: "File not found" });
  }
});// Corrected listen statement
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
