import React, { useState, useEffect } from 'react';
import './BedVisibility.css';
import ICUbeds from './ICUbeds';
import Wardbeds from './Wardbeds';
import axios from 'axios';

function BedVisibility() {

  // const tokenNo = process.env.REACT_APP_TOKEN_NO;
  const tokenNo = localStorage.getItem('tokenNo');
  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;
  const [activeTab, setActiveTab] = useState("icu");
  const [icuBedData, setIcuBedData] = useState({ total: 0, available: 0 });
  const [wardBedData, setWardBedData] = useState({ total: 0, available: 0 });

  const [bedDataicu, setBedDataicu] = useState({});
  const [bedDataward, setBedDataward] = useState({});

  useEffect(() => {
    const fetchICUBedData = async () => {                    // Fetch ICU bed data
      try {
        const response = await axios.get(`${DASHBOARD_URL}/adhocapi/dashboard/bedavailability?type=ICU`,{
          headers: { Authorization: `Bearer ${tokenNo}` }
        });
        const icuData = response.data.data;
        setBedDataicu(icuData);
        const { total, available } = calculateBedCounts(icuData);
        setIcuBedData({ total, available });
      } catch (error) {
        console.error('Error fetching ICU bed data:', error);
      }
    };

    const fetchWardBedData = async () => {                         // Fetch Ward bed data
      try {
        const response = await axios.get(`${DASHBOARD_URL}/adhocapi/dashboard/bedavailability?type=`,{
          headers: { Authorization: `Bearer ${tokenNo}` }
        });
        const wardData = response.data.data;
        setBedDataward(wardData);
        const { total, available } = calculateBedCounts(wardData);
        setWardBedData({ total, available });
      } catch (error) {
        console.error('Error fetching Ward bed data:', error);
      }
    };

    fetchICUBedData();
    fetchWardBedData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const calculateBedCounts = (data) => {
    let total = 0;
    let available = 0;
    Object.values(data).forEach(beds => {
      total += beds.length;
      available += beds.filter(bed => bed.bedStatus === 'Available').length;
    });
    return { total, available };
  };

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
            <ICUbeds bedData={bedDataicu}/>
          </div>
        )}
        {activeTab === "ward" && (
          <div className="tab-contents">
            <Wardbeds bedData={bedDataward}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default BedVisibility;
