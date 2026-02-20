const express = require('express');
const router = express.Router();

// GET /api/courses
router.get('/', (req, res) => {
  res.json({ message: 'Lista de cursos', courses: [] });
});

// POST /api/courses
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Título obrigatório' });
  }
  res.status(201).json({ message: 'Curso criado!', course: { title, description } });
});

module.exports = router;