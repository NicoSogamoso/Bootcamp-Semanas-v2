import { useState } from 'react';
import { validatePieceForm } from './validate-piece-form.js';

export default function App() {
  const [form, setForm] = useState({ name: '', artist: '', year: '' });
  const [error, setError] = useState('');
  const [pieces, setPieces] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = validatePieceForm(form);
    if (msg) {
      setError(msg);
      return;
    }
    setError('');
    setPieces([...pieces, { ...form, id: Date.now() }]);
    setForm({ name: '', artist: '', year: '' });
  }

  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: 480, margin: '2rem auto' }}>
      <h1>Museo — Registrar pieza</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Artista</label>
          <input name="artist" value={form.artist} onChange={handleChange} />
        </div>
        <div>
          <label>Año</label>
          <input name="year" type="number" value={form.year} onChange={handleChange} />
        </div>
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        <button type="submit">Guardar</button>
      </form>
      <ul>
        {pieces.map((p) => (
          <li key={p.id}>
            {p.name} — {p.artist} ({p.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
