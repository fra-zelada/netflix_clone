import type { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../../lib/prismadb';

type Data = {
    message: string
} | any


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            
            return searchMovie(req, res);
    
        default:
            return res.status(400).end()
    }
    
}

const searchMovie = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { movieName = ''  } = req.query as { movieName : string} ;
    if (!movieName)
        return   res.status(400).json('Invalid Movie')

    try {
        const movies = await prismadb.movie.findMany({
            where: 
            {
                title: {
                    contains: movieName ,
                    mode: 'insensitive'
                    }
                }
            }
        )
        
        if (movies.length === 0) 
            return res.status(200).json({message: `No movies found searching ${movieName}`})

        return res.status(200).json(movies)
    
    } catch (error) {
        return res.status(400).json({ message: 'Error al buscar' })
    
    }

}
