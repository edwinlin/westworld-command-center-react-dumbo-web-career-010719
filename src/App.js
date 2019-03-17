import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
class App extends Component {
  setActive=(hostInfo)=>{
    hostInfo.active=!hostInfo.active
    // console.log(hostInfo)
    this.setState({...this.state.hosts, hostInfo})
  }
  setArea=(updatedHostInfo)=>{
    // console.log(updatedHostInfo)
    this.setState({...this.state.hosts, updatedHostInfo})
  }

  state={
    areas:[],
    hosts:[]
  }
  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.
  componentDidMount(){
    fetch('http://localhost:4000/areas').then(resp=>resp.json())
    .then(areas=>{
      // console.log(areas)
      this.setState({areas})
    })
    fetch('http://localhost:4000/hosts').then(resp=>resp.json())
    .then(hosts=>{
      // console.log(hosts)
      this.setState({hosts})
    })
  }

  render(){
    console.log(this.state)
    return (
      <Segment id='app'>
        {<WestworldMap data={this.state}/>}
        {<Headquarters data={this.state} setActive={this.setActive} setArea={this.setArea}/>}
      </Segment>
    )
  }
}

export default App;
