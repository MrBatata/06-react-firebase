import React, { createContext, useEffect, useState } from 'react';
import { buttonStyleRed } from '../styles/ButtonsTailwind';
import TaskList from '../components/TaskList';
import { addNewTask, getTasks, updateTask } from '../firebase/taskController';


export const TasksContext = createContext(null)

const TaskPage = ({ children }) => {

  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState('add');

  const handleChangeTitle = (e) => setNewTask({ ...newTask, title: e.target.value });
  const handleChangeDescr = (e) => setNewTask({ ...newTask, description: e.target.value });

  /**
   * Obtain all tasks ("documents") in the db (within `tasks` "collection")
   * Then set them in component state `tasks` 
   */
  const initializeTasks = () => {
    getTasks()
      .then((t) => setTasks([...t]))
      .catch((e) => console.error(e))
  };

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
   * Modify an existing task ("document") in the db (within `tasks` "collection") 
   */
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    await updateTask(newTask);
    setNewTask({ title: "", description: "" });
    setMode('add');
    initializeTasks();
  };

  /** 
   * Cancel task modification
   */
  const handleCancelUpdate = () => {
    setMode('add');
    setNewTask({ title: "", description: "" });
    initializeTasks();
  };


  const handleInitialize = () => {
    initializeTasks();
  }

  // Lifecycle to automatically `initializeTasks` -> needs to be on child component `TaskList`
  useEffect(() => {
    initializeTasks();
  }, []);

  /**
   * DOM
   */
  return (
    <TasksContext.Provider value={{ tasks, initializeTasks, mode, setMode, newTask, setNewTask }}>
      <div className="grid grid-cols-3 gap-1 mx-3">
        {/* Title from father */}
        <div className='m-1 p-3 col-span-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
          {children}
          <div>
            <strong>Cree sus tareas:</strong> Genere su nueva tarea para visualizarla en la tabla de tareas y así poder gestionarla...
          </div>
        </div>

        <div className='m-1 p-3 col-span-2 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
          <form className="flex flex-col justify-center items-center gap-3"
            onSubmit={mode === 'add' ? handleCreateTask : handleUpdateTask}
          >
            <input type='text' className="border rounded-lg py-2 px-4 text-gray-600 dark:bg-gray-900 dark:text-white text-lg border-b-gray-400 outline-none shadow-xl w-full"
              onChange={handleChangeTitle}
              placeholder='Título'
              value={newTask.title}
            ></input>
            <textarea type='text' className="border rounded-lg py-2 px-4 text-gray-600 dark:bg-gray-900 dark:text-white text-lg border-b-gray-400 outline-none shadow-xl w-full"
              onChange={handleChangeDescr}
              placeholder='Descripción'
              value={newTask.description}
            ></textarea>
            <div>
              <button className={`${buttonStyleRed} text-xl m-3 px-6 py-2 `} type='submit'>
                {(mode === 'add' ? 'Agregar' : 'Modificar')}
              </button>
              {(mode === 'update' &&
                <button
                  className={`${buttonStyleRed} text-xl m-3 px-6 py-2 bg-gray-600 hover:bg-gray-400 `}
                  onClick={handleCancelUpdate}>
                  Cancelar</button>
              )}
            </div>
          </form>
          <button
            className={`${buttonStyleRed} text-xl m-3 px-6 py-2 bg-gray-600 hover:bg-gray-400 `}
            onClick={handleInitialize}>
            Obtener Tareas</button>
        </div>

        <div className="m-1 p-3 col-span-3 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3">
          <TaskList></TaskList>
        </div>

      </div>
    </TasksContext.Provider>
  )
};

export default TaskPage;