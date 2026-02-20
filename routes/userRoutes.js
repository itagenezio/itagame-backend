const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET /api/users
router.get('/', (req, res) => {
  res.json({ message: 'Lista de usuários', users: [] });
});

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    const hash = await bcrypt.hash(password, 10);
    res.status(201).json({ message: 'Usuário criado!', user: { name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha obrigatórios' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ message: 'Login realizado!', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;