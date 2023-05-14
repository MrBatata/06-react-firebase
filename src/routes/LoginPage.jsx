import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { buttonStyleRed } from '../styles/ButtonsTailwind';
import { RouteContext, UserContext } from '../App';
import { toast } from 'react-hot-toast';

// Firebase Auth
const provider = new GoogleAuthProvider();
const auth = getAuth();

/**
 * Login Page - React functional Component
 */
const LoginPage = ({ children }) => {
  const [user, setUser] = useContext(UserContext);
  const [route, setRoute] = useContext(RouteContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);

  /**
   * Firebase auth code with **Google**
   */
  // Arroy function to prevent execution as the `Login` component is printed in DOM
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ..
        setUser(user);
        // console.log(token);
        // console.log(user);
        // https://react-hot-toast.com/
        toast((t) => {
          t.duration = 2000;
          return (
            <div className="flex flex-col items-center w-48 gap-2">
              Ingreso exitoso: <b>{user.email}</b>
            </div>
          )
        });
        setTimeout(() => { setRoute('home'); }, 1000);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  /**
   * Firebase auth code with **Email and Password**
   */
  const handleEmailLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user.accessToken);
        const newUser = {user: user.email, token: user.accessToken};
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        
        // https://react-hot-toast.com/
        toast((t) => {
          t.duration = 2000;
          return (
            <div className="flex flex-col items-center w-48 gap-2">
              Ingreso exitoso: <b>{user.email}</b>
            </div>
          )
        });
        setTimeout(() => { setRoute('home'); }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .finally(console.log('Lectura/escritura de usuario'))
  };

  /**
   * Link to Register Page
   */
  const handleSetRegister = () => {
    setRoute('register');
  };

  /**
   * Show Password
   */
  const handleShowPass = () => {
    setShowpass(!showpass);
  }

  const ShowPassComp = (
    showpass === false
      ? (<AiFillEye className='text-gray-500 text-2xl absolute top-1/2 -translate-y-1/2 cursor-pointer right-2'
        onClick={handleShowPass}
      />)
      :
      (<AiFillEyeInvisible className='text-gray-500 text-2xl absolute top-1/2 -translate-y-1/2 cursor-pointer right-2'
        style={{}}
        onClick={handleShowPass}
      />)
  )

  /**
   * DOM
   */
  return (
    <div className="grid grid-cols-3 gap-1 mx-3">
      {/* Title from father */}
      <div className='m-1 p-3 col-span-3 rounded-lg bg-white shadow-lg flex flex-col gap-3 sm:col-span-1'>
        {children}
        <span>
          Acredítese con Google o cree una nueva cuenta...
        </span>
      </div>

      <div className='m-1 p-3 col-span-3 rounded-lg bg-white shadow-lg flex flex-col gap-3 sm:col-span-2'>
        {children}
        <span>
          Acredítese con Google o cree una nueva cuenta...
        </span>
      </div>

      <form onSubmit={handleEmailLogin}
        className="m-1 p-3 col-span-3 rounded-lg bg-white shadow-lg flex flex-col gap-3">
        <input className="border rounded-lg py-2 px-4 border-gray-300 shadow-xl w-full"
          type="email"
          value={email}
          placeholder="Ingrese su correo electrónico"
          onChange={e => setEmail(e.target.value)} />
        <div className='relative'>
          <input className="border rounded-lg py-2 px-4 border-gray-300 shadow-xl w-full"
            type={showpass ? 'text' : 'password'}
            value={password}
            placeholder="Ingrese su contraseña"
            onChange={e => setPassword(e.target.value)}
          />
          {ShowPassComp}
        </div>
        <div className='flex gap-6 justify-between items-center pt-3'>
          <button className={`${buttonStyleRed} text-xl px-6 py-2 w-full`}>
            Ingresar
          </button>
          <button
            className={`text-white rounded-md bg-white border-solid border-x-4 border-sky-500 text-2xl px-5 py-0 h-full hover:shadow-md hover:shadow-gray-500 transition`}
            onClick={handleGoogleLogin}
          >
            <FcGoogle></FcGoogle>
          </button>
        </div>
      </form>

      <div className='m-1 p-3 col-span-3 rounded-lg bg-white shadow-lg flex gap-3'>
        <div className='flex gap-6 justify-between items-center w-full'>
          <span>
            Si no posee cuenta ...
          </span>
          <button
            className={`${buttonStyleRed} text-xl px-6 py-2 w-full bg-slate-800 hover:bg-slate-600`}
            onClick={handleSetRegister}
          >Registrarse
          </button>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
