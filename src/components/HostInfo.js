import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'
import { Log } from '../services/Log'


class HostInfo extends Component {
  state = {
    options: [{key: "high_plains", text: "High Plains", value: "high_plains"},
              {key: "lowlands", text: "Low Lands", value: "lowlands"},
              {key: "under_construction", text: "Under Construction", value: "under_construction"},
              {key: "python_pass", text: "Python Pass", value: "python_pass"},
              {key: "badlands", text: "Badlands", value: "badlands"},
              {key: "pariah", text: "Pariah", value: "pariah"}]
  }



  handleChange = (e, {value}) => {
    // console.log(this.props.data.areas)
    const areasArray = [...this.props.data.areas]
    const currentLimit = areasArray.find(area=>area.name===value).limit
    // console.log(currentLimit)
    const hostsArray = [...this.props.data.hosts]
    const currentOccupants = hostsArray.filter(host=>host.area===value)
    const currentActiveOccupants = hostsArray.filter(host=>host.area===value && host.active===true)
    const currentInactiveOccupants = hostsArray.filter(host=>host.area===value && host.active===false)

    if(currentOccupants.length === currentLimit && currentInactiveOccupants.length > 0){
      currentInactiveOccupants[0].area = this.props.host.area
      // console.log(currentInactiveOccupants[0])
    }
    if(currentActiveOccupants.length < currentLimit){
      this.props.host.area = value
      // console.log(this.props.host)
      this.props.setArea(this.props.host)
    }else{
      // alert('At Capacity')
      this.props.logError(Log.error(`Too many hosts. Cannot add ${this.props.host.firstName} to ${value}`))
    }
    const updatedLogs = [...this.props.data.logs, Log.warn(`Activating all hosts!`)]
    this.setState({logs:updatedLogs})

    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }

  toggle = () => {
    this.props.setActive(this.props.host)
    // console.log(this.props.host);
  }
  render(){
    // console.log(this.props)

    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={ this.props.host.imageUrl }
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.host.firstName} | { this.props.host.gender !== 'Female' ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={this.props.host.active !== false ? "Active" : "Decommissioned"}
                  checked={this.props.host.active}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.host.area}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
