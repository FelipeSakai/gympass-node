# GymPass API

API REST para gerenciamento de usuarios, academias e check-ins, desenvolvida como projeto de estudo de backend com foco em autenticacao, regras de negocio, arquitetura em camadas e cobertura de testes.

## Destaques do projeto

- autenticacao com JWT e refresh token via cookie
- autorizacao por papel de usuario (`MEMBER` e `ADMIN`)
- busca de academias por texto e por proximidade geografica
- regras de negocio para check-in, historico, metricas e validacao
- documentacao interativa com Swagger
- testes unitarios e end-to-end com Vitest

## Stack

- Node.js
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Vitest
- Swagger

## O que este projeto demonstra

- organizacao de API em rotas, controllers, services e repositories
- validacao de dados e variaveis de ambiente
- uso de banco relacional com Prisma ORM
- separacao entre regras de negocio e camada HTTP
- testes cobrindo casos de sucesso e regras de excecao

## Funcionalidades

- cadastro de usuarios
- login com emissao de token JWT
- renovacao de token com refresh token em cookie
- consulta do perfil do usuario autenticado
- criacao de academias por usuarios administradores
- busca de academias por nome
- listagem de academias proximas por latitude e longitude
- realizacao de check-in em academia
- consulta de historico de check-ins
- consulta de metricas de check-ins do usuario
- validacao de check-in por administradores

## Requisitos

- Node.js 20+
- Docker e Docker Compose
- npm

## Configuracao local

1. Instale as dependencias:

```bash
npm install
```

2. Suba o banco PostgreSQL:

```bash
docker compose up -d
```

3. Crie o arquivo de ambiente a partir do exemplo:

```bash
copy .env.example .env
```

4. Preencha a variavel `JWT_SECRET` no arquivo `.env`.

5. Rode as migracoes do banco:

```bash
npx prisma migrate dev
```

## Como executar

Ambiente de desenvolvimento:

```bash
npm run start:dev
```

Build de producao:

```bash
npm run build
npm start
```

- API local: `http://localhost:3333`
- Swagger UI: `http://localhost:3333/docs`

## Scripts

- `npm run start:dev`: inicia a API em modo desenvolvimento
- `npm run build`: gera a build em `build/`
- `npm start`: executa a build gerada
- `npm run test`: roda os testes unitarios
- `npm run test:e2e`: roda os testes end-to-end
- `npm run test:watch`: executa os testes em modo watch
- `npm run test:coverage`: gera cobertura de testes

## Variaveis de ambiente

Exemplo em `.env.example`:

```env
NODE_ENV=dev
PORT=3333
JWT_SECRET=your-secret
DATABASE_URL="postgresql://docker:docker@localhost:5433/apisolid?schema=public"
```

## Rotas principais

### Usuarios

- `POST /users`
- `POST /sessions`
- `PATCH /token/refresh`
- `GET /me`

### Academias

- `GET /gyms/search`
- `GET /gyms/nearby`
- `POST /gyms`

### Check-ins

- `POST /gyms/:gymId/checkIns`
- `PATCH /checkIns/:checkInId/validate`
- `GET /checkIns/metrics`
- `GET /checkIns/history`

## Testes

O projeto possui:

- testes unitarios em `src/services`
- testes end-to-end em `src/http/controllers`

Para executar:

```bash
npm run test
npm run test:e2e
```
