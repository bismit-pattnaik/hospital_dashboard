import React,{useState} from 'react'
import './IpdFootfall.css'


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
               
         gg

          </div>

        </div>




    </div>
  )
}

export default IpdFootfall