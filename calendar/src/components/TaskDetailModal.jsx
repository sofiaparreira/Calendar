import React from 'react'

const TaskDetailModal = ({onClick}) => {

    const handleModalClick = (e) => {
        e.stopPropagation();
      };

  return (
      <div
        className="fixed inset-0 z-10 bg-gray-500/75 flex items-center justify-center p-4"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={onClick}
      >
        <div  onClick={handleModalClick} className="relative w-full max-w-5xl transform rounded-lg bg-white shadow-xl px-16 py-8 ">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold text-gray-800" id="modal-title">
              Título da tarefa
            </h3>
            <span className="px-8 bg-green-50 text-green-500 items-center rounded-md flex">Teste</span>
          </div>


          <span className='text-gray-400 text-sm my-2'>28/01</span>
          <p className='mt-12 border border-gray-200 rounded p-2 text-gray-800 min-h-32'>Descrição</p>
          
        </div>
      </div>
  )
}

export default TaskDetailModal
