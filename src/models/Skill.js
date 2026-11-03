const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'soft-skills', 'other'],
    default: 'other'
  },
  proficiency: {
    type: Number,
    required: [true, 'Proficiency level is required'],
    min: [0, 'Proficiency cannot be less than 0'],
    max: [100, 'Proficiency cannot exceed 100']
  },
  icon: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true,
    match: [/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color']
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

skillSchema.index({ category: 1, order: 1, proficiency: -1 });

module.exports = mongoose.model('Skill', skillSchema);