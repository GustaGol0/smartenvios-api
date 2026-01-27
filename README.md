# 📦 SmartEnvios API

API RESTful desenvolvida para o desafio técnico da SmartEnvios. O sistema gerencia Leads e Intenções de Frete, com validação de dados, documentação automática e testes unitários.

## 🚀 Tecnologias

- **Node.js** + **Express** (Servidor)
- **TypeScript** (Tipagem e segurança)
- **Prisma ORM** + **SQLite** (Banco de Dados)
- **Zod** (Validação de dados rigorosa)
- **Nodemailer** + **Ethereal** (Envio de emails fake)
- **Vitest** (Testes Unitários)
- **Swagger** (Documentação Interativa)

## 🛠️ Como Rodar o Projeto

### 1. Instalação e Configuração

```bash
# Clone o repositório (Substitua pelo seu link se precisar)
git clone https://github.com/GustaGol0/smartenvios-api.git
cd smartenvios-api

# Instale as dependências
npm install

# Configure o Banco de Dados (SQLite)
npx prisma migrate dev --name init
```

### 2. Executando a API

```bash
# Inicie o servidor em modo de desenvolvimento
npm run dev
```
O servidor iniciará em: `http://localhost:3000`

## 📖 Documentação (Swagger)

A API possui documentação interativa. Após rodar o servidor, acesse:
👉 **http://localhost:3000/docs**

Lá você pode testar as rotas diretamente pelo navegador.

## 🧪 Testes Unitários

Para garantir a qualidade do código e a regra de negócio (não duplicar emails), rode:

```bash
npm test
```

## 📍 Rotas Principais

| Método | Rota          | Descrição                                      |
|:-------|:--------------|:-----------------------------------------------|
| **POST** | `/intentions` | Cria uma intenção de frete (retorna o ID).     |
| **POST** | `/leads`      | Cadastra um lead e vincula à intenção (Email). |
| **GET** | `/leads`      | Lista todos os leads e seus pedidos.           |

---
Feito com 💜 por Gustavo