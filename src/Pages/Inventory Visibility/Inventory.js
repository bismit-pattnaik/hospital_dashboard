import React from 'react'
import './Inventory.css'

function Inventory() {


    return (
        <div className='MainContentBox'>
            <div className='TitleLine'>
                <div className='HeaderTitleName'>
                    Inventory Visibility
                </div>
            </div>
            <div className='ContentBox'>
              <div className='ContentDetail'>

                <div className='StoreContainer'>
                    <div className='StoreNameContainer'>
                         Pharmacy Reception Area
                    </div>
                    <div className='TotalStockContainer'>
                         <div className='TotalItemBox'>
                            <div className='TitleHeadline'>
                                Total Items
                            </div>
                            <div className='TitleNumber'>
                                13352
                            </div>
                         </div>
                         <div className='LowOnStockBox'>
                            <div className='TitleHeadline1'>
                              Low on Stock ( &lt; 10 unit)
                            </div>
                            <div className='TitleNumber'>
                                567876
                            </div>
                         </div>
                    </div>
                    <div className='AnalysisContainer'>
                       <div className='AnalysisContainerHeader'>
                           Stock Age Analysis
                       </div>
                       <div className='StockAgeContainer'>
                          <div className='TitleHeadline'>
                            Stock Age &lt; 90 days
                          </div> 
                          <div className='SubTitleContainer'>
                            <div className='TitleNumber'> 3212 </div> <div className='SubTitleItems'>Items</div>
                          </div> 
                       </div>
                       <div className='StockAgeContainer'>
                       <div className='TitleHeadline'>
                            Stock Age &lt; 60 days
                          </div> 
                          <div className='SubTitleContainer'>
                            <div className='TitleNumber'> 5213 </div> <div className='SubTitleItems'>Items</div>
                          </div>
                       </div>
                       <div className='StockAgeContainer'>
                       <div className='TitleHeadline'>
                            Stock Age &lt; 30 days
                          </div> 
                          <div className='SubTitleContainer'>
                            <div className='TitleNumber'> 7223 </div> <div className='SubTitleItems'>Items</div>
                          </div>
                       </div>
                       <div className='LowStockContainer'>

                       </div>
                    </div>
                </div>
                
                <div className='StoreContainer'>
                    B
                </div>
                <div className='StoreContainer'>
                    C
                </div>

              </div>
            </div>
        </div>
      )
    }

export default Inventory