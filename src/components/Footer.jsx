import React, { useContext, useState } from 'react';
import { RouteContext } from '../App';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { buttonStyleRed } from '../styles/ButtonsTailwind';

const Footer = () => {
  const [route, setRoute] = useContext(RouteContext);
  const [settingsWind, setSettingsWind] = useState(false);

  const handleRouteHome = () => {
    setRoute('home');
  };

  const handleRouteTasks = () => {
    setRoute('tasklist');
  };

  const handleRouteProfile = () => {
    setRoute('profile');
  };

  const handleRouteSettings = () => {
    setSettingsWind(!settingsWind);
  };

  return (
    <nav className='fixed bottom-0 w-full p-0 flex gap-2 justify-end px-4 bg-transparent'>

      <div className='flex items-center justify-center p-1 bg-red-700 h-fit w-fit rounded-full cursor-pointer shadow-xl shadow-black hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
        onClick={handleRouteHome}>
        <AiFillHome className='text-3xl text-white m-1 sha'></AiFillHome>
      </div>

      <div className='flex items-center justify-center p-1 bg-red-700 h-fit w-fit rounded-full cursor-pointer shadow-xl shadow-black hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
        onClick={handleRouteTasks}>
        <FaTasks className='text-3xl text-white m-1'></FaTasks>
      </div>

      <div className='flex items-center justify-center p-1 bg-red-700 h-fit w-fit rounded-full cursor-pointer shadow-xl shadow-black hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
        onClick={handleRouteProfile}>
        <BsFillPersonFill className='text-3xl text-white m-1'></BsFillPersonFill>
      </div>

      <div className='flex items-center justify-center p-1 bg-red-700 h-fit w-fit rounded-full cursor-pointer shadow-xl shadow-black hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
        onClick={handleRouteSettings}>
        <AiFillSetting className='text-3xl text-white m-1'></AiFillSetting>
      </div>

      <dialog open={settingsWind} className={`bg-transparent w-44 absolute left-[80vw] bottom-[120%]`}>
        <div className='flex flex-col gap-3'>
          <button className={`${buttonStyleRed} bg-sky-700`}>Dark Mode</button>
          <button className={`${buttonStyleRed} bg-sky-700`}>Light Mode</button>
        </div>
      </dialog>
    </nav>
  );
};

export default Footer;