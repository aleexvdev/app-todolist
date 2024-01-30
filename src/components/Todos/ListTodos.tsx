import { AnimatePresence, motion, Reorder } from 'framer-motion'
import { TypeTodo, TypeTodoList } from '../../types/TypeTodos'
import { TodoItem } from './TodoItem';
import { messageFilter } from '../../utils/functions';
import { IconEmptyTask } from '../../assets/icons/IconEmptyTask';

export const ListTodos = ( { todos, dispatch, filteredTodos, searching, setTodos }: TypeTodoList ) => {

  const todosByFilter = getFilteredTodos(todos, filteredTodos, searching);

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
      className='mt-4 mx-5 sm:mx-0 min-h-52'
    >
      <Reorder.Group 
        axis='y' 
        values={todos} 
        onReorder={setTodos}
        layoutScroll
        style={{ overflowY: "hidden" }}
        className='pb-16 h-full'
      >
        <AnimatePresence>
          {todosByFilter.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TodoItem todo={todo} dispatch={dispatch} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </motion.section>
  )
}

const getFilteredTodos = (todos: TypeTodo[], filteredTodos: string, searching: string) => {
  if (searching.length > 0) {
    return todos.filter((todo) => todo.task.trim().toLowerCase().includes(searching.trim().toLowerCase()));
  } else {
    switch (filteredTodos) {
      case 'All':
        return todos;
      case 'Active':
        return todos.filter((todo) => !todo.isCompleted);
      case 'Completed':
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  }
};