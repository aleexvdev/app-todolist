import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IconCloseCircle } from '../../icons/IconCloseCircle'
import { TypeTodo } from '../../types/TypeTodos';

interface Action {
  type: string;
  payload: any;
}

type FormProps = {
  onShowForm: () => void;
  // onSendTask: ( value: string ) => void;
  dispatch: React.Dispatch<Action>;
}

export const FormTodo = ( { onShowForm, dispatch }: FormProps) => {

  const [formState, setFormState] = useState<string>('');

  const onChangeInput = ( evt: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = evt.target;
    setFormState(value);
  }

  const saveTask = () => {
    // onSendTask(formState);
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

  return (
    <div className="fixed inset-0 bg-neutral-800/50 bg-opacity-70 flex items-center justify-center">
      <section 
        className='h-auto rounded-3xl px-5 py-7 bg-black w-[400px]' 
      >
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-left text-2xl'>Add Task</h1>
          <button
            className="bg-none p-2 rounded-xl hover:bg-red-600"
            style={{ animation: "pulse 1.5s infinite" }}
            onClick={onShowForm}
          >
            <IconCloseCircle fontSize={20} color="white" />
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
                onChange={onChangeInput}
              />
              <IconCloseCircle 
                cursor="pointer"
                color='black'
                className='text-3xl mr-2'
              />
            </div>
            <div className='flex items-center justify-end mr-1'>
              <span className='bg-black px-2 rounded-b-xl text-base'>0 / 20</span>
            </div>
          </div>
          <div className='mt-5 text-center'>
            <button className="w-full bg-blue-600 rounded-xl h-12 text-lg" onClick={saveTask}>Done</button>
          </div>
        </div>
      </section>
    </div>
  )
}