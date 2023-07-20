import React from 'react'
import { IconDelete } from '../../icons/IconDelete'

type TypeMainConfig = {
  handleAllDeleteCompleted: () => void;
}

export const MainConfig = ( { handleAllDeleteCompleted }: TypeMainConfig ) => {
  return (
    <div className='bg-black rounded-xl p-2'>
      <ul className='w-full text-sm'>
        <li className='px-1 py-2'>
          <button className='flex justify-start items-center gap-3' onClick={handleAllDeleteCompleted}>
            <IconDelete fontSize={18} /> Delete Completed Tasks
          </button>
        </li>
      </ul>
    </div>
  )
}
