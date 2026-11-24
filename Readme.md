# BugDiário - Backend

API REST em Node.js + Express + Mongoose para registrar bugs (CRUD completo).

## Como rodar
1. Instale as dependências: `npm install`
2. Copie `.env.example` para `.env` e preencha `MONGO_URI` com a conexão do MongoDB Atlas
3. Inicie: `node server.js`
4. A API sobe em http://localhost:3000

## Rotas
- POST /bugs - cadastrar
- GET /bugs - listar
- GET /bugs/:id - buscar um
- PUT /bugs/:id - editar
- DELETE /bugs/:id - excluir

Frontend: https://github.com/cidolla/bugdiario-app