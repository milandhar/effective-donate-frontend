import React, { Component } from 'react'
import { Image, List, Button, Icon } from 'semantic-ui-react'

export default class StarredProjectsList extends Component {
  constructor(props){
    super(props)
  }

  componentDidUpdate(){
    console.log(this.props.projectArray)
  }


  render(){
    return(
      <List divided verticalAlign='middle'>
      {this.props.projectArray.map((project, idx) => {
        return (<List.Item className="project">
          <List.Content>
            {project.country.name}
          </List.Content>
          <List.Content>
            <List.Header> {project.title} </List.Header>
          </List.Content>
          <List.Content>
          Funding: ${project.funding.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} / Goal: ${project.goal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </List.Content>
          <List.Content>
            <Button icon>
              <Icon name='close' />
            </Button>
            <Button icon>
              <Icon name='dollar sign' />
            </Button>
          </List.Content>
        </List.Item>)
      }) }
      </List>
    )
  }
}
