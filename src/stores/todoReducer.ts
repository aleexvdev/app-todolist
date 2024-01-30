import { putStorage } from "../helpers/LocalStorage";
import { TypeTodo } from "../types/TypeTodos";

const ADD_TODO = 'ADD_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_COMPLETED_TODO = 'TOGGLE_COMPLETED';
const SET_TODOS = 'SET_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const DELETE_COMPLETE_TODOS = 'DELETE_COMPLETE_TODOS';

type Action = | { type: string, payload?: any | [] }
// type Action =
//   | { type: 'ADD_TODO', payload: TypeTodo }
//   | { type: 'EDIT_TODO', payload: { id: string, task: string } }
//   | { type: 'TOGGLE_COMPLETED', payload: { id: string, isCompleted: boolean } }
//   | { type: 'SET_TODOS', payload: TypeTodo[] }
//   | { type: 'DELETE_TODO', payload: { id: string } }
//   | { type: 'DELETE_COMPLETE_TODOS' };

export const todoReducer = (state: TypeTodo[], action: Action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newTodos = [...state, action.payload];
      putStorage('todolist', newTodos);
      return newTodos;
    }

    case EDIT_TODO: {
      const idtodo = state.findIndex( todo => todo.id === action.payload.id );
      state[idtodo] = {
        ...state[idtodo], task: action.payload.task
      }
      putStorage('todolist', state);
      return state;
    }

    case TOGGLE_COMPLETED_TODO: {
      const toggledTodos = state.map( todo =>
        todo.id === action.payload.id ? { ...todo, isCompleted: action.payload.isCompleted } : todo
      );
      putStorage('todolist', toggledTodos);
      return toggledTodos;
    }

    case SET_TODOS: {
      putStorage('todolist', action.payload);
      return [...action.payload];

    }

    case DELETE_TODO: {
      const updatedTodos = state.filter(todo => todo.id !== action.payload.id);
      putStorage('todolist', updatedTodos);
      return updatedTodos;
    }

    case DELETE_COMPLETE_TODOS: {
      const todos = state.filter(todo => todo.isCompleted === false);
      putStorage('todolist', todos);
      return todos;
    }

    default:
      return state;
  }
}