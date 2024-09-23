'use client';

import Aside from './components/Aside';
import Main from './components/Main';




export default function Home () {
 

  return (
    <div className="flex h-screen bg-gray-100 bg-customColor">
      <Aside/>
      <Main/>
    </div>
  );
}
