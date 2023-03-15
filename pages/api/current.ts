import { serverAuth } from '@/lib'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
    message: string
} | any

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
   
        try {
            const { currentUser } = await serverAuth(req)
            return res.status(200).json(currentUser)
        } catch (error) {
            console.log(error)
            return res.status(405).end();
            
        }

    
        default:
            return res.status(405).end();
            
    }

}