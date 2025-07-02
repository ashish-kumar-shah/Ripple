import React, { useState } from 'react';
import TabPanel from '../Component/SideBar/TabPanel';

const TopBar = () => {
  const [menu, setMenu] = useState(false);

  const handleSideMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <>
      <div className="w-full h-full">
        <div
          className="hamburger right float-right  w-14 h-full flex justify-center items-center cursor-pointer"
          onClick={handleSideMenu}
        >
          <span
            style={{ fontSize: '40px', fontWeight: '900' }}
            className="material-symbols-outlined"
          >
            {menu ? 'left_panel_close' : 'left_panel_open'}
          </span>
        </div>
        
        <div className="float-left w-14 h-full p-1 flex justify-center items-center">
           <span className='font-semibold font-serif pl-2 text-orange-500 '>Ripple</span>
        </div>

      </div>

      {/* Sliding Side Panel */}
      <div
        className={`
          fixed top-0 left-0 h-full w-20 bg-white  z-50 
          transform ${menu ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
        `}
      >
        <TabPanel />
      </div>
    </>
  );
};

export default TopBar;
