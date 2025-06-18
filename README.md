João Vitor & Cecilia Cardoso

# Sistema de Controle de Acesso ao Estacionamento

Este sistema foi desenvolvido como parte do curso Técnico em Desenvolvimento de Sistemas do SENAI. Ele permite o controle de entrada e saída de veículos em estacionamentos, com gerenciamento de usuários, visitantes, registros e logs.

## 🧠 Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- Registro de veículos por tipo de usuário (aluno, colaborador, guarita)
- Cadastro e controle de visitantes
- Registro de entradas e saídas
- Logs administrativos
- Interface responsiva com painel separado por tipo de usuário

## ⚙️ Tecnologias Utilizadas

- Backend: Node.js, Express, Sequelize ORM
- Frontend: React + Vite
- Banco de Dados: PostgreSQL (Supabase)
- Segurança: JWT, bcrypt, dotenv

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL ou conta no Supabase
- Git instalado

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

2. Configure o .env no backend:
```bash
PORT=3001
DATABASE_URL=URL_DO_SUPABASE
JWT_SECRET=sua_chave_jwt

3. Instale as dependências do backend e inicie:
```bash
cd backend
npm install
npm run dev

4. Instale as dependências do frontend e inicie:
```bash
cd ../frontend
npm install
npm run dev

5. Acesse o frontend em http://localhost:5173 e o backend em http://localhost:3001

## 🗃️ Estrutura de Pastas
```bash
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── config/
  ├── server.js
  └── .env

/frontend
  ├── components/
  ├── pages/
  ├── styles/
  ├── App.jsx
  └── main.jsx


