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

## How to run tests

8. Follow the steps in the last section
9. Configure the `.env.test` file using the `.env.example` file 
10. Run all migrations

```bash
npm run test:migration-generate
```

11. Run test:

```bash
npm run test
```

## Building and starting for production

```bash
npm run build
npm start
```
