/** Modules */
import React, { useContext, useState } from 'react';
/** Functions */
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
/** Components */
import { toast } from 'react-hot-toast';
import { GiFireRing } from 'react-icons/gi';
/** Styles */
import { buttonStyleRed } from '../styles/ButtonsTailwind';
/** Context use */
import { RouteContext } from '../App';

/** Firebase Auth: https://firebase.google.com/docs/auth/web/start?hl=es-419 */
const auth = getAuth();

/** React functional component */
const RegisterPage = ({ children }) => {
	/** State management */
	const [route, setRoute] = useContext(RouteContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	/** Firebase auth code with --Google-- 
   * Arroy function to prevent execution as the `Login` component is printed in DOM
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
					<div className='flex flex-col items-center w-48 gap-2'>
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

	/** Create user */
	const handleCreateUser = e => {
		e.preventDefault();
		createUser();
	};

	/** DOM */
	return (
		<div className='grid grid-cols-3 gap-1 mx-3'>

			<div className='m-1 p-6 col-start-2 col-span-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
				<GiFireRing className='text-3xl text-white bg-red-700 rounded-md hover:bg-red-600 hover:shadow-md hover:shadow-gray-500 transition h-full w-full' />
			</div>

			<div className='m-1 p-3 col-start-3 col-span-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
				{children}
				<span>¡Regístrate para obtener acceso al universo Batata!</span>
			</div>

			<form onSubmit={handleCreateUser} className='m-1 p-3 col-span-3 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
				<input className='border rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-900 dark:text-white shadow-xl w-full'
					type='email'
					value={email}
					placeholder='Ingrese su correo electrónico'
					onChange={e => setEmail(e.target.value)} />
				<input className='border rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-900 dark:text-white shadow-xl w-full'
					type='password'
					value={password}
					placeholder='Ingrese su contraseña'
					onChange={e => setPassword(e.target.value)} />
				<button className={`${buttonStyleRed} text-xl px-6 py-2 w-full bg-slate-800 hover:bg-slate-600`}
				>
          Registarte
				</button>
			</form>

			<div className='m-1 p-3 col-start-2 col-span-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
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
			<div className='m-1 p-3 col-start-2 col-span-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
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
			<div className='m-1 p-3 col-start-2 col-span-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
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


		</div>
	);
};

export default RegisterPage;
