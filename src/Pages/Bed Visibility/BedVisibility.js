import React , {useState} from 'react'
import './BedVisibility.css'
import ICUbeds from './ICUbeds';
import Wardbeds from './Wardbeds';

function BedVisibility() {

  const [activeTab, setActiveTab] = useState("icu");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
                  <div>Total :</div> <span>300</span>
                </div>
                <div className='tabsubheadline'>
                  <div>Available :</div> <span>203</span>
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
                  <div>Total :</div> <span>350</span>
                </div>
                <div className='tabsubheadline'>
                  <div>Available :</div> <span>173</span>
                </div>
              </div>
            </div>
          </div>
          </div>


            {/* Content for doctor wise and department wise can be added here based on activeTab state */}
            {activeTab === "icu" && (
                 <div className="tab-content">
                     <ICUbeds/>
                 </div> 
                 )}
             {activeTab === "ward" && (
                <div className="tab-content">
                    <Wardbeds/>
                </div>
                )}




        </div>
    </div>
  )
}

export default BedVisibility