import { motion } from 'framer-motion'
import { IconDelete } from '../../assets/icons/IconDelete';

type TypeMainConfig = {
  handleAllDeleteCompleted: () => void;
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};
const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const MainConfig = ( { handleAllDeleteCompleted }: TypeMainConfig ) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={listVariants}
      className='bg-black rounded-xl p-2'
    >
      <motion.ul 
        className='w-full text-[18px] sm:text-sm'
        variants={listVariants}
      >
        <motion.li 
          className='px-1 py-2'
          variants={listItemVariants}
          whileHover={{ scale: 1.04 }}
        >
          <button className='flex justify-start items-center gap-3' onClick={handleAllDeleteCompleted}>
            <IconDelete fontSize={18} className='text-xl' /> Delete Completed Tasks
          </button>
        </motion.li>
      </motion.ul>
    </motion.div>
  )
}
