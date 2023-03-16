import type { NextApiRequest, NextApiResponse } from 'next'
import movies from '../../../db/movies.json'
import prismadb from '../../../lib/prismadb';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
    
            seedMovies(req, res)

            break;
    
        default:
            res.status(400).json({ message: 'Invalid request Method' })
    }
    
    
}


async function seedMovies(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    try {
        await prismadb.movie.deleteMany()
        await prismadb.user.deleteMany()
        await prismadb.account.deleteMany()
        await prismadb.session.deleteMany()
        await prismadb.verificationToken.deleteMany()
        await prismadb.movie.createMany({data: movies})
        res.status(200).json({ message: 'Seed executed!' })

    } catch (error) {
        res.status(400).json({ message: `${ error }` })
        
    }

}

