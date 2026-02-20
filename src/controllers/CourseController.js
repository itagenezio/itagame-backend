const Course = require('../models/Course');

class CourseController {
  static async create(req, res) {
    try {
      const { title, description, published } = req.body;
      const course = await Course.create({ title, description, published: published || false });
      res.status(201).json({ message: 'Curso criado!', course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const courses = await Course.findAll();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });
      await course.update(req.body);
      res.json({ message: 'Curso atualizado!', course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });
      await course.destroy();
      res.json({ message: 'Curso deletado!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CourseController;