import { without } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../lib/prismadb';
import { serverAuth } from '../../lib/serverAuth';

type Data = {
    message: string
} | any


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createFavorite(req, res);
        case 'DELETE' :
            return deleteFavorite(req, res);
        default:
        return res.status(400).end();
     
    }

}

const createFavorite = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    
    try {
        const { currentUser } = await serverAuth(req);
        const { movieId } = req.body;
        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!existingMovie)
            res.status(400).json({ message: 'Invalid id' })
    
        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || ''
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        })

        res.status(200).json(user);
    
    } catch (error) {
        return res.status(400).json({ message: 'Error al guardar' })
    
    }

}
const deleteFavorite = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    
    try {
        const { currentUser } = await serverAuth(req);
        const { movieId } = req.body;
        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!existingMovie)
            res.status(400).json({ message: 'Invalid id' })
    
        const updatedFavoriteIds = without( currentUser.favoriteIds, movieId )

        const updatedUser = await prismadb.user.update({
            where: {
                email : currentUser.email || ''
            },
            data: {
                favoriteIds : updatedFavoriteIds
            }
        })

        return res.status(200).json(updatedUser)
    
    } catch (error) {
        return res.status(400).json({ message: 'Error al guardar' })
    
    }

}

