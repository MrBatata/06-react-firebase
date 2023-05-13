import React, { useContext, useEffect } from 'react';
import { TasksContext } from '../routes/TaskPage';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

const TaskList = () => {
  const tasksContext = useContext(TasksContext);

  // Lifecycle to automatically `initializeTasks` -> needs to be on child component `TaskList`
  useEffect(() => {
    tasksContext.initializeTasks();
  }, [tasksContext]);

  /**
   * DOM
   */
  return (
    <div className='w-full'>
      <table className="table-auto border border-collapse w-full">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2 w-1/6">Título</th>
            <th className="px-4 py-2 w-2/3">Descripción</th>
            <th className="px-4 py-2 w-1/12"></th>
            <th className="px-4 py-2 w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {tasksContext.tasks.map((task, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.description}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center">
                  <BsFillPencilFill className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  />
                </div>
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center">
                  <AiFillDelete className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  />
                </div>              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;