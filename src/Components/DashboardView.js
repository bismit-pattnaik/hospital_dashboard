import React, { useState } from 'react';
import './DashboardView.css';
import Navbar from './Navbar';
import DoctorVisibility from '../Pages/Doctor Visibility/DoctorVisibility';
import BedVisibility from '../Pages/Bed Visibility/BedVisibility';
import OTQueue from '../Pages/OT Queue Display/OTQueue';
import OPDisplay from '../Pages/OPD Queue Display/OPDisplay';

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
              <div className={`MenuItems ${activeMenuItem === 'Doctor Visibility' ? 'active' : ''}`}
                onClick={() => handleMenuItemClick('Doctor Visibility')}>
                <span>Doctor Visibility</span>
              </div>

              {/* <div className={`MenuItems ${activeMenuItem === 'Bed Visibility' ? 'active' : ''}`}
                onClick={() => handleMenuItemClick('Bed Visibility')}>
                <span>Bed Visibility</span>
              </div> */}

              <div className={`MenuItems ${activeMenuItem === 'OT Queue Display' ? 'active' : ''}`}
                onClick={() => handleMenuItemClick('OT Queue Display')} >
                <span>OT Queue Display</span>
              </div>

              <div className={`MenuItems ${activeMenuItem === 'OPD Queue Display' ? 'active' : ''}`}
                onClick={() => handleMenuItemClick('OPD Queue Display')} >
                <span>OPD Queue Display</span>
              </div>

        </div>



        <div className='ContentContainer'>
          {activeMenuItem === 'Doctor Visibility' && <DoctorVisibility />}
          {activeMenuItem === 'Bed Visibility' && <BedVisibility />}
          {activeMenuItem === 'OT Queue Display' && <OTQueue/>}
          {activeMenuItem === 'OPD Queue Display' && <OPDisplay/> }
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
