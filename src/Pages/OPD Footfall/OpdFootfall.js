import React, { useState } from 'react';
import './OpdFootfall.css'
import axios from 'axios'
import OpdDepartmentWise from './OpdDepartmentWise';
import OpdDoctorwise from './OpdDoctorwise';



function OpdFootfall() {

  const [activeTab, setActiveTab] = useState("department");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='MainContentBox'>
      <div className='TitleLine'>
        <div className='HeaderTitleName'>
          OPD Footfall
        </div>
      </div>

      <div className='ContentBox'>
        <div className='ContentDetail'>
          <div className="tabs">
            <div
              className={`dept-tab ${activeTab === "department" ? "active" : ""}`}
              onClick={() => handleTabClick("department")}
            >
              Department Wise
            </div>
            <div
              className={`doctor-tab ${activeTab === "doctor" ? "active" : ""}`}
              onClick={() => handleTabClick("doctor")}
            >
              Doctor Wise
            </div>
          </div>
        </div>

    {/* Content for doctor wise and department wise can be added here based on activeTab state */}
             {activeTab === "department" && (
                 <div className="tab-content">
                    <OpdDepartmentWise/>
                 </div> 
                 )}
             {activeTab === "doctor" && (
                <div className="tab-content">
                    <OpdDoctorwise/>
                </div>
                )}



      </div>
    </div>
  );
}

export default OpdFootfall;
