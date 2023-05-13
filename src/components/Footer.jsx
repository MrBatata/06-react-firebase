import React, { useContext } from 'react';
import { RouteContext } from '../App';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';

const Footer = () => {
  const [route, setRoute] = useContext(RouteContext);

  const handleRouteHome = () => {
    setRoute('home');
  };

  const handleRouteSettings = () => {
    setRoute('settings');
  };

  const handleRouteTasks = () => {
    setRoute('tasklist');
  };
  
  const handleRouteProfile = () => {
    setRoute('profile');
  };

  return (
    <footer className='fixed bottom-2 h-20 w-full p-0 shadow-lg bg-sky-400 rounded-2xl border-t-2'>
      <div className='grid grid-cols-4 m-0 p-0 gap-0'>
        <div className='flex h-20 items-center justify-center border-x-2 cursor-pointer hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
          onClick={handleRouteHome}>
          <AiFillHome className='text-5xl text-white'></AiFillHome>
        </div>
        <div className='flex h-20 items-center justify-center border-x-2 cursor-pointer hover:bg-sky-700 hover:shadow-gray-500 transition'
        onClick={handleRouteTasks}>
          <FaTasks className='text-5xl text-white'></FaTasks>
        </div>
        <div className='flex h-20 items-center justify-center border-x-2 cursor-pointer hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
        onClick={handleRouteProfile}>
          <BsFillPersonFill className='text-5xl text-white'></BsFillPersonFill>
        </div>
        <div className='flex h-20 items-center justify-center border-x-2 cursor-pointer hover:bg-sky-700 hover:shadow-md hover:shadow-gray-500 transition'
        onClick={handleRouteSettings}>
          <AiFillSetting className='text-5xl text-white'></AiFillSetting>
        </div>
      </div>
    </footer>
  );
};

export default Footer;