import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

const WestworldMap = (props) => {
  // console.log(props.data.areas)
  const areasArray = props.data.areas
  const areaCards = areasArray.map(areaObj=><Area data={props.data} area={areaObj}/>)
  return (
    <Segment id="map" >
      {areaCards}
    </Segment>
  )
}

export default WestworldMap
