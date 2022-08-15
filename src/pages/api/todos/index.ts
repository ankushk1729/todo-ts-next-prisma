
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method === 'GET'){
    const todos = await prisma.todo.findMany({
      where: {},
      orderBy: {
        createdAt: 'desc'
      }
    })
    res.status(200).json(todos)  
    return
  }

  if(req.method === 'POST'){
    const { text } = JSON.parse(req.body)
    const new_todo = await prisma.todo.create({
      data:{
        text
      }
    })
    res.status(201).json({todo:new_todo})
    return
  }

  res.status(200).json({ name: 'John Doe' })
}
