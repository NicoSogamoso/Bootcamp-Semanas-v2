import { describe, expect, it } from 'vitest';
import { validatePiece, canReserve, ValidationError } from '../src/service.js';

describe('validatePiece', () => {
  // --- Happy path con AAA ---
  it('should return normalized piece when data is valid', () => {
    // Arrange
    const data = { name: '  Guernica  ', artist: 'Picasso', year: 1937 };

    // Act
    const piece = validatePiece(data, 2026);

    // Assert
    expect(piece).toEqual({ name: 'Guernica', artist: 'Picasso', year: 1937 });
  });

  // --- Boundary: año actual debe aceptarse ---
  it('should accept piece from the current year (boundary)', () => {
    // Arrange
    const data = { name: 'Recent', artist: 'Someone', year: 2026 };

    // Act
    const piece = validatePiece(data, 2026);

    // Assert
    expect(piece.year).toBe(2026);
  });

  // --- Mutante: si se cambia > por >= el test anterior falla ---

  // --- Partitions + valores límite parametrizados ---
  it.each([
    [{ name: '', artist: 'Picasso', year: 1937 }, 'name is required'],
    [{ name: '   ', artist: 'Picasso', year: 1937 }, 'name is required'],
    [{ name: '\t', artist: 'Picasso', year: 1937 }, 'name is required'],
    [{ name: 'Guernica', artist: '', year: 1937 }, 'artist is required'],
    [{ name: 'Guernica', artist: '  ', year: 1937 }, 'artist is required'],
    [{ name: 'Guernica', artist: 'Picasso', year: 0 }, 'year must be a positive integer'],
    [{ name: 'Guernica', artist: 'Picasso', year: -1 }, 'year must be a positive integer'],
    [{ name: 'Guernica', artist: 'Picasso', year: 1.5 }, 'year must be a positive integer'],
    [{ name: 'Guernica', artist: 'Picasso', year: 2027 }, 'year cannot be in the future'],
    [{ name: 'a'.repeat(101), artist: 'Picasso', year: 1937 }, 'name must be at most 100 characters'],
  ])('should throw ValidationError for %o → %s', (data, expectedMsg) => {
    expect(() => validatePiece(data, 2026)).toThrow(ValidationError);
    expect(() => validatePiece(data, 2026)).toThrow(expectedMsg);
  });

  it('should accept name of exactly 100 characters (boundary)', () => {
    const data = { name: 'a'.repeat(100), artist: 'Picasso', year: 1937 };
    const piece = validatePiece(data, 2026);
    expect(piece.name).toHaveLength(100);
  });
});

describe('canReserve', () => {
  it('should return true when stock is greater than zero', () => {
    // Arrange
    const stock = 5;

    // Act
    const result = canReserve(stock);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false when stock is zero (boundary)', () => {
    expect(canReserve(0)).toBe(false);
  });

  it('should return false when stock is negative', () => {
    expect(canReserve(-1)).toBe(false);
  });

  // Mutante documentado:
  // Cambié `stock > 0` por `stock >= 0` → el test "stock is zero" lo detecta.
});
