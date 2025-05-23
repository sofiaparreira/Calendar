import { useEffect, useState } from "react";
import axios from "axios";

//components
import AddTaskModal from "./components/AddTaskModal";
import { Link, useNavigate } from "react-router-dom";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hanldeModal, setHandleModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Função para mudar o mês
  const changeMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  // Função para gerar os dias do calendário
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    const days = Array.from({ length: startDay }, () => null); // Dias vazios antes do 1º dia
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  const days = generateCalendarDays();

  const handleDisplayModal = () => {
    setHandleModal(!hanldeModal);
  };

  useEffect(() => {
    const fetchTasks = async () => {
    try {
        const response = await axios.get("http://localhost:3000/");
        setTasks(response.data);
    } catch (error) {
        console.error("Erro ao buscar tarefas", error);
    }
    };
    fetchTasks();
}, [currentMonth]);

  const normalizeDate = (dateString) => {
    const date = new Date(dateString);

    // horário do brasil
    const brtOffset = 3; 
    const localDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours() + brtOffset
    );

    return new Date(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate()
    );
  };




  return (
    <>
      <section className="relative py-8 sm:p-8">
        <div className="w-full max-w-8xl mx-auto px-4 ">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-4">
              <h5 className="text-xl leading-8 font-semibold text-gray-900 first-letter:uppercase">
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h5>

              <div className="flex items-center gap-2">
                <button className="hidden md:flex py-2 pl-1.5 pr-3 rounded-md bg-gray-50 border border-gray-300 items-center gap-1.5 text-xs font-medium text-gray-900 transition-all duration-500 hover:bg-gray-100">
                  <svg
                    class="pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M11.3333 3L11.3333 3.65L11.3333 3ZM4.66666 3.00002L4.66666 2.35002L4.66666 3.00002ZM5.36719 9.98333C5.72617 9.98333 6.01719 9.69232 6.01719 9.33333C6.01719 8.97435 5.72617 8.68333 5.36719 8.68333V9.98333ZM5.33385 8.68333C4.97487 8.68333 4.68385 8.97435 4.68385 9.33333C4.68385 9.69232 4.97487 9.98333 5.33385 9.98333V8.68333ZM5.36719 11.9833C5.72617 11.9833 6.01719 11.6923 6.01719 11.3333C6.01719 10.9743 5.72617 10.6833 5.36719 10.6833V11.9833ZM5.33385 10.6833C4.97487 10.6833 4.68385 10.9743 4.68385 11.3333C4.68385 11.6923 4.97487 11.9833 5.33385 11.9833V10.6833ZM8.03385 9.98333C8.39284 9.98333 8.68385 9.69232 8.68385 9.33333C8.68385 8.97435 8.39284 8.68333 8.03385 8.68333V9.98333ZM8.00052 8.68333C7.64154 8.68333 7.35052 8.97435 7.35052 9.33333C7.35052 9.69232 7.64154 9.98333 8.00052 9.98333V8.68333ZM8.03385 11.9833C8.39284 11.9833 8.68385 11.6923 8.68385 11.3333C8.68385 10.9743 8.39284 10.6833 8.03385 10.6833V11.9833ZM8.00052 10.6833C7.64154 10.6833 7.35052 10.9743 7.35052 11.3333C7.35052 11.6923 7.64154 11.9833 8.00052 11.9833V10.6833ZM10.7005 9.98333C11.0595 9.98333 11.3505 9.69232 11.3505 9.33333C11.3505 8.97435 11.0595 8.68333 10.7005 8.68333V9.98333ZM10.6672 8.68333C10.3082 8.68333 10.0172 8.97435 10.0172 9.33333C10.0172 9.69232 10.3082 9.98333 10.6672 9.98333V8.68333ZM10.7005 11.9833C11.0595 11.9833 11.3505 11.6923 11.3505 11.3333C11.3505 10.9743 11.0595 10.6833 10.7005 10.6833V11.9833ZM10.6672 10.6833C10.3082 10.6833 10.0172 10.9743 10.0172 11.3333C10.0172 11.6923 10.3082 11.9833 10.6672 11.9833V10.6833ZM5.98333 2C5.98333 1.64101 5.69232 1.35 5.33333 1.35C4.97435 1.35 4.68333 1.64101 4.68333 2H5.98333ZM4.68333 4C4.68333 4.35898 4.97435 4.65 5.33333 4.65C5.69232 4.65 5.98333 4.35898 5.98333 4H4.68333ZM11.3167 2C11.3167 1.64101 11.0257 1.35 10.6667 1.35C10.3077 1.35 10.0167 1.64101 10.0167 2H11.3167ZM10.0167 4C10.0167 4.35898 10.3077 4.65 10.6667 4.65C11.0257 4.65 11.3167 4.35898 11.3167 4H10.0167ZM4.66666 3.65002L11.3333 3.65L11.3333 2.35L4.66666 2.35002L4.66666 3.65002ZM13.35 5.66667V11.3334H14.65V5.66667H13.35ZM11.3333 13.35H4.66667V14.65H11.3333V13.35ZM2.65 11.3334V5.66668H1.35V11.3334H2.65ZM4.66667 13.35C4.01975 13.35 3.59995 13.3486 3.29025 13.307C2.99924 13.2679 2.90451 13.2042 2.85014 13.1499L1.9309 14.0691C2.26707 14.4053 2.68186 14.5369 3.11703 14.5954C3.53349 14.6514 4.0565 14.65 4.66667 14.65V13.35ZM1.35 11.3334C1.35 11.9435 1.34862 12.4665 1.40461 12.883C1.46312 13.3182 1.59474 13.733 1.9309 14.0691L2.85014 13.1499C2.79578 13.0955 2.73214 13.0008 2.69302 12.7098C2.65138 12.4001 2.65 11.9803 2.65 11.3334H1.35ZM13.35 11.3334C13.35 11.9803 13.3486 12.4001 13.307 12.7098C13.2679 13.0008 13.2042 13.0955 13.1499 13.1499L14.0691 14.0691C14.4053 13.733 14.5369 13.3182 14.5954 12.883C14.6514 12.4665 14.65 11.9435 14.65 11.3334H13.35ZM11.3333 14.65C11.9435 14.65 12.4665 14.6514 12.883 14.5954C13.3181 14.5369 13.7329 14.4053 14.0691 14.0691L13.1499 13.1499C13.0955 13.2042 13.0008 13.2679 12.7098 13.307C12.4 13.3486 11.9802 13.35 11.3333 13.35V14.65ZM11.3333 3.65C11.9802 3.65 12.4 3.65138 12.7098 3.69302C13.0008 3.73215 13.0955 3.79578 13.1499 3.85015L14.0691 2.93091C13.7329 2.59474 13.3181 2.46312 12.883 2.40461C12.4665 2.34862 11.9435 2.35 11.3333 2.35L11.3333 3.65ZM14.65 5.66667C14.65 5.05651 14.6514 4.53349 14.5954 4.11703C14.5369 3.68187 14.4053 3.26707 14.0691 2.93091L13.1499 3.85015C13.2042 3.90451 13.2679 3.99924 13.307 4.29025C13.3486 4.59996 13.35 5.01976 13.35 5.66667H14.65ZM4.66666 2.35002C4.0565 2.35002 3.53349 2.34864 3.11702 2.40463C2.68186 2.46314 2.26707 2.59476 1.9309 2.93092L2.85014 3.85016C2.90451 3.7958 2.99924 3.73216 3.29025 3.69304C3.59995 3.6514 4.01975 3.65002 4.66666 3.65002L4.66666 2.35002ZM2.65 5.66668C2.65 5.01977 2.65138 4.59997 2.69302 4.29027C2.73214 3.99926 2.79578 3.90452 2.85014 3.85016L1.9309 2.93092C1.59474 3.26709 1.46312 3.68188 1.40461 4.11704C1.34862 4.53351 1.35 5.05652 1.35 5.66668H2.65ZM2 7.31667H14V6.01667H2V7.31667ZM5.36719 8.68333H5.33385V9.98333H5.36719V8.68333ZM5.36719 10.6833H5.33385V11.9833H5.36719V10.6833ZM8.03385 8.68333H8.00052V9.98333H8.03385V8.68333ZM8.03385 10.6833H8.00052V11.9833H8.03385V10.6833ZM10.7005 8.68333H10.6672V9.98333H10.7005V8.68333ZM10.7005 10.6833H10.6672V11.9833H10.7005V10.6833ZM4.68333 2V4H5.98333V2H4.68333ZM10.0167 2V4H11.3167V2H10.0167Z"
                      fill="#6B7280"
                    ></path>
                  </svg>
                  Today
                </button>
                <button
                  onClick={() => changeMonth(-1)}
                  className="text-gray-500 rounded transition-all duration-300 hover:bg-gray-100 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                      stroke="currentcolor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="text-gray-500 rounded transition-all duration-300 hover:bg-gray-100 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6.00236 3.99707L10.0025 7.99723L6 11.9998"
                      stroke="currentcolor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <button
                className="bg-orange-100 gap-2 flex text-orange-600 border border-orange-200 hover:ring hover:ring-orange-200 duration-300 rounded-md px-12 py-1.5"
                onClick={handleDisplayModal}
              >
                <i class="bi bi-plus-circle"></i>
                Criar Tarefa
              </button>
            </div>
          </div>

          {/* Dias da semana */}
          <div className="border border-gray-200">
            <div className="grid grid-cols-7 divide-gray-200 border-b border-gray-200">
              {[
                "Domingo",
                "Segunda",
                "Terça",
                "Quarta",
                "Quinta",
                "Sexta",
                "Sábado",
              ].map((day) => (
                <div
                  key={day}
                  className="p-3.5 flex flex-col sm:flex-row items-center justify-between border-r border-gray-200"
                >
                  <span className="text-sm font-medium text-gray-500">
                    {day}
                  </span>
                </div>
              ))}
            </div>

            {/* Dias do mês */}
            <div className="grid grid-cols-7 divide-gray-200">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`p-3.5 border-b border-r border-gray-200 xl:aspect-auto flex justify-between flex-col max-lg:items-center min-h-32  transition-all duration-300  ${
                    day === null ? "bg-gray-50" : ""
                  }`}
                >
                  {day && (
                    <div>
                      <span className="text-xs font-semibold text-gray-900 flex items-center justify-center w-7 h-7 rounded-full">
                        {day}
                      </span>
                      <div>
                        {Array.isArray(tasks) &&
                       tasks.filter((task) => {
                        const taskMonth = normalizeDate(task.date).getMonth();
                        const taskYear = normalizeDate(task.date).getFullYear();
                        return taskMonth === currentMonth.getMonth() && taskYear === currentMonth.getFullYear() && normalizeDate(task.date).getDate() === day;
                    }).length === 0 ? (
                          <p></p>
                        ) : (
                          Array.isArray(tasks) &&
                          tasks
                            .filter((task) => {
                              const taskDay = normalizeDate(
                                task.date
                              ).getDate(); // Normaliza a data da tarefa
                              return taskDay === day;
                            })
                            .map((task) => (
                              <Link to={`/${task.id}`} key={task.id}>
                                <div className="flex items-center justify-between border border-gray-100 rounded my-2 hover:ring hover:ring-gray-100 cursor-pointer">
                                <h3 className={`px-1 ${task.isDone ? "line-through" : ""}`}>{task.title}</h3>
                                <p className={`text-xs rounded mr-1 px-2 ${task.status === "Pendente " ? 'bg-blue-50 text-blue-500' : task.status === "Confirmado" ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'} `}> {/*o pendente não funciona a cor sem status, ainda não sei pq*/}
                                    {task.status}
                                  </p>
                                </div>
                              </Link>
                            ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {hanldeModal && <AddTaskModal handleDisplayModal={handleDisplayModal} />}
    </>
  );
}

export default Calendar;
