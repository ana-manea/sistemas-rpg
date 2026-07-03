# Arquivo da Máscara — Criador de Fichas V5

Projeto React + Node/Express + MongoDB Atlas para recriar a navegação de consulta e permitir que usuários criem, editem, visualizem e excluam várias fichas.

## Estrutura

```txt
frontend/  React + Vite
backend/   Node.js + Express + MongoDB
```

## Rodar localmente

### 1. Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

No `.env`, preencha:

```env
PORT=5000
MONGODB_URI=sua_string_do_mongo_atlas
JWT_SECRET=um_segredo_grande
FRONTEND_URL=http://localhost:5173
```

### 2. Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

No `.env` do frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

Acesse: `http://localhost:5173`

## Render

### Backend como Web Service

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - `PORT`
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `FRONTEND_URL` com a URL final do frontend

### Frontend como Static Site

- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variable:
  - `VITE_API_URL=https://URL-DO-BACKEND.onrender.com/api`

## Funcionalidades prontas

- Cadastro
- Login com JWT
- Proteção de rotas
- Dashboard do usuário
- Criar várias fichas
- Editar ficha
- Visualizar ficha
- Excluir ficha
- Páginas de consulta com placeholders
- Layout escuro inspirado no estilo gótico do material antigo