import React, { useState } from 'react'
import InputContainer from "../components/InputContainer";
import SelectMenu from "../components/SelectMenu";
import axios from 'axios';
const AddTaskModal = ({ handleDisplayModal, task, isEdit, onTaskUpdate  }) => {


  const [title, setTitle] = useState(isEdit ? task.title : "");
  const [status, setStatus] = useState(isEdit ? task.status : "");
  const [employee, setEmployee] = useState(isEdit ? task.employee : "");
  const [date, setDate] = useState(isEdit ? task.date : "");
  const [description, setDescription] = useState(isEdit ? task.description : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      title, status, employee, date, description
    };

    try {
      let response;
      if (isEdit) {
        // Se for editar, faz uma requisição PUT
        response = await axios.put(`http://localhost:3000/update/${task.id}`, updatedTask);
        console.log('Task updated: ', response.data);
        
      } else {
        // Se for adicionar, faz uma requisição POST
        response = await axios.post('http://localhost:3000/add', updatedTask);
        console.log('Task added: ', response.data);
        window.location.reload()

      }

      // Atualiza a tarefa no estado do componente pai (TaskDetails)
      if (onTaskUpdate) {
        onTaskUpdate(response.data);
      }

      setTitle('');
      setDescription('');
      setDate('');
      setStatus('');
      setEmployee('');
      handleDisplayModal(false);
    } catch (error) {
      console.error('Error processing task: ', error);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 z-10 bg-gray-500/75 flex items-center justify-center p-4"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-full max-w-5xl transform rounded-lg bg-white shadow-xl">
          <div className="bg-white sm:p-8 p-2 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800" id="modal-title">
              {isEdit ? "Editar Tarefa" : "Criar Tarefa"}
            </h3>
            <div className="mt-8">
              <InputContainer label={"Título"} value={title} onChange={(e) => setTitle(e.target.value)} />
              <div className="grid grid-cols-2 gap-8 mt-4">
                <SelectMenu
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                  selectedOption={status || "Selecione o status"}
                  options={["Pendente", "Confirmado", "Ausente"]}
                />
                <SelectMenu
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                  label="Funcionário"
                  selectedOption={employee || "Selecione o funcionário"}
                  options={["Carolina", "Douglas", "Fábio", "Josiane", "Samuel", "Sofia"]}
                />
              </div>

              <div className="mt-6">
                <label
                  className="block text-sm font-medium text-gray-600 py-1"
                  htmlFor=""
                >
                  Data
                </label>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-gray-200 text-gray-700 border rounded-md px-8 mt-1 py-1 outline-none focus:ring focus:ring-orange-100 focus:border-2 focus:border-orange-200"
                  type="date"
                />
              </div>

              <div className="mt-8">
                <label
                  className="block text-sm font-medium text-gray-600 py-1"
                  htmlFor=""
                >
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-32 border-gray-200 text-gray-700 border rounded-md px-2 mt-1 py-1 text-sm outline-none focus:ring focus:ring-orange-100 focus:border-2 focus:border-orange-200"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex justify-end gap-3 rounded-lg">
            <button
              onClick={handleSubmit}
              type="button"
              className="rounded-md bg-orange-400 hover:ring-4 hover:ring-orange-200 px-12 py-2 text-sm font-semibold text-white shadow-sm duration-300"
            >
              {isEdit ? "Atualizar Tarefa" : "Criar Tarefa"}
            </button>
            <button
              onClick={() => handleDisplayModal(false)}
              type="button"
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm border-gray-300 border hover:ring-4 hover:ring-gray-200 duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
