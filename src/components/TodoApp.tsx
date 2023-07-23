import React, { useEffect, useReducer, useRef, useState } from 'react'
import { getMonthName, getNameDay, getOrdinalDay, getTodosActive } from '../utils/functions'
import { IconAdd } from '../icons/IconAdd'
import { FormTodo } from './Form/FormTodo'
import { TypeTodo } from '../types/TypeTodos'
import { IconSearch } from '../icons/IconSearch'
import { IconSettings } from '../icons/IconSettings'
import { ListTodos } from './Todos/ListTodos'
import { getStorage } from '../helpers/LocalStorage'
import { todoReducer } from '../stores/todoReducer'
import { MainConfig } from './Cards/MainConfig'
import { IconAddTask } from '../icons/IconAddTask'

const initialState: TypeTodo[] = [];
export const TodoApp = () => {

  const cardMainRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [inputSearchActive, setInputSearchActive] = useState(false);
  const [showCardConfigMain, setShowCardConfigMain] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState('All');
  const [searchingTodo, setSearchingTodo] = useState('');
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const storedTasks = getStorage<TypeTodo[]>('todolist');
    if (storedTasks) {
      dispatch({
        type: 'SET_TODOS',
        payload: storedTasks,
      });
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const deleteCompleted = () => {
    dispatch({ type: 'DELETE_COMPLETE_TODOS' });
    setShowCardConfigMain(false);
  }

  const onSearchInput = ( evt: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = evt.target;
    setSearchingTodo(value);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (cardMainRef.current && !cardMainRef.current.contains(event.target as Node)) {
      setShowCardConfigMain(false);
    }
  };

  return (
    <>
      <header className='bg-neutral-800/50 p-6 text-amber-50 sm:mt-12 rounded-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start'>
            <h1 className='text-3xl/8'>{ getNameDay() },  { getOrdinalDay() }</h1>
          </div>
          <div className='flex items-center justify-start'>
            <span className='text-gray-500'>{ getTodosActive(state) } tasks</span>
          </div>
        </div>
        <div className='mt-1'>
          <span className='text-sm/8 text-gray-500'>{ getMonthName() }</span>
        </div>
        <div className='text-right flex items-center justify-between'>
          <div className='w-full border-b border-gray-500'></div>
          <button className='p-3 bg-blue-700 rounded-full' onClick={toggleForm}>
            <IconAddTask className='fill-white' />
          </button>
          {showForm && (
            <FormTodo onShowForm={toggleForm} dispatch={dispatch}  />
          )}
        </div>
      </header>
      <section className='pt-6'>
        <div ref={cardMainRef}>
          <div className='flex items-center justify-between'>
            <div className='flex flex-row gap-5'>
              <button className={`rounded-lg px-4 py-1 text-sm h-8 ${filteredTodos === 'All' ? 'bg-blue-700 border-[1px] border-blue-500':'bg-neutral-600'}`} onClick={() => setFilteredTodos('All')}>All</button>
              <button className={`rounded-lg px-4 py-1 text-sm h-8 ${filteredTodos === 'Active' ? 'bg-blue-700 border-[1px] border-blue-500':'bg-neutral-600'}`} onClick={() => setFilteredTodos('Active')}>Active</button>
              <button className={`rounded-lg px-4 py-1 text-sm h-8 ${filteredTodos === 'Completed' ? 'bg-blue-700 border-[1px] border-blue-500':'bg-neutral-600'}`} onClick={() => setFilteredTodos('Completed')}>Completed</button>
            </div>
            <div className={`relative flex items-center justify-between gap-4 ${showForm ? '-z-10' : 'z-10'}`}>
              <div className='flex items-center justify-between rounded-lg gap-3'>
                {
                  inputSearchActive &&
                    (
                    <input 
                      type="text" 
                      className={`text-black w-full h-8 rounded-xl px-3 outline-none text-sm `}
                      onChange={onSearchInput}
                      placeholder='Search your task...'
                      />
                    )
                }
                <button onClick={() => setInputSearchActive(!inputSearchActive)}>
                  <IconSearch fontSize={20} />
                </button>
              </div>
              <button>
                <IconSettings 
                  fontSize={20}
                  onClick={() => setShowCardConfigMain(!showCardConfigMain)}
                />
              </button>
              {showCardConfigMain && (
                <div
                  className='absolute right-0 top-7 z-50 w-56'
                >
                  <MainConfig handleAllDeleteCompleted={deleteCompleted} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <ListTodos 
        todos={state} 
        searching={searchingTodo} 
        filteredTodos={filteredTodos} 
        dispatch={dispatch} 
        setTodos={(todos: TypeTodo) => dispatch({ type: 'SET_TODOS', payload: todos })} 
      />
    </>
  );
}
