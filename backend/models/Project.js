const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  files: [fileSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);
