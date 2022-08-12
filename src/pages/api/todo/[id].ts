import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../server/db/prisma';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    const { id } = req.query

    if(!id || typeof(id) != 'string'){
        res.status(400).json({msg: 'Please provide a valid id'})
        return
    }

    if(req.method === 'GET'){
        const todo = await prisma.todo.findFirst({
            where:{
                id
            }
        })
        if(!todo){
            res.status(404).json({msg: `No todo with id ${id}`})
            return
        } 

        res.status(200).json({...todo})
        return
    }

    if(req.method === 'PATCH'){
        const { text,checked } = JSON.parse(req.body)
        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        if(!todo) {
            res.status(404).json({msg: `No todo with id ${id}`})
            return
        }
        const updated_todo = await prisma.todo.update({
            where:{
                id
            },
            data: {
                text: text != null ? text : undefined,
                checked: (checked != null) ? (todo.checked ? false : true) : undefined,
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