# Bootcamp Testing ADSO — Semana 2

**Estudiante:** Nico Sogamoso  
**Repositorio:** https://github.com/NicoSogamoso/Bootcamp-Semanas-v2.git  

## Descripción

Entregable de la **Semana 2 — Pruebas unitarias con AAA y umbral en CI**.

Incluye:
- Tests unitarios con patrón **AAA** (Arrange, Act, Assert)
- Valores límite y tests parametrizados
- Mutaciones documentadas
- Workflow de GitHub Actions que exige umbral de cobertura ≥ 30%
- Matriz de rotación de capas

## Stack

| Capa     | Tecnología              |
|----------|-------------------------|
| Frontend | React + Vite + Vitest   |
| Backend  | Express + Vitest        |
| CI       | GitHub Actions          |

## Estructura

```
semana2-bootcamp/
├── frontend/          # React + lógica pura + tests unitarios
├── backend/           # Express + servicio de negocio + tests unitarios
├── docs/
│   └── matriz-rotacion.md
├── .github/workflows/
│   └── tests.yml
└── README.md
```

## Cómo correr localmente

### Frontend
```bash
cd frontend
pnpm install
pnpm test
```

### Backend
```bash
cd backend
pnpm install
pnpm test
```

## Requisitos cumplidos (Semana 2)

- [x] Columna S2 de la matriz con capas distintas
- [x] ≥ 3 tests unitarios por capa sobre reglas reales
- [x] Mutante documentado
- [x] `.github/workflows/tests.yml` funcional
- [x] Umbral de cobertura ≥ 30% en frontend y backend
- [x] Tests deterministas (FIRST)
- [x] Valores límite y tests parametrizados

## Autor

Nico Sogamoso — Bootcamp Testing ADSO
