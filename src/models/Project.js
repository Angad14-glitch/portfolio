const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'api', 'other'],
    default: 'web'
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  images: [{
    url: { type: String, trim: true },
    alt: { type: String, trim: true }
  }],
  links: {
    live: { type: String, trim: true },
    github: { type: String, trim: true },
    demo: { type: String, trim: true }
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

projectSchema.index({ featured: -1, order: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);