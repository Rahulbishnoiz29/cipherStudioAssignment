const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

let projects = {}; // temporary in-memory store

// Load project by ID
router.get("/load/:projectId", (req, res) => {
  const { projectId } = req.params;
  const project = projects[projectId];
  if (project) {
    res.json({ success: true, files: project.files });
  } else {
    res.json({ success: false });
  }
});

// Save project
router.post("/save", (req, res) => {
  const { projectId, files } = req.body;
  if (!projectId || !files) return res.status(400).json({ success: false, message: "Missing data" });
  projects[projectId] = { files };
  res.json({ success: true });
});

module.exports = router;
