import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {props.allSushi.map(sushi => {
          return <Sushi sushi={sushi} handleEatSushi={props.handleEatSushi} key={sushi.id} />;
        })}
        <MoreButton handleMore={props.handleMore} />
      </div>
    </Fragment>
  )
}

export default SushiContainer