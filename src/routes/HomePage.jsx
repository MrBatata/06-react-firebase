/** Modules */
import React from 'react';
/** Components */
import ImageSlider from '../components/ImageSlider';
/** Styles */
import { buttonStyleRed } from '../styles/ButtonsTailwind';

/** React functional component */
const Home = ({ children }) => {

  /** DOM */
  return (
    <div className='grid grid-cols-3 gap-1 mx-3'>

      <div className='m-1 p-3 col-span-3 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3 sm:col-span-2'>
        {/* Title from father */}
        {children}
        <div>
          <strong>Translations:</strong> Can you help translate this site into a foreign language ? Please email us with details if you can help.
        </div>
      </div>

      <div className='m-1 p-4 col-span-3 sm:col-span-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3'>
        <div className='container rounded-lg overflow-hidden sm:'>
          <img alt='default'
            src='https://fastly.picsum.photos/id/312/200/200.jpg?hmac=5WzBp3yXad4TGeGL1pX1DTzSXpn84Ftmc3dwkukuHEk'
            className='h-full w-full'></img>
        </div>
        <button className={`${buttonStyleRed} bg-slate-800 hover:bg-slate-600`}
          type='submit'>
          Agregar
        </button>
      </div>

      <div className='m-1 p-4 col-span-3 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg overflow-hidden'>
        <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>

      <div className='m-1 p-4 col-span-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg overflow-hidden'>
        {children}
      </div>

      <div className='m-1 p-4 col-span-2 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg h-80'>
        {/* TODO: picture gallery */}
        <ImageSlider></ImageSlider>
      </div>

      <div className='m-1 p-3 col-span-3 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3 sm:col-span-2'>
        {children}
        <div>
          <strong>Translations:</strong> Can you help translate this site into a foreign language ? Please email us with details if you can help.
        </div>
      </div>

      <div className='m-1 p-3 col-span-3 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg flex flex-col gap-3 sm:col-span-2'>
        {children}
        <div>
          <strong>Translations:</strong> Can you help translate this site into a foreign language ? Please email us with details if you can help.
        </div>
      </div>

    </div>
  )
}

export default Home