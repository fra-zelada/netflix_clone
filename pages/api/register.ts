import type { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../lib/prismadb'
import bcrypt from 'bcrypt'

type Data = {
    message: string
} | any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createAccount(req, res)
    
        default:
    return res.status(405).end()
    
    }
}

const createAccount = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email, name, password} = req.body ;
    
    try {

        const existingUser= await prismadb.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser)
        return res.status(422).json({ message: 'Email already registered' })
    
        const hashPassword = await bcrypt.hash(password,12)
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashPassword,
                image: '',
                emailVerified: new Date()
            }
        })
        return res.status(200).json(user);
    
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Error al guardar' })
    
    }

}