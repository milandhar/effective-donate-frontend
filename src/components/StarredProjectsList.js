import React, { Component } from 'react'
import { Image, List, Button, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class StarredProjectsList extends Component {
  constructor(props){
    super(props)
  }

  handleRemove = (project) => {
    console.log(project)
    this.props.removeFavorite(project.id)
  }

  goToDonation = (project) => {
    this.props.handleDonate(project)
    this.props.history.push("/donate")
  }


  render(){
    return(
      <List divided verticalAlign='middle'>
      {this.props.projectArray.map((project, idx) => {
        return (<List.Item key={project.id} className="project">
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
            <Button onClick={()=>this.handleRemove(project)} icon>
              <Icon name='close' />
            </Button>
            <Button onClick={()=>this.goToDonation(project)} icon>
              <Icon name='dollar sign' />
            </Button>
          </List.Content>
        </List.Item>)
      })}
      </List>
    )
  }
}

export default withRouter(StarredProjectsList)
