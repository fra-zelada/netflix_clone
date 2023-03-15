// import { PrismaClient } from "@prisma/client";
// 
// 
// const client = global.prismadb || new PrismaClient() ;
// if ( process.env.NODE_ENV == 'production') global.prismadb = client;
// 
// export default client; 

import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let prismadb: PrismaClient ;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prismadb = new PrismaClient();
  } else {
    if (!global.prismadb) {
      global.prismadb = new PrismaClient();
    }

    prismadb = global.prismadb;
  }
}

export default prismadb;