import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [task, setTask] = useState(null)  // Set initial state to null instead of undefined

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

  return (
    <>
      <button onClick={handleBack} className='p-4'>Voltar</button>
      <div className='mx-48 my-16'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-semibold first-letter:uppercase'>{task.title}</h2>
          <span className='text-green-600 bg-green-50 px-8 rounded py-1'>{task.category}</span>
        </div>
        <span className='text-sm text-gray-400'>{task.date}</span>
        <p className='min-h-32 rounded border border-gray-200 p-2 mt-32'>{task.description}</p>
      </div>
    </>
  );
}

export default TaskDetails;
