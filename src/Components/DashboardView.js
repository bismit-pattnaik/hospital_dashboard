import React from 'react'
import './DashboardView.css'
import Navbar from './Navbar'
import DoctorVisibility from '../Pages/Doctor Visibility/DoctorVisibility'

function DashboardView() {
  return (
    <div className='DashboardMainViewPage'>
     <Navbar/>
     <div className='DashboardPageContainer'>
      <div className='SidebarContainer'>
         <div className='Menuheader'>
           <span>MENU</span>
         </div>
         <div className='MenuItems'>
          <span> Doctor Visibility </span>
         </div>

         <div className='MenuItems'>
          <span>Bed Visiblity </span>
         </div>

         <div className='MenuItems'>
          <span> Queue Display </span>
         </div>


      </div>




      <div className='ContentContainer'>
         <DoctorVisibility/>
      </div>


     </div>

    </div>
  )
}

export default DashboardView