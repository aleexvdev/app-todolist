import React from 'react'
import { IconEdit } from '../../icons/IconEdit'
import { IconDelete } from '../../icons/IconDelete'

type TypeTodoConfig = {
  id: string;
  editTodo: () => void;
  deleteTodo: () => void;
}
export const TodoConfig = ( { editTodo, deleteTodo }: TypeTodoConfig ) => {
  return (
    <div className='bg-black rounded-xl p-2'>
      <ul className='w-full text-sm'>
        <li className='px-1 py-2'>
          <button className='flex justify-start items-center gap-3' onClick={editTodo}>
            <IconEdit fontSize={18} /> Edit Task
          </button>
        </li>
        <li className='px-1 py-2'>
          <button className='flex justify-start items-center gap-3' onClick={deleteTodo}>
            <IconDelete fontSize={18} /> Delete Task
          </button>
        </li>
      </ul>
    </div>
)
}
