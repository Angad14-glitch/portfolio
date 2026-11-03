const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    
    if (category) query.category = category;
    
    const skills = await Skill.find(query)
      .sort({ category: 1, order: 1, proficiency: -1 })
      .lean();
    
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    res.json({ success: true, data: grouped, all: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id, isActive: true }).lean();
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: Object.values(error.errors).map(e => e.message) });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: Object.values(error.errors).map(e => e.message) });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true }
    );
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, message: 'Skill deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};