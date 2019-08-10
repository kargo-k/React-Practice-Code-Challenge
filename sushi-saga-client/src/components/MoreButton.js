import React from 'react'

const MoreButton = ({handleMore}) => {
    return <button onClick={()=>{handleMore()}}>
            More sushi!
          </button>
}

export default MoreButton