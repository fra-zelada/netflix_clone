import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import prismadb  from '../../../lib/prismadb'

import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { compare } from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'



export const authOptions:NextAuthOptions ={
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_id || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type:'text'
                },
                password: {
                    label: 'Password',
                    type:'password'
                },
            },
            async authorize( credentials) {
                if( !credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required");
                }
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user.hashPassword) {
                    throw new Error("Email does not exist");
                    
                }
                const isCorrectPassword = await compare(credentials.password, user.hashPassword)
                
                if (!isCorrectPassword) {
                    throw new Error("Incorrect Password");
                    
                }
                return user;
            }

        }),
        
    ],
    pages: {
        signIn: '/auth'
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt'
    },
    // jwt: {
    //     secret : process.env.NEXTAUTH_JWT_SECRET
    // },
    // secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)