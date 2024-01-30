import React, { useEffect, useRef, useState } from 'react'
import { motion, useDragControls, Reorder, useMotionValue } from 'framer-motion'
import { TypeTodoItem } from '../../types/TypeTodos'
import { TodoConfig } from '../Cards/TodoConfig';
import { useRaisedShadow } from '../../hooks/useRaisedShadow';
import { ReorderIcon } from '../../assets/icons/IconDragMotion';
import { IconCheck } from '../../assets/icons/IconCheck';
import { IconSaveEdit } from '../../assets/icons/IconSaveEdit';
import { IconCloseCircle } from '../../assets/icons/IconCloseCircle';
import { IconDots } from '../../assets/icons/IconDots';

const variants = {
  hidden: {
    opacity: 0
  },
  visible: ({ delay }: { delay: number }) => ({
    opacity: 1,
    transition: {
      delay,
      duration: 1
    }
  })
}

export const TodoItem = ( { todo, dispatch, index }: TypeTodoItem ) => {

  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  const { id, task, isCompleted } = todo;
  const cardRef = useRef<HTMLDivElement>(null);
  const mainDivItemRef = useRef(null);
  const [showCardConfig, setShowCardConfig] = useState(false);
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [editTodo, setEditTodo] = useState<string>(task);
  const [showIconDots, setShowIconDots] = useState(false);

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
    setShowCardConfig(false);
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
    });
    todo.task = editTodo;
    setShowEditTodo(false);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setShowCardConfig(false);
    }
  };

  const cancelEditTodo = () => {
    setEditTodo(todo.task);
    setShowEditTodo(false);
  }

  return (
    <Reorder.Item 
      value={todo}
      id={id}
      dragListener={false}
      dragControls={dragControls}
      layout
      style={{ borderRadius:'14px', boxShadow, y }}
      ref={mainDivItemRef}
    >
      <motion.div
        custom={{ delay: ( index + 1) * 0.1 }}
        className='border-x border-y rounded-xl my-5 flex w-full h-16 sm:h-14 items-center justify-evenly select-none bg-neutral-800 real'
        layoutId={id}
        initial='hidden'
        animate='visible'
        exit='hidden'
        variants={variants}
        onMouseEnter={() => setShowIconDots(true)}
        onMouseLeave={() => { 
          if (!showCardConfig) {
            setShowIconDots(false)
          }
        }} 
      >
        <span className='px-3 py-1 m-0 h-full rounded-tl-xl w-[15%] sm:w-[7%] flex items-center justify-center '>
          <ReorderIcon 
            dragControls={dragControls} 
          />
        </span>
        <div className='py-2 px-1 sm:px-3 w-full'>
          <div className='flex justify-between items-center'>
            <label className='flex justify-between items-center cursor-pointer w-[75%] sm:w-[85%]'>
              {
                isCompleted ? 
                  <div className='rounded-xl w-5 h-5 bg-blue-700'>
                    <IconCheck fontSize={20} className='opacity-100' />
                    <input type="checkbox" aria-disabled={false} aria-checked={false} id="todocomplete" className='cursor-pointer w-5 h-5 opacity-0' onChange={onChangeCompleted} />
                  </div>
                : 
                  <div className='rounded-xl w-5 h-5 border-2 border-white hover:bg-white'>
                    <input type="checkbox" aria-disabled={false} aria-checked={false} id="todocomplete" className='cursor-pointer w-5 h-5 opacity-0' onChange={onChangeCompleted} />
                  </div>
              }
              <div className='flex-col items-center pl-5 justify-start w-[100%]'>
                { showEditTodo ? 
                  (
                    <input type="text" className='text-white bg-neutral-700 rounded-lg w-full outline-none px-3 text-lg' value={editTodo} name="todo" id="todo" onChange={onChangeEditTask} />
                  )
                  :
                  (
                    <div className='parent'>
                      <div className='child' style={{ position: 'relative', zIndex: '1' }}>
                        {
                          isCompleted && (
                            <span className='w-full border-b absolute top-3.5' style={{ border: '1.5px solid rgb(29 78 216)' }}></span>
                          )
                        }
                      </div>
                      <p className={`w-full text-[18px] ${isCompleted ? 'text-gray-500' : 'text-white'} `} style={{ position: 'relative', zIndex: '2' }}>
                        {todo.task}
                      </p>
                    </div>
                  )
                }
              </div>
            </label>
            <div className='relative w-[auto] sm:w-auto' ref={cardRef}>
              <div className='flex justify-between items-center gap-4'>
                {showEditTodo && (
                  <div className='flex justify-center items-center gap-1 w-full pr-2 sm:pr-0'>
                    <IconSaveEdit 
                      fontSize={25} 
                      cursor={'pointer'}
                      onClick={editingTodo}  
                    />
                    <IconCloseCircle 
                      fontSize={25} 
                      cursor={'pointer'}
                      onClick={cancelEditTodo} 
                    />
                  </div>
                )}
                {
                  !showEditTodo && showIconDots && 
                  (
                    <div className='flex justify-between items-center gap-2 pr-2 sm:pr-0'>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconDots 
                          fontSize={25} 
                          cursor={'pointer'}
                          onClick={() => setShowCardConfig(!showCardConfig)}
                        />
                      </motion.button>
                    </div>
                  )
                }
                {showCardConfig && (
                  <div
                    className='absolute right-0 top-7 z-50 w-44 sm:w-36'
                  >
                    <TodoConfig id={id} editTodo={showEditInput} deleteTodo={deleteTodo} disabled={isCompleted} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
    </Reorder.Item>
  )
}

/* 
const [showSolveTask, setSolveTask] = useState(false);
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  <IconRobot 
    fontSize={25} 
    cursor={'pointer'}
    onClick={() => setSolveTask(!showSolveTask)}
  />
</motion.button>
{
  showSolveTask && (<SolveTaskIA props={todo} />)
}
*/