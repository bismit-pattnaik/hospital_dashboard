import React, { useState } from 'react';
import './IpdFootfall.css';
import IpdDepartmentWise from './IpdDepartmentWise';
import IpdDoctorWise from './IpdDoctorWise';

function IpdFootfall() {
  const [activeTab, setActiveTab] = useState("department");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='MainContentBox'>
      <div className='TitleLine'>
        <div className='HeaderTitleName'>
          IPD Footfall
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
                     <IpdDepartmentWise/>
                 </div> 
                 )}
             {activeTab === "doctor" && (
                <div className="tab-content">
                    <IpdDoctorWise/>
                </div>
                )}



      </div>
    </div>
  );
}

export default IpdFootfall;
