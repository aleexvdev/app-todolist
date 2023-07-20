import React, { useEffect, useRef, useState } from 'react'
import { TypeTodoItem } from '../../types/TypeTodos'
import { IconDragVertical } from '../../icons/IconDragVertical';
import { IconCheck } from '../../icons/IconCheck';
import { IconSaveEdit } from '../../icons/IconSaveEdit';
import { IconDots } from '../../icons/IconDots';
import { TodoConfig } from '../Cards/TodoConfig';

export const TodoItem = ( { todo, dispatch }: TypeTodoItem ) => {

  const { id, task, isCompleted } = todo;
  const cardRef = useRef<HTMLDivElement>(null);
  const [showCardConfig, setShowCardConfig] = useState(false);
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [editTodo, setEditTodo] = useState<string>(task);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onChangeCompleted = ( evt: React.ChangeEvent<HTMLInputElement> ) => {
    const { checked } = evt.currentTarget;
    dispatch({
      type: 'TOGGLE_COMPLETED',
      payload: {
        id: id,
        isCompleted: checked
      }
    })
  }

  const showEditInput = () => {
    setShowEditTodo(true);
  }

  const onChangeEditTask = ( evt: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = evt.target;
    setEditTodo(value);
  }

  const deleteTodo = () => {
    dispatch({
      type: 'DELETE_TODO',
      payload: {
        id
      }
    });
  }

  const editingTodo = () => {
    dispatch({
      type: 'EDIT_TODO',
      payload: {
        id,
        task: editTodo
      }
    })
    setShowEditTodo(false);
  }


  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setShowCardConfig(false);
    }
  };

  return (
    <div key={id} className='border-x border-y rounded-xl my-5 flex w-full items-center justify-evenly'>
      <span className='p-0 m-0 bg-neutral-800 h-full rounded-tl-xl rounded-bl-xl w-5 flex items-center justify-center hover:fill-white'>
        <IconDragVertical fontSize={35} height={45} cursor={'grab'} />
      </span>
      <div className='py-2 px-3 w-full'>
        <div className='flex justify-between items-center'>
          <label className='flex justify-between items-center cursor-pointer w-full pr-10'>
            {
              isCompleted ? 
                <div className='rounded-xl h-5 w-5 bg-blue-700'>
                  <IconCheck fontSize={20} className='opacity-100' />
                  <input type="checkbox" aria-disabled={false} aria-checked={false} id="todocomplete" className='cursor-pointer w-5 h-5 opacity-0' onChange={onChangeCompleted} />
                </div>
              : 
                <div className='rounded-xl h-5 w-5 border-2 border-white hover:bg-white'>
                  <input type="checkbox" aria-disabled={false} aria-checked={false} id="todocomplete" className='cursor-pointer w-5 h-5 opacity-0' onChange={onChangeCompleted} />
                </div>
            }
            <div className='flex-col items-center ml-4 justify-star w-full'>
              { showEditTodo ? 
                (
                  <input type="text" className='text-white bg-neutral-700 rounded-lg w-full outline-none px-3 text-lg' value={editTodo} name="todo" id="todo" onChange={onChangeEditTask} />
                )
                :
                (
                  <p className='text-[15px]'>{todo.task}</p>
                )
              }
            </div>
          </label>
          <div className='relative' ref={cardRef}>
            <div className='flex justify-between items-center gap-4'>
              {showEditTodo && (
                <IconSaveEdit 
                  fontSize={25} 
                  cursor={'pointer'}
                  onClick={editingTodo}  
                />
              )}
              <IconDots fontSize={25} cursor={'pointer'} onClick={() => setShowCardConfig(!showCardConfig)} />
            </div>
            {showCardConfig && (
              <div
                className='absolute right-0 top-7 z-50 w-32'
              >
                <TodoConfig id={id} editTodo={showEditInput} deleteTodo={deleteTodo} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
