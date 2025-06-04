##🧭 Metodologia de Desenvolvimento (MVP)

##🔧 Stack definida:

Backend: Node.js + Express
Frontend: Reac
Banco de Dados: PostgreSQL
ORM: Sequelize (recomendado)
Autenticação: JWT + Bcrypt
Deploy opcional: Render, Vercel ou Railway

##🧩 Fases do Projeto

| Fase | Objetivo                                                             |
| ---- | -------------------------------------------------------------------- |
| 1    | Planejamento e estrutura base do projeto                             |
| 2    | Modelagem do banco com Sequelize                                     |
| 3    | Criação das rotas de autenticação e cadastro de usuário (com perfis) |
| 4    | CRUD de veículos vinculados ao usuário                               |
| 5    | Registro de acessos (entrada/saída) com validações                   |
| 6    | Log de ações e painel administrativo                                 |
| 7    | Cadastro avulso de visitantes (perfil guarita)                       |
| 8    | Conexão com frontend (React) e testes                                |

## Documentação do que foi feito até o momento;

1. Visão Geral do Projeto
Este projeto tem como objetivo desenvolver um sistema digital de controle de acesso ao estacionamento da unidade SENAI São José. Ele permite o gerenciamento de usuários, veículos, visitantes, registros de acesso e logs administrativos, proporcionando segurança, rastreabilidade e usabilidade para os operadores da guarita e usuários finais.

2. Tecnologias Utilizadas
- Backend: Node.js com Express
- Banco de Dados: PostgreSQL (via Supabase)
- ORM: Sequelize
- Autenticação: JWT + Bcrypt
- Ferramentas: Postman, GitHub, Nodemon, Dotenv

3. Funcionalidades Desenvolvidas
- Cadastro e login de usuários com autenticação JWT
- Controle de perfis (aluno, colaborador, guarita)
- Cadastro e gerenciamento de veículos vinculados ao usuário
- Registro de entrada e saída de veículos por placa
- Cadastro de visitantes exclusivo para perfil guarita
- Registro de logs administrativos (auditoria)
- Listagem de registros e visitantes

4. Estrutura do Projeto Backend
├── controllers/
│   ├── authController.js
│   ├── veiculoController.js
│   ├── registroAcessoController.js
│   ├── visitanteController.js
│   └── logAdminController.js
├── routes/
│   ├── authRoutes.js
│   ├── veiculoRoutes.js
│   ├── registroAcessoRoutes.js
│   ├── visitanteRoutes.js
│   └── logAdminRoutes.js
├── models/
│   ├── Usuario.js
│   ├── Veiculo.js
│   ├── RegistroAcesso.js
│   ├── Visitante.js
│   └── LogAdmin.js
├── middlewares/
│   ├── authMiddleware.js
│   └── logMiddleware.js
├── config/
│   └── database.js
├── utils/
│   └── generateToken.js
├── .env
├── app.js / server.js

5. Testes Realizados
- Cadastro e login testados via Postman com token retornado corretamente
- Cadastro e listagem de veículos autenticados
- Registro de entrada e saída por placa
- Cadastro de visitante e listagem restrita ao perfil de guarita
- Logs de ações sensíveis verificados com autor, ação e timestamp
