import type { NextApiRequest, NextApiResponse } from 'next'
import { serverAuth } from '../../../lib/serverAuth';
import prismadb from '../../../lib/prismadb';

type Data = {
    message: string
} | any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getAllMovies(req, res)


    
        default:
            return    res.status(400).end()

    }

}

const getAllMovies = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {
        await serverAuth(req)
        const movies = await prismadb.movie.findMany();
        return res.status(200).json(movies)
    
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    
    }

}