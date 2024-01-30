import React, { useEffect, useReducer, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getMonthName, getNameDay, getOrdinalDay, getTodosActive } from '../utils/functions'
import { FormTodo } from './Form/FormTodo'
import { TypeTodo } from '../types/TypeTodos'
import { getStorage } from '../helpers/LocalStorage'
import { todoReducer } from '../stores/todoReducer'
import { MainConfig } from './Cards/MainConfig'
import { ListTodos } from './Todos/ListTodos'
import { IconAddTask } from '../assets/icons/IconAddTask'
import { IconCloseLine } from '../assets/icons/IconCloseLine'
import { IconSearch } from '../assets/icons/IconSearch'
import { IconSettings } from '../assets/icons/IconSettings'

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

  const closeInputSearch = () => {
    setInputSearchActive(!inputSearchActive); 
    setSearchingTodo(''); 
    setShowCardConfigMain(false); 
  }

  return (
    <>
      <motion.header
        className='bg-neutral-800/40 text-amber-50 rounded-lg select-none sm:mx-0 sm:mt-12 sm:p-6 mt-6 p-4 mx-5'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='flex items-center justify-center'>
          <span className='sm:text-4xl font-medium tracking-wider text-4xl'>To<span className='text-blue-700'>-</span>Do <span className='text-blue-700'>List</span></span>
        </h1>
        <div className='flex items-center justify-between mt-5'>
          <motion.div className='flex items-center justify-start' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <h1 className='sm:text-3xl/8 text-xl/8'>{ getNameDay() },  { getOrdinalDay() }</h1>
          </motion.div>
          <motion.div className='flex items-center justify-start' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className='text-gray-500 sm:text-xl/8 text-lg/8'>{ getTodosActive(state) } tasks</span>
          </motion.div>
        </div>
        <motion.div className='mt-1' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <span className='sm:text-xl/8 text-lg/8 text-gray-500'>{ getMonthName() }</span>
        </motion.div>
        <motion.div
          className='text-right flex items-center justify-between'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className='w-full border-b border-gray-500'></div>
          <motion.button
            className='p-3 bg-blue-700 rounded-full'
            onClick={toggleForm}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconAddTask className='fill-white' />
          </motion.button>
          {showForm && (
            <FormTodo onShowForm={toggleForm} dispatch={dispatch}  />
          )}
        </motion.div>
      </motion.header>
      <section className='pt-4 mx-5 sm:pt-6 sm:mx-0'>
        <div ref={cardMainRef}>
          <div className='flex flex-col-reverse items-center justify-between sm:flex-row'>
            <div className='flex flex-row gap-5 mt-3 sm:mt-0'>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-lg px-4 py-1 h-10 text-lg sm:text-sm sm:h-8 ${filteredTodos === 'All' ? 'bg-blue-700 border-[1px] border-blue-600':'bg-neutral-600 hover:bg-blue-700'}`} 
                onClick={() => setFilteredTodos('All')}>
                  All
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-lg px-4 py-1 h-10 text-lg sm:text-sm sm:h-8 ${filteredTodos === 'Active' ? 'bg-blue-700 border-[1px] border-blue-600':'bg-neutral-600 hover:bg-blue-700'}`} 
                onClick={() => setFilteredTodos('Active')}>
                  Active
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-lg px-4 py-1 h-10 text-lg sm:text-sm sm:h-8 ${filteredTodos === 'Completed' ? 'bg-blue-700 border-[1px] border-blue-600':'bg-neutral-600 hover:bg-blue-700'}`} 
                onClick={() => setFilteredTodos('Completed')}>
                  Completed
              </motion.button>
            </div>
            <div className={`relative flex flex-row items-center w-full justify-end gap-4 h-12 sm:h-0 sm:pb-0 ${showForm ? '-z-10' : 'z-10'}`}>
              <div className='flex items-center justify-end rounded-lg gap-2 w-full sm:w-auto sm:justify-between'>
                {
                  inputSearchActive ?
                  (
                    <>
                      <motion.div
                        initial={{ x: "20%" }}
                        animate={{ x: "0" }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                        className='w-full'
                      >
                        <input
                          type="text"
                          className='w-full h-8 rounded-lg px-3 outline-none text-sm text-white bg-neutral-700'
                          onChange={onSearchInput}
                          placeholder='Search your task...'
                        />
                      </motion.div>
                      <motion.button 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className='bg-neutral-500/20 rounded-full p-1'
                      >
                        <IconCloseLine 
                        fontSize={20} 
                        cursor={'pointer'}
                        className='text-white text-2xl sm:text-xl'
                        onClick={closeInputSearch}
                      />
                      </motion.button>
                    </>
                  ) :
                  (
                    <motion.button 
                      initial={{ opacity: 0, y: 0, x: "20%" }}
                      animate={{ opacity: 1, y: 1, x: "0" }}
                      exit={{ opacity: 0, scale: 0, x: "100%" }}
                      transition={{ duration: 0.3 }}
                      className='bg-none hover:bg-neutral-500/20 rounded-full p-1'
                      onClick={() => { setInputSearchActive(!inputSearchActive); setShowCardConfigMain(false) }}
                    >
                      <IconSearch fontSize={20} className='text-2xl sm:text-xl' />
                    </motion.button>
                  )
                }
              </div>
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                className='bg-none hover:bg-neutral-500/20 rounded-full p-1'
              >
                <IconSettings
                  className='text-2xl sm:text-xl'
                  fontSize={20}
                  onClick={() => setShowCardConfigMain(!showCardConfigMain)}
                />
              </motion.button>
              {showCardConfigMain && (
                <div
                  className='absolute right-0 top-10 sm:top-4 z-50 w-64 sm:w-52'
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
