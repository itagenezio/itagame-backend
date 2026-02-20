const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET /api/users
router.get('/', (req, res) => {
  res.json({ message: 'Lista de usuarios', users: [] });
});

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Campos obrigatorios faltando' });
    }
    const hash = await bcrypt.hash(password, 10);
    res.status(201).json({ message: 'Usuario criado!', user: { name, email, role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha obrigatorios' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({
      message: 'Login realizado!',
      token,
      user: {
        name: email.split('@')[0],
        email: email,
        role: 'student'
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;