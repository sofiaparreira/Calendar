import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteTaskModal from './components/DeleteTaskModal';
import axios from 'axios'


const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [task, setTask] = useState(null) 
  const [deleteModal, setDeleteModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)


  const handleGetDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${id}`);
      const data = await response.json();
      setTask(data);
      console.log("Detalhes do produto", data);
    } catch (error) {
      console.log("Erro ao buscar detalhes do produto: ", error);
    }
  };

  useEffect(() => {
    handleGetDetail();
  }, [id]);

  function handleBack() {
    navigate(-1)
  }

  if (!task) {
    return <p>Loading...</p>;  
  }

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleUpdateModal = () => {
    setUpdateModal(!updateModal)
  }


  const handleDeleteTask = async () => {
    
    try {
      const response = await axios.delete(`http://localhost:3000/delete/${task.id}`)
      console.log("Task deleted successfully", response.data.message)
      navigate('/')

    } catch (error) {
      console.log("Error deleting task: ", error);
    }
  }
  return (
    <>
      <button onClick={handleBack} className='p-4'>Voltar</button>
      <div className='mx-48 my-16'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-16 items-center'>
            <h2 className='text-2xl font-semibold first-letter:uppercase'>{task.title}</h2>
            <span className='text-green-600 bg-green-50 px-8 rounded-md py-1'>{task.category}</span>
          </div>
          <div className='flex gap-8 items-center'>
            <button className='bg-orange-400 text-white px-6 py-1.5 rounded-md  space-x-3'><i className='bi bi-pencil-square'></i><span>Editar</span></button>
            <button onClick={handleDeleteModal} className='bg-red-500 text-white px-6 py-1.5 rounded-md space-x-3'><i className='bi bi-trash3-fill'></i><span>Excluir</span></button>
          </div>
        </div>
        <span className='text-sm text-gray-400'>{task.date}</span>
        <p className='min-h-32 rounded border border-gray-200 p-2 mt-32'>{task.description}</p>
      </div>

      {deleteModal && <DeleteTaskModal handleDeleteModal={handleDeleteModal} handleDeleteTask={handleDeleteTask} />}
    </>
  );
}

export default TaskDetails;
