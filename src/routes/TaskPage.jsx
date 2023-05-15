/** Modules */
import React, { createContext, useEffect, useState } from 'react';
/** Functions */
import { addNewTask, getTasks, updateTask } from '../firebase/taskController';
/** Components */
import TaskList from '../components/TaskList';
/** Styles */
import { buttonStyleRed } from '../styles/ButtonsTailwind';
/** Context creation */
export const TasksContext = createContext(null)

/** React functional component */
const TaskPage = ({ children }) => {
  /** State management */
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState('add');
  // Need to deconstruct cause if not `newTask` would only have 1 of title or description keys, but not both...
  const handleChangeTitle = (e) => setNewTask({ ...newTask, title: e.target.value });
  const handleChangeDescr = (e) => setNewTask({ ...newTask, description: e.target.value });

  /** Obtain all tasks ("documents") in the db (within `tasks` "collection")
   * Then set them in component state `tasks`
   */
  const initializeTasks = () => {
    getTasks()
      .then((t) => setTasks([...t]))
      .catch((e) => console.error(e))
  };

  /** Create a new task ("document") in the db (within `tasks` "collection") */
  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log('Initializing... from CreateTask button');
    await addNewTask(newTask).catch(e => console.log('Error!'));
    setNewTask({ title: '', description: '' });
    initializeTasks();
  };

  /** Modify an existing task ("document") in the db (within `tasks` "collection") */
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    console.log('Initializing... from UpdateTask button');
    await updateTask(newTask);
    setNewTask({ title: '', description: '' });
    setMode('add');
    initializeTasks();

  };

  /** Cancel task modification */
  const handleCancelUpdate = () => {
    console.log('Initializing... from CancelUpdate button');
    setMode('add');
    setNewTask({ title: '', description: '' });
    initializeTasks();
  };

  /** Update list */
  const handleInitialize = () => {
    console.log('Initializing... from Initialize test button');
    initializeTasks();
  }

  /** Lifecycle to automatically `initializeTasks` -> needs to be on child component `TaskList` */
  useEffect(() => {
    console.log('Initializing... from useEffect');
    initializeTasks();
  }, []);

  /** DOM */
  return (
    <TasksContext.Provider value={{ tasks, initializeTasks, mode, setMode, newTask, setNewTask }}>
      <div className='grid grid-cols-3 gap-1 mx-3'>

        <div className='m-1 p-3 col-span-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
          {/* Title from father */}
          {children}
          <div><strong>Cree sus tareas:</strong> Genere su nueva tarea para visualizarla en la tabla de tareas y así poder gestionarla...</div>
        </div>

        <div className='m-1 p-3 col-span-2 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
          <form className='flex flex-col justify-center items-center gap-3'
            onSubmit={mode === 'add' ? handleCreateTask : handleUpdateTask}
          >
            <input type='text' className='border rounded-lg py-2 px-4 text-gray-600 dark:bg-gray-900 dark:text-white text-lg border-b-gray-400 outline-none shadow-xl w-full'
              onChange={handleChangeTitle}
              placeholder='Título'
              value={newTask.title}
            ></input>
            <textarea type='text' className='border rounded-lg py-2 px-4 text-gray-600 dark:bg-gray-900 dark:text-white text-lg border-b-gray-400 outline-none shadow-xl w-full'
              onChange={handleChangeDescr}
              placeholder='Descripción'
              value={newTask.description}
            >
            </textarea>
            <div>
              <button className={`${buttonStyleRed} text-xl m-3 px-6 py-2`} type='submit'>
                {(mode === 'add' ? 'Agregar' : 'Modificar')}
              </button>
              {(mode === 'update' &&
                <button
                  className={`${buttonStyleRed} text-xl m-3 px-6 py-2 bg-gray-600 hover:bg-gray-400`}
                  onClick={handleCancelUpdate}>
                  Cancelar</button>
              )}
            </div>
          </form>
          <button
            className={`${buttonStyleRed} text-xl m-3 px-6 py-2 bg-gray-600 hover:bg-gray-400`}
            onClick={handleInitialize}>
            Obtener Tareas
          </button>
        </div>

        <div className='m-1 p-3 col-span-3 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
          <TaskList />
        </div>

      </div>
    </TasksContext.Provider>
  )
};

export default TaskPage;