# Netflix Clone

![](https://res.cloudinary.com/dwvkka6mz/image/upload/v1679001456/github/Dise%C3%B1o_sin_t%C3%ADtulo_10_ll9xrh.png)

[Live Demo](https://netflix-clone-eight-tawny.vercel.app/) 

Sitio web utilizando **React / Next.js** & **Typescript**. Se han empleado las librerías de **Tailwind CSS** para los estilos, **NextAuth** para la autenticación, **Prisma** para la creación de esquemas de BD y **Zustand** para la gestión de estados.

Proyecto basado en el ejemplo del canal de Youtube de [Code With Antonio](https://www.youtube.com/watch?v=mqUN4N2q4qY&ab_channel=CodeWithAntonio) 

Adicionalmente a lo del video, se agregó :
- Botón y página de búsqueda
- Interfaces
- Configuración de **Docker** y guía para levantar el entorno
- API Seed para poblar datos de prueba


# Configuración del entorno

### 1. Creación de variables de Entorno
Crear archivo `.env`, o reenombrar el archivo `.env.TEMPLATE` a `.env` y completarlo con los siguientes valores : 

| VARIABLE_NAME        | VARIABLE_VALUE                        | DESCRIPTION                                  |
|-|-|-|
| DATABASE_URL         | mongodb://localhost:27017/netflix_clone      | URL de BD Mongo
| NEXTAUTH_JWT_SECRET  | mysecretkey                           | Clave secreta utilizada por NextAuth.js       |
| NEXTAUTH_SECRET      | anothersecretkey                      | Clave secreta utilizada por NextAuth.js       |
| GITHUB_ID            |                             | ID de aplicación de GitHub para autenticación |
| GITHUB_SECRET        |                          | Clave secreta de aplicación de GitHub         |
| GOOGLE_CLIENT_ID     |  | ID de cliente de Google para autenticación    |
| GOOGLE_CLIENT_SECRET |                         | Clave secreta de cliente de Google            |


### 2. Configurar base de datos Mongo con Docker
Para utilizar la aplicación conectándose a una base de datos Mongo mediante Docker, es necesario que la base de datos tenga activadas las réplicas (no es necesario para Mongo Atlas). Si no se activa, se arrojará el siguiente error al hacer transacciones: "Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set".

Para configurar la base de datos, crea un archivo `docker-compose.yml` en la raíz del proyecto con el siguiente contenido:

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

### 3. Inicializar la base de datos Mongo
Para inicializar la base de datos, ejecuta el siguiente comando:

```
docker compose up -d
```

### 4. Conectarse a la terminal
Para conectarte a la terminal de la base de datos, ejecuta el siguiente comando:
```
docker exec -it DB_NETFLIX mongosh
```

### 5. Configurar la replicación de la base de datos
Dentro de la terminal de la base de datos, ejecuta el siguiente comando para configurar la replicación:

```
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})
```

### 6. Reiniciar el contenedor
Reinicia el contenedor para aplicar los cambios. No será necesario hacer el paso anterior nuevamente.

### 7. Crear los esquemas en la base de datos
Para crear los esquemas en la base de datos, ejecuta el siguiente comando desde la raiz del proyecto:
```
npx prisma db push
```

### 8. Conectar a la base de datos a través de un cliente
Conéctate a la base de datos a través de un cliente como, por ejemplo, Mongo Compass DB, con la siguiente URL: `mongodb://localhost:27017/netflix_clone`

### 9. Comprobar que se haya creado el esquema
Verifica que se haya creado el esquema correctamente.

![](https://res.cloudinary.com/dwvkka6mz/image/upload/v1679001181/github/httpsres.cloudinary.comdwvkka6mzimageuploadv1679000987Dise_C3_B1o_sin_t_C3_ADtulo_9_akmdxd.png_wnf9uo.png)


### 10. Levantar la aplicación
Levanta la aplicación local con el comando `npm run dev`. Puedes acceder a la aplicación en `http://localhost:3000/`

### 11. Poblar la Base de Datos
Para poblar con los datos de prueba se debe abrir en el navegador el siguiente enlace `http://localhost:3000/api/seed`

Listo :D
