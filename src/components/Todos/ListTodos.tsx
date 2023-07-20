import React from 'react'
import { TypeTodo, TypeTodoList } from '../../types/TypeTodos'
import { TodoItem } from './TodoItem';

export const ListTodos = ( { todos, dispatch, filteredTodos, searching }: TypeTodoList ) => {

  let todosByFilter: TypeTodo[] = [];

  if (searching.length > 0) {
    todosByFilter = todos.filter( todo => todo.task.trim().toLowerCase().includes(searching.trim().toLowerCase()) );
  } else {
    if (filteredTodos === 'All') todosByFilter = todos;
    if (filteredTodos === 'Active') todosByFilter = todos.filter(todo => !todo.isCompleted);
    if (filteredTodos === 'Completed') todosByFilter = todos.filter(todo => todo.isCompleted);
  }

  return (
    <section>
      {
        todosByFilter.map( (todo) => (
          <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
        ))
      }
    </section>
  )
}
