/**
 * Reglas de negocio puras del museo.
 * No depende de HTTP, BD ni del reloj del sistema.
 * currentYear se recibe por parámetro → tests deterministas (FIRST).
 */
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Valida y normaliza una pieza.
 * @param {object} data - { name, artist, year }
 * @param {number} [currentYear] - Año actual inyectado (default: new Date().getFullYear())
 * @returns {object} pieza normalizada
 */
export function validatePiece(data, currentYear = new Date().getFullYear()) {
  const name = (data.name ?? '').toString().trim();
  const artist = (data.artist ?? '').toString().trim();
  const year = Number(data.year);

  if (!name) {
    throw new ValidationError('name is required');
  }
  if (name.length > 100) {
    throw new ValidationError('name must be at most 100 characters');
  }
  if (!artist) {
    throw new ValidationError('artist is required');
  }
  if (!Number.isInteger(year) || year < 1) {
    throw new ValidationError('year must be a positive integer');
  }
  // Regla de negocio: el año no puede ser futuro
  if (year > currentYear) {
    throw new ValidationError('year cannot be in the future');
  }

  return { name, artist, year };
}

/**
 * Calcula si una pieza puede ser reservada (ejemplo de regla de stock).
 * stock > 0 → se puede reservar.
 */
export function canReserve(stock) {
  return Number(stock) > 0;
}
