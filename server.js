const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Modelo: como um "Bug" é guardado no banco
const BugSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    causa: { type: String, default: '' },
    solucao: { type: String, default: '' },
    status: { type: String, enum: ['aberto', 'resolvido'], default: 'aberto' },
  },
  { timestamps: true }
);
const Bug = mongoose.model('Bug', BugSchema);

// CREATE - cadastrar
app.post('/bugs', async (req, res) => {
  try {
    const bug = await Bug.create(req.body);
    res.status(201).json(bug);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

// READ - listar todos
app.get('/bugs', async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
});

// READ - buscar um
app.get('/bugs/:id', async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ erro: 'Bug não encontrado' });
    res.json(bug);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

// UPDATE - editar
app.put('/bugs/:id', async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bug) return res.status(404).json({ erro: 'Bug não encontrado' });
    res.json(bug);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

// DELETE - excluir
app.delete('/bugs/:id', async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ erro: 'Bug não encontrado' });
    res.json({ mensagem: 'Bug excluído' });
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, '0.0.0.0', () => console.log(`API rodando na porta ${PORT}`));
  })
  .catch((e) => console.error('Erro ao conectar:', e.message));