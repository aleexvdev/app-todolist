import { motion } from 'framer-motion'
import { TypeTodo } from '../../types/TypeTodos'
import { getTaskSolution } from '../../service/api';
import { useEffect, useState } from 'react';

type SolveTaskIAProps = {
  props: TypeTodo;
}

export const SolveTaskIA = ({ props }: SolveTaskIAProps) => {

  const [solution, setSolution] = useState<string>('');

  useEffect(() => {
    const fetchSolution = async () => {
      const taskSolution = await getTaskSolution(props.task);
      setSolution(taskSolution);
    };
    fetchSolution();
  }, [props]);

  return (
    <motion.div className='bg-black text-white rounded-lg min-h-40 p-5'>
      <h1 className='text-lg'>What steps should I follow to solve this task?</h1>
      <div className='flex flex-col items-start justify-center my-4'>
        <p className='mb-2'>Task: <span>{props.task}</span></p>
        <div>
          <p>Answer:</p>
          <p>{solution}</p>
        </div>
      </div>
    </motion.div>
  )
}
