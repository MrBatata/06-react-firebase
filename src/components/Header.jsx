import React, { useContext } from 'react';
import { GiFireRing } from 'react-icons/gi';
import { RouteContext, ThemeContext, UserContext } from '../App';
import { buttonStyleRed } from '../styles/ButtonsTailwind';
import { getAuth, signOut } from "firebase/auth";

// Firebase Auth
const auth = getAuth();

/**
 * Header - React functional component
 */
const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const [route, setRoute] = useContext(RouteContext);
  const [theme, setTheme] = useContext(ThemeContext);

  const handleSetHome = () => {
    setRoute('home');
  };

  const handleSetLogin = () => {
    setRoute('login');
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null);
      localStorage.clear();
      setRoute('home');
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <nav className='fixed top-0 h-12 w-full shadow-lg flex gap-2 justify-between px-4 bg-white rounded-2xl z-20 overflow-hidden truncate'>

      <div className='flex items-center gap-2 cursor-pointer ' onClick={handleSetHome}>
        <GiFireRing className='text-3xl text-white bg-red-700 rounded-md hover:bg-red-600 hover:shadow-md hover:shadow-gray-500 transition' />
        <span className='text-3xl text-red-700 font-bold invisible absolute sm:visible sm:relative hover:text-red-600 hover:shadow-gray-500 transition'>mr-batata</span>
      </div>
      {user === null
        ?
        (<div className='flex flex-row gap-1 items-center'>
          <button
            className={`${buttonStyleRed}`}
            onClick={handleSetLogin}
          >Ingresar</button>
        </div>
        )
        :
        (<div className='flex flex-row gap-1 items-center'>
          <span className='w-40 truncate text-center'>{user.email}</span>
          <button
            className='px-3 py-1 text-sm rounded-lg bg-white text-gray-600 border border-gray-600 hover:bg-gray-600 hover:text-white hover:shadow-md hover:shadow-gray-500 transition'
            onClick={handleLogout}
          >Salir</button>
        </div>
        )
      }
    </nav>
  );
};

export default Header;
