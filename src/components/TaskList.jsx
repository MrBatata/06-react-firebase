/** Modules */
import React, { useContext } from 'react';
/** Functions */
import { deleteTask } from '../firebase/taskController';
/** Components */
import { TasksContext } from '../routes/TaskPage';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

/** React functional component */
const TaskList = () => {
  const tasksContext = useContext(TasksContext);

  /** Sets `newTask` to the one we want to modify.
   * We can now use this object to request the server the modification,
   * in `TaskPage`.
   */
  const editTask = (taskId) => {
    tasksContext.setMode('update');
    const taskToEdit = tasksContext.tasks.find(t => t.id === taskId);
    tasksContext.setNewTask({ ...taskToEdit }); // destructure? {...taskToEdit}
  };

  /** Removes an existing task ("document") in the db (within `tasks` "collection") */
  const handleDeleteTask = async (taskId) => {
    console.log('Initializing... from DeleteTask button');
    await deleteTask(taskId);
    tasksContext.initializeTasks();
  };

  /** DOM */
  return (
    <div className='w-full'>
      <table className="table-auto border border-collapse w-full">
        <thead>
          <tr className="bg-gray-700 text-white ">
            <th className="px-4 py-2 w-1/6">Título</th>
            <th className="px-4 py-2 w-2/3">Descripción</th>
            <th className="px-4 py-2 w-1/12"></th>
            <th className="px-4 py-2 w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {tasksContext.tasks.map((task, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
              <td className="border px-4 py-2 dark:text-gray-900">{task.title}</td>
              <td className="border px-4 py-2 dark:text-gray-900">{task.description}</td>
              <td className="border px-4 py-2 dark:text-gray-900 text-center">
                <div className="flex items-center justify-center"
                  onClick={() => editTask(task.id)}
                >
                  <BsFillPencilFill className="text-gray-600 dark:text-gray-900 hover:text-gray-800 cursor-pointer" />
                </div>
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center"
                  onClick={() =>
                    window.confirm("¿Seguro que quieres eliminar esta tarea?") &&
                    handleDeleteTask(task.id)
                  }
                >
                  <AiFillDelete className="text-gray-600 dark:text-gray-900 hover:text-gray-800 cursor-pointer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;