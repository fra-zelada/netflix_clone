import type { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../lib/prismadb';
import { serverAuth } from '../../lib/serverAuth';



type Data = {
    message: string
} | any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getFavoriteMovies(req, res);
    
        default:
        return res.status(400).end()
    
    }

}

const getFavoriteMovies = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    
    
    try {
    
        const { currentUser } = await serverAuth(req);
        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds
                }
            }
        })
    
        return res.status(200).json(favoriteMovies)
    
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Error al guardar' })
    
    }

}