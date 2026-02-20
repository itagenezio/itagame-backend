const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ITAGAME Backend rodando!' });
});

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'ITAGAME API - Online!' });
});

// Exporta para o Vercel
module.exports = app;

// Roda local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}