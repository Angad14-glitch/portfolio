const { body, param, query } = require('express-validator');

const validateProfile = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name too long'),
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 150 }).withMessage('Title too long'),
  body('bio').trim().notEmpty().withMessage('Bio is required').isLength({ max: 2000 }).withMessage('Bio too long'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone too long'),
  body('location').optional().trim().isLength({ max: 100 }).withMessage('Location too long'),
  body('avatar').optional().trim().isURL().withMessage('Avatar must be a valid URL'),
  body('resumeUrl').optional().trim().isURL().withMessage('Resume URL must be valid'),
  body('socialLinks.github').optional().trim().isURL().withMessage('GitHub URL must be valid'),
  body('socialLinks.linkedin').optional().trim().isURL().withMessage('LinkedIn URL must be valid'),
  body('socialLinks.twitter').optional().trim().isURL().withMessage('Twitter URL must be valid'),
  body('socialLinks.website').optional().trim().isURL().withMessage('Website URL must be valid')
];

const validateProject = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title too long'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 2000 }).withMessage('Description too long'),
  body('shortDescription').optional().trim().isLength({ max: 300 }).withMessage('Short description too long'),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('technologies.*').optional().trim().isLength({ max: 50 }).withMessage('Technology name too long'),
  body('category').optional().isIn(['web', 'mobile', 'desktop', 'api', 'other']).withMessage('Invalid category'),
  body('status').optional().isIn(['completed', 'in-progress', 'planned']).withMessage('Invalid status'),
  body('featured').optional().isBoolean().withMessage('Featured must be boolean'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('images.*.url').optional().trim().isURL().withMessage('Image URL must be valid'),
  body('images.*.alt').optional().trim().isLength({ max: 100 }).withMessage('Alt text too long'),
  body('links.live').optional().trim().isURL().withMessage('Live URL must be valid'),
  body('links.github').optional().trim().isURL().withMessage('GitHub URL must be valid'),
  body('links.demo').optional().trim().isURL().withMessage('Demo URL must be valid'),
  body('startDate').optional().isISO8601().withMessage('Invalid start date'),
  body('endDate').optional().isISO8601().withMessage('Invalid end date'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const validateSkill = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name too long'),
  body('category').trim().notEmpty().withMessage('Category is required').isIn(['frontend', 'backend', 'database', 'devops', 'tools', 'soft-skills', 'other']).withMessage('Invalid category'),
  body('proficiency').notEmpty().withMessage('Proficiency is required').isInt({ min: 0, max: 100 }).withMessage('Proficiency must be 0-100'),
  body('icon').optional().trim().isLength({ max: 100 }).withMessage('Icon too long'),
  body('color').optional().trim().matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Color must be valid hex'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name too long'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }).withMessage('Subject too long'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }).withMessage('Message too long')
];

const validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format')
];

module.exports = {
  validateProfile,
  validateProject,
  validateSkill,
  validateContact,
  validateObjectId
};