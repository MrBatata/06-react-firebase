import React, { createContext, useState } from 'react';
import { buttonStyleRed } from '../styles/ButtonsTailwind';
import TaskList from '../components/TaskList';
import { addNewTask, getTasks } from '../firebase/taskController';


export const TasksContext = createContext(null)

const TaskPage = ({ children }) => {

  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);

  const handleChangeTitle = (e) => setNewTask({ ...newTask, title: e.target.value });
  const handleChangeDescr = (e) => setNewTask({ ...newTask, description: e.target.value });

  /**
   * Create a new task ("document") in the db (within `tasks` "collection")
   */
  const handleCreateTask = async (e) => {
    e.preventDefault();
    await addNewTask(newTask);
    setNewTask({ title: "", description: "" });
    initializeTasks();
  };

  /**
   * Obtain all tasks ("documents") in the db (within `tasks` "collection")
   * Then set them in component state `tasks` 
   */
  const initializeTasks = () => {
    getTasks()
      .then((t) => setTasks([...t]))
      .catch((e) => console.error(e));
  };
  // Lifecycle to automatically `initializeTasks` -> needs to be on child component `TaskList`
  // useEffect(() => {
  //   initializeTasks();
  // }, []);

  /**
   * DOM
   */
  return (
    <TasksContext.Provider value={{ tasks, initializeTasks }}>
      <div className="flex flex-col w-screen h-fit m-0 mt-3 p-0 justify-start items-center gap-5">
        {/* Title from father */}
        {children}

        <div className='m-0 p-0 w-full h-full'>
          <form className="flex flex-col h-fit w-full justify-start items-center gap-5 m-0 p-5 rounded-4xl shadow-2xl"
            onSubmit={handleCreateTask}>
            <input type='text' className="border rounded-lg py-2 px-4 text-gray-600 text-lg border-b-gray-400 outline-none shadow-xl shadow-gray-300 w-full"
              onChange={handleChangeTitle}
              placeholder='Título'
              value={newTask.title}
            ></input>
            <textarea type='text' className="border rounded-lg py-2 px-4 text-gray-600 text-lg border-b-gray-400 outline-none shadow-xl shadow-gray-300 w-full"
              onChange={handleChangeDescr}
              placeholder='Descripción'
              value={newTask.description}
            ></textarea>
            <button className={`${buttonStyleRed} text-xl m-3 px-6 py-2 w-56`}
              type='submit'>Agregar</button>
          </form>
        </div>
        <div className="flex flex-col h-fit w-full justify-start items-center gap-5 m-0 p-5 rounded-4xl shadow-2xl">
          <TaskList></TaskList>
        </div>

      </div>
    </TasksContext.Provider>
  )
};

export default TaskPage;