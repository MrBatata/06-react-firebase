import { db } from "./index";
import { doc, collection, addDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
// En este fichero crearemos toda la lógica de base de datos para las tasks

/** CRUD - Create, Read, Update, Delete
 * All functions/logic for data base actions
 */
export const addNewTask = async task => {
    await addDoc(collection(db, 'tasks'), task);
}

export const getTasks = async () => {
    console.log('Ejecutando getDocs(db, "tasks")');
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    // console.log(querySnapshot);
    // querySnapshot.forEach(doc => {
    //     console.log(doc.id, ' => ', doc.data())
    // })

    const tasks = querySnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
    })
    // console.log(tasks);
    return tasks;
}

export const updateTask = async (task) => {
    // console.log(task);
    await setDoc(doc(db, 'tasks', task.id), {
        title: task.title,
        description: task.description
    })
};

export const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
};