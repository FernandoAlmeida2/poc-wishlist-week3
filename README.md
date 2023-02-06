# poc-wishlist

Back-end for a series wishlist poc.

## About

CRUD for a Series Wishlist API.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want

4. Configure the `.env` file using the `.env.example` file
5. Run all migrations

```bash
npm run dev:migration-generate
```

6. Seed db

```bash
npm run prisma:seed
```

7. Run the back-end in a development environment:

```bash
npm run dev
```

## Building and starting for production

```bash
npm run build
npm start
```
