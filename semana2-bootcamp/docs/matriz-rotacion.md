# Matriz de rotación de capas

| Integrante       | S1 (E2E) | S2          | Observaciones                          |
|------------------|----------|-------------|----------------------------------------|
| Nico Sogamoso    | E2E      | Front + API | Realizó tests unitarios en ambas capas y montó el CI |

## Cobertura semanal

| Parte     | Cobertura real S2 | Umbral fijado |
|-----------|-------------------|---------------|
| Frontend  | ~85%              | 30%           |
| Backend   | ~90%              | 30%           |

> El umbral se fija como el **mayor** entre 30 y la cobertura real redondeada hacia abajo.  
> En esta entrega se mantiene 30% como piso exigido por la semana.

## Regla de rama

- [x] Workflow `tests.yml` en `main`
- [x] Regla manual del grupo: **nadie fusiona un PR en rojo**
- (Si el repo es público se puede activar Ruleset de GitHub)

## Mutantes documentados

### Frontend (`validatePieceForm`)
- **Mutante:** cambié `name.trim()` por `name` (sin trim).
- **Test que lo detectó:** `should return error when name is only spaces`

### Backend (`validatePiece`)
- **Mutante:** cambié `year > currentYear` por `year >= currentYear`.
- **Test que lo detectó:** `should accept piece from the current year (boundary)`
