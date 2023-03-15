import type { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '../../lib/prismadb'
import { serverAuth } from '../../lib/serverAuth';


type Data = {
    message: string
} | any

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            
        try {
            await serverAuth(req)
            const movieCount = await prismadb.movie.count();
            const randomIndex = Math.floor(Math.random() * movieCount)
            const randomMovies = await prismadb.movie.findMany({
                take:1 ,
                skip : randomIndex
            })

            return res.status(200).json(randomMovies[0]);
        } catch (error) {
            console.log(error)
            return res.status(404).end()

        }

    
        default:
           return res.status(404).end()
    }
    
    
}