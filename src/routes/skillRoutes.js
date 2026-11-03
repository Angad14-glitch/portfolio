const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { validateSkill } = require('../middleware/validation');

router.get('/', skillController.getSkills);
router.get('/:id', skillController.getSkillById);
router.post('/', validateSkill, skillController.createSkill);
router.put('/:id', validateSkill, skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;