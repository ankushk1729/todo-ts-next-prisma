import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC } from 'react';

const fetchTodo = async (id: string | string[] | undefined): Promise<Todo> => {
    const res = await fetch(`http://localhost:3000/api/todo/${id}`)
    return await res.json()
}

const Home: FC = () => {
    const { query: {
        id
    }  } = useRouter()
  const {data: todo, isLoading, isError}: UseQueryResult<Todo, Error> = useQuery<Todo, Error>(['todo', id], () => fetchTodo(id),{
    enabled:!!id
  })
  
  if(isLoading){
    return <div>
      Loading
    </div>
  }
  if(isError){
    return <div>
      Something went wrong!
    </div>
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
        {todo.text}
    </div>
  )
}

export default Home
