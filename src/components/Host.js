import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {
  // debugger
  // console.log(props.host)
  if(props.host.active===false){
    return(
      <Card
        className="host"
        // {/* NOTE: The className "host selected" renders a different style than simply "host". */}
        onClick={()=>props.selectHost(props.host)}
        image={props.host.imageUrl}
        raised
      />
    )
  }else{
    return(
      <Card
        className="host selected"
        // {/* NOTE: The className "host selected" renders a different style than simply "host". */}
        onClick={()=>props.selectHost(props.host)}
        image={props.host.imageUrl}
        raised
      />
    )
  }
}

export default Host
