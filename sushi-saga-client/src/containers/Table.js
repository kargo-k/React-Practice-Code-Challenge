import React, { Fragment } from 'react'

const Table = ({cash,warning,sushiAll}) => {

  const renderPlates = (array) => {
    console.log(array)
    if(array){

    return array.map((item, index) => {
      if(item.eaten == true){
        return <div className="empty-plate" style={{ top: -7 * index }}/>
      }
    })
  }
  }

  return (
    <Fragment>
      <h1 className="remaining">
        You have: ${cash} remaining!
        <h2 className="warning">
        {warning}
         </h2>
      </h1>
    
      <div className="table">
        <div className="stack">
          {
            renderPlates(sushiAll)
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Table