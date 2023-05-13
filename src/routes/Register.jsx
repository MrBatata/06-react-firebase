import React, { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { buttonStyleRed } from '../styles/ButtonsTailwind';
import { RouteContext } from "../App";
import { toast } from "react-hot-toast";

// Firebase Auth
const auth = getAuth();

/**
 * Register Page - React functional component
 */
const Register = ({ children }) => {

  const [route, setRoute] = useContext(RouteContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Firebase auth code with **Password**
   */
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        // https://react-hot-toast.com/
        toast((t) => (
          <div className="flex flex-col items-center w-48 gap-2">
            Registro exitoso <b>{user.email}</b>
            <button className='bg-sky-500 text-white mx-0 py-1 px-3 rounded-md hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
              onClick={() => {
                toast.dismiss(t.id);
                setRoute('login');
              }}>
              Ingresar
            </button>
          </div>
        ));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  /**
   * Buton onClick -> Create User
   */
  const handleCreateUser = e => {
    e.preventDefault();
    createUser();
  }

  /**
   * DOM
   */
  return (
    <div className="flex flex-col w-144 h-fit justify-start items-center gap-4 p-14 py-16 rounded-4xl shadow-2xl mt-20">
      {children}
      <span>¡Regístrate para obtener acceso al universo Batata!</span>

      <form onSubmit={handleCreateUser} className="flex flex-col h-fit justify-start items-center gap-5 p-10 w-full">
        <input className="border rounded-lg py-2 px-4 text-lg border-b-gray-400 outline-none shadow-xl shadow-gray-300 w-full"
          type="email"
          value={email}
          placeholder="ejemplo@correo.com"
          onChange={e => setEmail(e.target.value)} />
        <input className="border rounded-lg py-2 px-4 text-lg border-b-gray-400 outline-none shadow-xl shadow-gray-300 w-full"
          type="password"
          value={password}
          placeholder="contraseña"
          onChange={e => setPassword(e.target.value)} />
        <button className={`${buttonStyleRed} text-xl m-3 px-6 py-2 w-full`}>
          Registarte
        </button>
      </form>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </div>
  );
};

export default Register;
