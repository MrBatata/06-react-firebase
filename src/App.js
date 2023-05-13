import React, { createContext, useState } from 'react';
import { app, messaging } from './firebase';
import Header from './components/Header';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import { Toaster, toast } from 'react-hot-toast';
import { onMessage } from 'firebase/messaging';
import Footer from './components/Footer';
import TaskPage from './routes/TaskPage';

export const RouteContext = createContext(null);
export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

/**
 * Firebase Cloud Notification
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
    )
  });
})

/**
 * App - React functional component
 */
function App() {
  const [user, setUser] = useState(null);
  // TODO: routing with router-dom instead.
  const [route, setRoute] = useState('home');
  // TODO: code and styles for theme change dark/ligh
  const [theme, setTheme] = useState('dark');

  /**
   * Style for all Routes titles
   */
  const titleStyle = 'text-lg font-semibold';

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <RouteContext.Provider value={[route, setRoute]}>
          <ThemeContext.Provider value={[theme, setTheme]}>
            <Toaster />

            <div className='min-h-screen h-fit w-screen m-0 p-0 bg-gray-200'>
              <Header />
              <main className='py-14'>
                {route === 'home'
                  ?
                  <Home><h1 className={titleStyle}>Bienvenid@s al Mr Batata's world</h1></Home>
                  : null
                }
                {route === 'login'
                  ?
                  <Login><h1 className={titleStyle}>Ingrese @ Mr Batata</h1></Login>
                  : null
                }
                {route === 'register'
                  ?
                  <Register><h1 className={titleStyle}>Register</h1></Register>
                  : null
                }
                {(route === 'tasklist')
                  ?
                  <TaskPage><h1 className={titleStyle}>Gestión de tareas</h1></TaskPage>
                  :
                  null
                }
              </main>
              {/* TODO: develop Footer style as header */}
              {/* <Footer /> */}
            </div>

          </ThemeContext.Provider>
        </RouteContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
