import React from 'react'
import { AnimatePresence, motion, Reorder } from 'framer-motion'
import { TypeTodo, TypeTodoList } from '../../types/TypeTodos'
import { TodoItem } from './TodoItem';
import { IconEmptyTask } from '../../icons/IconEmptyTask';
import { messageFilter } from '../../utils/functions';

export const ListTodos = ( { todos, dispatch, filteredTodos, searching, setTodos }: TypeTodoList ) => {

  let todosByFilter: TypeTodo[] = [];

  if (searching.length > 0) {
    todosByFilter = todos.filter( todo => todo.task.trim().toLowerCase().includes(searching.trim().toLowerCase()) );
  } else {
    if (filteredTodos === 'All') todosByFilter = todos;
    if (filteredTodos === 'Active') todosByFilter = todos.filter(todo => !todo.isCompleted);
    if (filteredTodos === 'Completed') todosByFilter = todos.filter(todo => todo.isCompleted);
  }

  if (todosByFilter.length === 0) 
  { 
    const message = messageFilter(filteredTodos, searching.length);

    return (
      <div className='flex items-center justify-center h-44 gap-5'>
        <IconEmptyTask className='w-16 h-16 fill-[#707070]' />
        <p className='text-gray-500'>{message}</p>
      </div>
    );
  }

  return (
    <motion.section
      layout
      className='mt-4 mx-5 sm:mx-0'
    >
      <Reorder.Group 
        axis='y' 
        values={todos} 
        onReorder={setTodos}
        layoutScroll
        style={{ height: 'auto', overflowY: "hidden" }}
        className='pb-16'
      >
        <AnimatePresence>
          {todosByFilter.map( (todo, index) => (
            <TodoItem key={todo.id} todo={todo} dispatch={dispatch} index={index} />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </motion.section>
  )
}
