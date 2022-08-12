import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { FC, useRef } from 'react';
import TodoList from '../components/TodoList';

interface AddTodoProps {
  text: string
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  bgColor: string
  fontColor?: string
  size: 's' | 'm' | 'l'
}


const addTodo = async (props: AddTodoProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo/`, {
      method:'POST',
      body: JSON.stringify({...props})
  })
  return await res.json();
}

export const Button: FC<ButtonProps> = ({size, text, bgColor, fontColor = 'white', ...rest}) => {
  if(size === 's'){
    return (
      <button {...rest} className={`rounded-md py-1 px-2 bg-${bgColor}-400 text-sm text-${fontColor}`}>{text}</button>
    )  
  }
  if(size === 'm'){
    return (
      <button {...rest} className={`rounded-md py-2 px-3 bg-${bgColor}-400 text-md text-${fontColor}`}>{text}</button>
    )  
  }
  return (
    <button {...rest} className={`rounded-md py-2 px-4 bg-${bgColor}-400 text-${fontColor}`}>{text}</button>
  )
}



const Home: NextPage = () => {
  
  const queryClient = useQueryClient()
  
  
  const todoTextRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const {mutate: addTodoMutation } = useMutation(addTodo, {
    onSuccess(){
      queryClient.invalidateQueries(['todos'])
    } 
   })


  const addTodoEventHandler = (e:  React.FormEvent<HTMLFormElement>, text: string) => {
    e.preventDefault()
    addTodoMutation({ text: text.substring(0, 75) })
    todoTextRef.current!.value = ''
    scrollToTop()
  }

  const scrollToTop = () => {
    containerRef.current!.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
  


  return (
    <main className="flex min-h-screen flex-col justify-center py-2 w-3/4 px-4 mx-auto">
      <h1 className='text-5xl mb-5 mx-auto'>Todos</h1>
      <div className=''>
        <form className='flex justify-between gap-2 mb-4' onSubmit={(e) => addTodoEventHandler(e, todoTextRef.current!.value)}>
          <input placeholder='Enter the todo' className='w-full border flex-1 px-3' ref = {todoTextRef} type='text' />
          <Button bgColor = 'blue' fontColor='white' size = 'l' text = 'Add Todo'/>
        </form>
        <TodoList containerRef={containerRef}/>
      </div>
    </main>
  )
}

export default Home