import React from 'react'
const Modal = ({children}) => {
  return (
    <div className='fixed top-0 left-0 h-full w-full min-h-screen min-w-screen  bg-slate-800/70 backdrop-blur-sm p-3 z-30 flex justify-center items-center'>
        <div className='bg-slate-500 p-5'>
            {children}
        </div>
    </div>
  )
}

export default Modal