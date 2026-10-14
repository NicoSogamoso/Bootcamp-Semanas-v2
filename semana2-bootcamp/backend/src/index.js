import express from 'express';
import { validatePiece, ValidationError } from './service.js';

const app = express();
app.use(express.json());

const pieces = [];

app.get('/api/pieces', (_req, res) => {
  res.json(pieces);
});

app.post('/api/pieces', (req, res) => {
  try {
    const piece = validatePiece(req.body);
    const saved = { id: pieces.length + 1, ...piece };
    pieces.push(saved);
    res.status(201).json(saved);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ detail: err.message });
    }
    throw err;
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
