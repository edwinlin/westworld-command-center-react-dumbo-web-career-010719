import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = (props) => (
  // const areasArray = props.areas
    // <div></div>
    // {console.log(props.data.hosts)}
    <div className='area' id={props.area.name}>

      <h3 className='labels'>{props.area.name}</h3>

      {<HostList hosts={props.data.hosts.filter(host=>host.active !== false && host.area == props.area.name)}/>}

    </div>

)

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
