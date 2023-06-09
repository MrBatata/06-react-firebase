/** Modules */
import React, { createContext, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
/** Functions */
import { messaging } from './firebase';
import { onMessage } from 'firebase/messaging';
/** Pages */
import HomePage from './routes/HomePage';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import TaskPage from './routes/TaskPage';
/** Components */
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';
/** Context creation */
export const RouteContext = createContext(null);
export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

/** Firebase Cloud Notification
 * Config to show server notification as Toaster
 */
onMessage(messaging, (payload) => {
	// console.log('Nueva notificación en directo', payload);
	toast.custom((t) => {
		t.duration = 5000;
		return (
			<div className="flex flex-col items-center w-48 gap-2 bg-red-400 rounded-lg shadow-2xl shadow-gray-600 p-3 border-neutral-500 text-white">
				<b>{payload.notification.title}</b>
				<p>{payload.notification.body}</p>
			</div>
		);
	});
});

/** App - React functional component */
function App() {
	/** State management */
	// TODO: routing with router-dom instead.
	const [route, setRoute] = useState('home');
	const [theme, setTheme] = useLocalStorage('theme', 'light');
	/** User in localStorage management */
	const [user, setUser] = useLocalStorage('user', null);

	// /** Component lifecyle control */
	// Reeplaced with useLocalStorage('user')
	// useEffect(() => {
	//   const userLocalStorage = localStorage.getItem('user');
	//   userLocalStorage ? setUser(JSON.parse(userLocalStorage)) : localStorage.clear()
	// }, [])

	/** DOM */
	return (
		<>
			<UserContext.Provider value={[user, setUser]}>
				<RouteContext.Provider value={[route, setRoute]}>
					<ThemeContext.Provider value={[theme, setTheme]}>
						<div className={theme}>
							<Toaster />
							<div className='min-h-screen h-fit w-screen m-0 p-0 bg-gray-200 dark:bg-gray-950'>
								<Header />
								<main className='py-14'>
									{route === 'home'
										?
										<HomePage><h1 className='text-lg font-semibold dark:text-white'>Bienvenid@s al mundo de Mr-Batata</h1></HomePage>
										: null
									}
									{route === 'login'
										?
										<LoginPage><h1 className='text-lg font-semibold dark:text-white'>Ingrese @ Mr Batata</h1></LoginPage>
										: null
									}
									{route === 'register'
										?
										<RegisterPage><h1 className='text-lg font-semibold dark:text-white'>Register</h1></RegisterPage>
										: null
									}
									{route === 'tasklist' && (
										user !== null
											?
											<TaskPage><h1 className='text-lg font-semibold dark:text-white'>Gestión de tareas</h1></TaskPage>
											:
											<HomePage><h1 className='text-lg font-semibold dark:text-white'>Bienvenid@s al Mr Batata&apos;s world</h1></HomePage>
									)}
								</main>
								<Footer />
							</div>
						</div>
					</ThemeContext.Provider>
				</RouteContext.Provider>
			</UserContext.Provider>
		</>
	);
}

export default App;
