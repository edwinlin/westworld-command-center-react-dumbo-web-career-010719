import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  state = {
    options: [{key: "high_plains", text: "high_plains", value: "high_plains"},
              {key: "lowlands", text: "lowlands", value: "lowlands"},
              {key: "under_construction", text: "under_construction", value: "under_construction"},
              {key: "python_pass", text: "python_pass", value: "python_pass"},
              {key: "badlands", text: "badlands", value: "badlands"},
              {key: "pariah", text: "pariah", value: "pariah"}]
  }



  handleChange = (e, {value}) => {
    // console.log(e.target)
    this.props.host.area = value
    // console.log(this.props.host)
    this.props.setArea(this.props.host)
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }

  toggle = () => {
    this.props.setActive(this.props.host)
    // console.log(this.props.host);
  }
  render(){
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
                  checked={true}
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
