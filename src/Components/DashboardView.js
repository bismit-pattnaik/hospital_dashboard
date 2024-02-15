import React, { useState } from 'react';
import './DashboardView.css';
import Navbar from './Navbar';
import DoctorVisibility from '../Pages/Doctor Visibility/DoctorVisibility';
import BedVisibility from '../Pages/Bed Visibility/BedVisibility';

function DashboardView() {


  const [activeMenuItem, setActiveMenuItem] = useState('Doctor Visibility'); // Initial active menu item

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };


  return (
    <div className='DashboardMainViewPage'>
      <Navbar />
      <div className='DashboardPageContainer'>
        <div className='SidebarContainer'>
          <div className={`Menuheader ${activeMenuItem === 'MENU' ? 'active' : ''}`}>
            <span>MENU</span>
          </div>
          <div
            className={`MenuItems ${activeMenuItem === 'Doctor Visibility' ? 'active' : ''}`}
            onClick={() => handleMenuItemClick('Doctor Visibility')}
          >
            <span>Doctor Visibility</span>
          </div>
          <div
            className={`MenuItems ${activeMenuItem === 'Bed Visibility' ? 'active' : ''}`}
            onClick={() => handleMenuItemClick('Bed Visibility')}
          >
            <span>Bed Visibility</span>
          </div>
          <div
            className={`MenuItems ${activeMenuItem === 'Queue Display' ? 'active' : ''}`}
            onClick={() => handleMenuItemClick('Queue Display')}
          >
            <span>Queue Display</span>
          </div>
        </div>



        <div className='ContentContainer'>
          {activeMenuItem === 'Doctor Visibility' && <DoctorVisibility />}
          {activeMenuItem === 'Bed Visibility' && <BedVisibility />}
          {activeMenuItem === 'Queue Display' && "queue display"}
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
