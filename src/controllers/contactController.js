const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/email');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    try {
      await sendContactEmail(contact);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      data: { id: contact._id }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const { status, limit, page } = req.query;
    const query = {};
    
    if (status) query.status = status;
    
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    
    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Contact.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      { status },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};