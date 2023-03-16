import type { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../../lib/prismadb';
import { serverAuth } from '../../../lib/serverAuth';

type Data = {
    message : string
} | any



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getMovieById(req,res);
    
        default:
            return res.status(400).end()
    }
    
    
}

async function getMovieById(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        await serverAuth(req);
        const {movieId} = req.query
        if (typeof movieId !== 'string'){
            return res.status(400).json({message: 'Invalid ID'})
        }
        if(!movieId) {
            return res.status(400).json({message: 'Invalid ID'})
        }
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })
        
        if(!movie) {
            return res.status(400).json({message: `Movie doesn't exists`})
        }
        return res.status(200).json(movie)

    } catch (error) {
        console.log(error)
        return res.status(400).end()

    }
}
