import { putStorage } from "../helpers/LocalStorage";
import { TypeTodo } from "../types/TypeTodos";


const ADD_TODO = 'ADD_TODO';
// const EDIT_TODO = 'MODIFIED_TASK';
// const COMPLETED_STATUS = 'COMPLETED_STATUS';
// const DELETE_TASK = 'DELETE_TASK';
// const SET_TASKS = 'SET_TASKS';
// const DELETE_COMPLETE_TASKS = 'DELETE_COMPLETE_TASKS';

type Action = | { type: string, payload?: TypeTodo | [] }

export const taskReducer = ( state: TypeTodo[], action: Action ) => {
  switch (action.type) {
    case ADD_TODO: {
      const todos = [...state, action.payload];
      putStorage('todolist', todos);
      return todos;
    }
    
    /* 
    case MODIFIED_TASK: {
      const idtodo = state.findIndex( todo => todo.id === action.payload.id );
      state[idtodo] = {
        ...state[idtodo], task: action.payload.value  
      }
      putStorage('todolist', state);
      return state;
    }

    case COMPLETED_STATUS: {
      const idtodo = state.findIndex( todo => todo.id === action.payload.id );
      state[idtodo] = {
        ...state[idtodo], isCompleted: action.payload.value
      }
      putStorage('todolist', state);
      return state;
    }

    case DELETE_TASK:
      return state.filter(task => task.id !== action.payload);

    case SET_TASKS:
      return [...action.payload];
    
    case DELETE_COMPLETE_TASKS:
      return state.filter( item => item.isCompleted === false); */

    default:
      return state;
  }
}