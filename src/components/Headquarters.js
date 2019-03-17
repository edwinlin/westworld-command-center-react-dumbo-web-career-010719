import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'

class Headquarters extends Component {
  state={
    selectedHost:'none'
  }
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.
handleClick=(data)=>{
  // console.log(data)
  this.setState({selectedHost:data})

}

  render(){
// console.log(this.state.selectedHost)
// const hostsArray = this.props.data.hosts
// const hostsCards = hostsArray.map(hostObj=><ColdStorage host={hostObj}/>)
// console.log(hostsCards)
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>

        <ColdStorage hosts={this.props.data.hosts} selectHost={this.handleClick}/>

        </Grid.Column>
        <Grid.Column width={5}>
          <Details host={this.state.selectedHost} setActive={this.props.setActive} setArea={this.props.setArea}/>
        </Grid.Column>
        <Grid.Column width={3}>

        {<LogPanel/>}

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
