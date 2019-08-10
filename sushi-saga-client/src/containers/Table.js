import React, { Fragment } from 'react'

const Table = (props) => {

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
        You have: ${props.cash} remaining!
        <h2 className="warning">
        {props.warning}
         </h2>
      </h1>
    
      <div className="table">
        <div className="stack">
          {
            /* 
               renderPlates takes an array 
               and renders an empty plate
               for every element in the array
            */
            renderPlates(props.sushiAll)
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Table