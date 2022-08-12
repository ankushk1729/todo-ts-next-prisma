import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    const { id, text } = req.body
    if(req.method === 'PATCH'){
        const updated_todo = await prisma.todo.update({
            where:{
                id
            },
            data: {
                text
            }
        })
        res.status(200).json({todo: updated_todo})
        return
    }
    if(req.method === 'DELETE'){
        await prisma.todo.delete({
            where: {
                id
            }
        })
        res.status(200).json({msg:`Todo deleted with id ${id}`})
        return
    }
}