Para utilizar la app conectandose a una db mongo + docker es necesario que la bd tenga activada las réplicas (no necesario para mongo atlas), si no se activa se arrojará el siguiente error al hacer transacciones: 
*Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set*

crear archivo `docker-compose.yml` (ya adjunto en este proyecto)

```
version: '3'

services:
  db:
    container_name: DB_NETFLIX
    image: mongo:6.0
    command: --replSet rs0
    volumes:
      - ./db_netflix:/data/db
    ports:
     - 27017:27017
     - 28017:28017
    restart: always
```

inicializar bd mongo

```
docker compose up -d
```

conectarse a la terminal
```
docker exec -it DB_NETFLIX mongosh
```

ejecutar siguiente comando
```
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})
```

reiniciar contenedor (no será necesario hacer el paso anterior nuevamente)

para crear los esquemas en la bd se debe ejecutar `npx prisma db push`



Conectar a bd a través de cliente `mongodb://localhost:27017/`



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
