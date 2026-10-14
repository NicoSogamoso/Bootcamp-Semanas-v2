import { describe, expect, it } from 'vitest';
import { validatePieceForm } from '../src/validate-piece-form.js';

describe('validatePieceForm', () => {
  // --- Happy path ---
  it('should return empty string when all fields are valid', () => {
    // Arrange
    const values = { name: 'Guernica', artist: 'Picasso', year: 1937 };

    // Act
    const error = validatePieceForm(values);

    // Assert
    expect(error).toBe('');
  });

  // --- Partitions + boundary values with it.each ---
  it.each([
    [{ name: '', artist: 'Picasso', year: 1937 }, 'El nombre es obligatorio'],
    [{ name: '   ', artist: 'Picasso', year: 1937 }, 'El nombre es obligatorio'],
    [{ name: '\t', artist: 'Picasso', year: 1937 }, 'El nombre es obligatorio'],
    [{ name: 'Guernica', artist: '', year: 1937 }, 'El artista es obligatorio'],
    [{ name: 'Guernica', artist: '   ', year: 1937 }, 'El artista es obligatorio'],
    [{ name: 'Guernica', artist: 'Picasso', year: '' }, 'El año es obligatorio'],
    [{ name: 'Guernica', artist: 'Picasso', year: null }, 'El año es obligatorio'],
    [{ name: 'Guernica', artist: 'Picasso', year: 0 }, 'El año debe ser un número entero positivo'],
    [{ name: 'Guernica', artist: 'Picasso', year: -5 }, 'El año debe ser un número entero positivo'],
    [{ name: 'Guernica', artist: 'Picasso', year: 1.5 }, 'El año debe ser un número entero positivo'],
  ])('should return error for invalid values %o → %s', (values, expected) => {
    expect(validatePieceForm(values)).toBe(expected);
  });

  // --- Boundary: name length 100 vs 101 ---
  it('should accept name of exactly 100 characters (boundary)', () => {
    // Arrange
    const values = {
      name: 'a'.repeat(100),
      artist: 'Picasso',
      year: 1937,
    };

    // Act
    const error = validatePieceForm(values);

    // Assert
    expect(error).toBe('');
  });

  it('should reject name of 101 characters (boundary)', () => {
    // Arrange
    const values = {
      name: 'a'.repeat(101),
      artist: 'Picasso',
      year: 1937,
    };

    // Act
    const error = validatePieceForm(values);

    // Assert
    expect(error).toBe('El nombre admite máximo 100 caracteres');
  });

  // Mutante documentado:
  // Cambié `!name.trim()` por `!name` → el test de espacios detecta el mutante.
});
