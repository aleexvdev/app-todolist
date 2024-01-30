import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'
import { TypeTodo } from '../../types/TypeTodos';
import { IconCloseLine } from '../../assets/icons/IconCloseLine';
import { IconCloseCircle } from '../../assets/icons/IconCloseCircle';

interface Action {
  type: string;
  payload: TypeTodo | [];
}

type FormProps = {
  onShowForm: () => void;
  dispatch: React.Dispatch<Action>;
}

const formAnimation = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: '0%' },
};

const doneButtonVariants = {
  hover: {
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    backgroundColor: "rgba(0, 0, 255, 0.6)",
    transition: {
      duration: 0.3,
    },
  },
};

export const FormTodo = ( { onShowForm, dispatch }: FormProps) => {

  const [formState, setFormState] = useState<string>('');
  const [countLetter, setCountLetter] = useState(0);

  const onChangeInput = ( evt: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = evt.target;
    if (value.length > 20) {
      console.log('excedido')
    } else {
      setFormState(value);
      setCountLetter(value.length);
    }
    
  }

  const deleteInput = () => {
    setFormState('');
    setCountLetter(0);
  }

  const saveTask = () => {
    if (formState.length > 0) {
      const newtask: TypeTodo = {
        id: uuidv4(),
        task: formState,
        isCompleted: false,
        date: Date.now().toString()
      }
      dispatch({
        type: 'ADD_TODO',
        payload: newtask
      });
      onShowForm();
    }
  }

  return (
    <div className="fixed inset-0 bg-neutral-800/50 bg-opacity-70 flex items-center justify-center mx-5 sm:mx-0" style={{ zIndex:'3' }}>
      <motion.section 
        className='h-auto rounded-3xl px-5 py-7' 
        style={{ width: '30rem', backgroundColor: '#080808' }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={formAnimation}
        transition={{ duration: 0.3 }}
      >
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-left text-2xl'>Add Task</h1>
          <button
            className="bg-none p-1 rounded-xl hover:bg-red-600"
            style={{ animation: "pulse 1.5s infinite" }}
            onClick={onShowForm}
          >
            <IconCloseLine fontSize={25} color="white" />
          </button>
        </div>
        <div className='w-full'>
          <div className='mt-8'>
            <div className='w-full mt-4 flex justify-between items-center rounded-lg bg-white'>
              <input 
                className='text-black w-full h-10 rounded-2xl px-4 outline-none text-base'
                type="text" 
                name="maintask" 
                id="maintask"
                placeholder='Write your task...'
                autoComplete='off'
                value={formState}
                onChange={onChangeInput}
              />
              <IconCloseCircle 
                cursor="pointer"
                color='black'
                className='text-3xl mr-2'
                onClick={deleteInput}
              />
            </div>
            <div className='flex items-center justify-end mr-1'>
              <span className='px-2 rounded-b-xl text-base'>{countLetter} / 20</span>
            </div>
          </div>
          <div className='mt-5 text-center'>
            <motion.button 
              variants={doneButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-blue-700 rounded-xl h-12 text-lg" 
              onClick={saveTask}
            >
              Done
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}