/**
 * Validación pura del formulario de pieza de museo.
 * Función pura: mismos inputs → mismo output. Sin React ni DOM.
 */
export function validatePieceForm({ name, artist, year }) {
  if (!name || !name.trim()) {
    return 'El nombre es obligatorio';
  }
  if (name.trim().length > 100) {
    return 'El nombre admite máximo 100 caracteres';
  }
  if (!artist || !artist.trim()) {
    return 'El artista es obligatorio';
  }
  if (year === undefined || year === null || year === '') {
    return 'El año es obligatorio';
  }
  const yearNum = Number(year);
  if (!Number.isInteger(yearNum) || yearNum < 1) {
    return 'El año debe ser un número entero positivo';
  }
  return '';
}
