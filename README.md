# Arquivo da Máscara

Projeto React + Node/Express + MongoDB Atlas para criação de fichas.

## Rodar localmente

### Backend

```bash
cd backend
npm install
npm run dev
```

Crie `backend/.env` com base em `backend/.env.example`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Crie `frontend/.env` com:

```env
VITE_API_URL=http://localhost:5000/api
```

## Recuperação de senha com Gmail SMTP

No backend, configure:

```env
FRONTEND_URL=http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_senha_de_app_do_google
EMAIL_FROM=Arquivo da Máscara <seuemail@gmail.com>
```

Use uma **senha de app** do Google, não a senha normal da sua conta.

Caminho no Google:

1. Ative a verificação em duas etapas da conta Google.
2. Acesse Segurança > Senhas de app.
3. Gere uma senha de app para o projeto.
4. Cole essa senha em `EMAIL_PASS`.

## Funcionalidades de e-mail incluídas

- E-mail de boas-vindas ao criar conta.
- Link de recuperação de senha.
- Aviso de senha alterada.

O link de recuperação expira em 1 hora.
