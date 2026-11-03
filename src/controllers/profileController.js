const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ isActive: true }).lean();
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const existing = await Profile.findOne({ isActive: true });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Profile already exists. Use PUT to update.' });
    }
    const profile = await Profile.create(req.body);
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: Object.values(error.errors).map(e => e.message) });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { isActive: true },
      req.body,
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: Object.values(error.errors).map(e => e.message) });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { isActive: true },
      { isActive: false },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, message: 'Profile deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};