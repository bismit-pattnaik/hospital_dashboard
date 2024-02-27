import React, { useState } from 'react';
import './BedVisibility.css';
import ICUbeds from './ICUbeds';
import Wardbeds from './Wardbeds';

function BedVisibility() {
  const [activeTab, setActiveTab] = useState("icu");
  const [icuBedData, setIcuBedData] = useState({ total: 0, available: 0 });
  const [wardBedData, setWardBedData] = useState({ total: 0, available: 0 });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleICUBedData = (data) => {
    setIcuBedData(data);
  };

  const handleWardBedData = (data) => {
    setWardBedData(data);
  };


// console.log(icuBedData.total)


  return (
    <div className='MainContentBox'>
      <div className='TitleLine'>
        <div className='HeaderTitleName'>
          Bed Visibility
        </div>
      </div>
      <div className='ContentBox'>
        <div className='ContentDetail'>
          <div className="bedtabs">
            <div
              className={`icu-tab ${activeTab === "icu" ? "active" : ""}`}
              onClick={() => handleTabClick("icu")}
            >
              <div className='TabHeadline'>ICU beds</div>
              <div className='Tabsubheadbox'>
                <div className='tabsubheadline'>
                  <div>Total :</div> <span>{icuBedData.total}</span>
                </div>
                <div className='tabsubheadline'>
                  <div>Available :</div> <span>{icuBedData.available}</span>
                </div>
              </div>
            </div>
            <div
              className={`ward-tab ${activeTab === "ward" ? "active" : ""}`}
              onClick={() => handleTabClick("ward")}
            >
              <div className='TabHeadline'>Ward Beds</div>
              <div className='Tabsubheadbox'>
                <div className='tabsubheadline'>
                  <div>Total :</div> <span>{wardBedData.total}</span>
                </div>
                <div className='tabsubheadline'>
                  <div>Available :</div> <span>{wardBedData.available}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content for doctor wise and department wise can be added here based on activeTab state */}
        {activeTab === "icu" && (
          <div className="tab-contents">
            <ICUbeds onBedDataChange={handleICUBedData} />
          </div>
        )}
        {activeTab === "ward" && (
          <div className="tab-contents">
            <Wardbeds onBedDataChange={handleWardBedData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BedVisibility;
