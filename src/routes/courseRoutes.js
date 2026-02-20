const express = require('express');
const CourseController = require('../controllers/CourseController');

const router = express.Router();

router.post('/', CourseController.create);
router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getById);
router.put('/:id', CourseController.update);
router.delete('/:id', CourseController.delete);

module.exports = router;