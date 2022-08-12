import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FC, MutableRefObject } from 'react';
import { Button } from '../pages';


const fetchTodos = async (): Promise<Todo[]> => {
  console.log(process.env.NEXT_PUBLIC_API_URL)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`)
  return await res.json();
}


const deleteTodo = async (id: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`, {
      method:'DELETE'
  })
}

const markUnmarkTodo = async (id: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`, {
    method:'PATCH',
    body: JSON.stringify({checked: true})
  })
}

const TodoList: FC<{
  containerRef: MutableRefObject<HTMLDivElement | null>
}
> = ({ containerRef }) => {
  const queryClient = useQueryClient()

  const {data: todos, isLoading, isError}: UseQueryResult<Todo[],Error> = useQuery<Todo[], Error>(['todos'], fetchTodos)

  const { mutate: deleteTodoMutatation } = useMutation(deleteTodo, {
    onSuccess() {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const { mutate: markUnmarkTodoMutation } = useMutation(markUnmarkTodo, {
    onSuccess(){
      queryClient.invalidateQueries(['todos'])
    }
  })

  const deleteTodoHandler = (id: string) => {

    deleteTodoMutatation(id)
  }

  const markUnmarkTodoHandler =  (id: string) => {
    markUnmarkTodoMutation(id)
  }


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
    <div className='h-[550px] overflow-auto' ref = {containerRef}>
      {
        todos.map((todo)=>(
          <div key = {todo.id} className='flex justify-between mb-1 items-center'>
            <div className="flex items-center">
              <input onChange={() => markUnmarkTodoHandler(todo.id)} checked = {todo.checked} id="checkbox" type="checkbox" value="" className = "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <p className={`flex-1 ml-2 ${todo.checked ? 'line-through': ''}`}>{todo.text}</p>
            <Button size= 's' fontColor='white' bgColor='red' text='Delete' onClick = {() => deleteTodoHandler(todo.id)}/>
          </div>
        ))
      }
    </div>
  )
}

export default TodoList
