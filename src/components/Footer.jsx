/** Modules */
import React, { useContext, useState } from 'react';
/** Components */
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
/** Styles */
import { buttonStyleRed } from '../styles/ButtonsTailwind';
/** Context use */
import { RouteContext, ThemeContext } from '../App';

/** React functional component */
const Footer = () => {
	/** State management */
	const [route, setRoute] = useContext(RouteContext);
	const [settingsDialog, setSettingsDialog] = useState(false);
	const [theme, setTheme] = useContext(ThemeContext);

	/** Link HomePage */
	const handleRouteHome = () => {
		setRoute('home');
	};

	/** Link PaskPage */
	const handleRouteTasks = () => {
		setRoute('tasklist');
	};

	/** Link ProfilePage */
	const handleRouteProfile = () => {
		setRoute('profile');
	};

	/** Settings Show */
	const handleRouteSettings = () => {
		setSettingsDialog(!settingsDialog);
	};

	/** Dark / light theme mode */
	const handleSetTheme = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	/** DOM */
	return (
		<nav className='fixed bottom-0 w-full h-fit p-0 px-4 bg-transparent flex gap-2 justify-end items-end'>

			<div className='h-fit w-fit p-1 bg-red-700 dark:bg-slate-400 rounded-full flex items-center justify-center  cursor-pointer shadow-xl shadow-black hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
				onClick={handleRouteHome}>
				<AiFillHome className='text-3xl text-white dark:text-slate-950  m-1 sha'></AiFillHome>
			</div>

			<div className='flex items-center justify-center p-1 bg-red-700 dark:bg-slate-400 h-fit w-fit rounded-full cursor-pointer shadow-xl shadow-black hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
				onClick={handleRouteTasks}>
				<FaTasks className='text-3xl text-white dark:text-slate-950  m-1'></FaTasks>
			</div>

			<div className='flex items-center justify-center p-1 bg-red-700 dark:bg-slate-400 h-fit w-fit rounded-full cursor-pointer shadow-xl shadow-black hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
				onClick={handleRouteProfile}>
				<BsFillPersonFill className='text-3xl text-white dark:text-slate-950  m-1'></BsFillPersonFill>
			</div>

			<div className='flex items-center justify-center p-1 bg-red-700 dark:bg-slate-400 h-fit w-fit rounded-full cursor-pointer shadow-xl shadow-black hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
				onClick={handleRouteSettings}>
				<AiFillSetting className='text-3xl text-white dark:text-slate-950  m-1'></AiFillSetting>
			</div>

			<dialog open={settingsDialog} className={'bg-transparent absolute left-[100vw] -translate-x-[135px] -translate-y-[45px] w-[140px]'}>
				<div className='flex flex-col gap-3'>
					<button className={`${buttonStyleRed} bg-slate-800 hover:bg-slate-500`}>Other options</button>
					<button className={`${buttonStyleRed} bg-slate-800 hover:bg-slate-500 flex justify-center gap-2 items-center`}
						onClick={handleSetTheme}>
						{theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
						{theme === 'dark' ? 'Light' : 'Dark'}
					</button>
				</div>
			</dialog>

		</nav>
	);
};

export default Footer;