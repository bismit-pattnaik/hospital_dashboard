import React, { useState, useEffect } from "react";
import './IpdFootfall.css';
import IpdDepartmentWise from './IpdDepartmentWise';
import IpdDoctorWise from './IpdDoctorWise';
import axios from "axios";

function IpdFootfall() {

  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;
  const [activeTab, setActiveTab] = useState("department");
  const [hospitalMasterList, setHospitalMasterList] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

   // Fetch hospital list for the dropdown
   useEffect(() => {
    axios
      .get(`${DASHBOARD_URL}/adhocapi/branch/master`)
      .then((response) => {
        setHospitalMasterList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching hospital list:", error);
      });
  }, [DASHBOARD_URL]);

  const handleHospitalChange = (e) => {
    setSelectedHospitalId(e.target.value);  // Set the selected hospitalId or "" for "All"
  };

  return (
    <div className='MainContentBox'>
      <div className='TitleLine'>
      <div className="TitleFilter">
        <div className="HeaderTitleName"> IPD Footfall</div>
        <div className="">
           <select className="selectBarBox" onChange={handleHospitalChange} value={selectedHospitalId}>
                <option value="">All Hospitals</option>
                {hospitalMasterList.map((hospital) => (
                  <option key={hospital.siteId} value={hospital.siteId}>
                    {hospital.hospitalName}
                  </option>
                ))}
              </select>       
        </div>
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
                     <IpdDepartmentWise selectedHospitalId={selectedHospitalId}/>
                 </div> 
                 )}
             {activeTab === "doctor" && (
                <div className="tab-content">
                    <IpdDoctorWise selectedHospitalId={selectedHospitalId}/>
                </div>
                )}



      </div>
    </div>
  );
}

export default IpdFootfall;
