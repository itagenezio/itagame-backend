const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');
const User = require('./src/models/User');
const Course = require('./src/models/Course');
const userRoutes = require('./src/routes/userRoutes');
const courseRoutes = require('./src/routes/courseRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'Servidor rodando com sucesso!' });
});

// Sincronizar banco de dados
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Banco de dados sincronizado!');
}).catch(err => {
  console.error('❌ Erro ao sincronizar banco:', err);
});

// Porta
const PORT = process.env.PORT || 5000;
// Para rodar local
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/api/health`);
    console.log(`Rotas disponíveis:`);
    console.log(`   - POST /api/users/register`);
    console.log(`   - POST /api/users/login`);
    console.log(`   - GET /api/users`);
    console.log(`   - POST /api/courses`);
    console.log(`   - GET /api/courses`);
  });
}

module.exports = app;
  console.log(`   - POST /api/users/register`);
  console.log(`   - POST /api/users/login`);
  console.log(`   - GET /api/users`);
  console.log(`   - POST /api/courses`);
  console.log(`   - GET /api/courses`);
});