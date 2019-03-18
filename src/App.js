import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
import { Log } from './services/Log'

class App extends Component {

  state={
    areas:[],
    hosts:[],
    selectedHost:'none',
    activateAll:false,
    logs:[]
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

  logError=(logError)=>{
    const updatedLogs = [...this.state.logs, logError]
    this.setState({logs:updatedLogs})

  }

  setActive=(hostInfo)=>{
    // hostInfo.active=!hostInfo.active
    // console.log(hostInfo)
    const copyHosts = [...this.state.hosts]
    const copyHostInfo = copyHosts.find(host=>hostInfo.id === host.id)
    copyHostInfo.active=!copyHostInfo.active
    this.setState({hosts:copyHosts})
    if(copyHostInfo.active == true){
      const updatedLogs = [...this.state.logs, Log.warn(`Activated ${hostInfo.firstName}`)]
      this.setState({logs:updatedLogs})
    }else{
      const updatedLogs = [...this.state.logs, Log.notify(`Decommissioned ${hostInfo.firstName}`)]
      this.setState({logs:updatedLogs})
    }

  }

  setArea=(updatedHostInfo)=>{
    // console.log(updatedHostInfo)
    // this.setState({...this.state.hosts, updatedHostInfo})
    const copyHosts = [...this.state.hosts]
    let copyHostInfo = copyHosts.find(host=>updatedHostInfo.id === host.id)
    copyHostInfo = updatedHostInfo
    this.setState({hosts:copyHosts})

    const updatedLogs = [...this.state.logs, Log.notify(`${updatedHostInfo.firstName} set in area ${updatedHostInfo.area}`)]
    this.setState({logs:updatedLogs})
  }

  selectHost=(data)=>{
    // console.log(data)
    this.setState({selectedHost:data})
  }

  activateAll=(e)=>{
    const copyHosts = [...this.state.hosts]
    if(this.state.activateAll === false){
      copyHosts.forEach(host=> host.active=true)
      this.setState({activateAll:true})

      const updatedLogs = [...this.state.logs, Log.warn(`Activating all hosts!`)]
      this.setState({logs:updatedLogs})
    }else{
      copyHosts.forEach(host=> host.active=false)
      this.setState({activateAll:false})

      const updatedLogs = [...this.state.logs, Log.notify(`Decommissioning all hosts!`)]
      this.setState({logs:updatedLogs})
    }

    // console.log(copyHosts)
    e.target.innerText==="ACTIVATE ALL" ? e.target.innerText="DE-ACTIVATE ALL" : e.target.innerText ="ACTIVATE ALL"
    e.target.innerText==="ACTIVATE ALL" ? e.target.className="ui red fluid button" : e.target.className="ui blue fluid button"

    this.setState({hosts:copyHosts})
  }


  render(){
    // console.log(this.state)
    return (
      <Segment id='app'>
        {<WestworldMap data={this.state} selectHost={this.selectHost}/>}
        {<Headquarters data={this.state} setActive={this.setActive} setArea={this.setArea} selectHost={this.selectHost} activateAll={this.activateAll} logError={this.logError} />}
      </Segment>
    )
  }
}

export default App;
