import React, { Component } from 'react'
import { Image, Button, Icon, Table } from 'semantic-ui-react'
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
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Project Title</Table.HeaderCell>
            <Table.HeaderCell>Funding / Goal</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.projectArray.map((project, idx) => {
            {console.log(project)}
            return (<Table.Row key={project.id} className="project">
              <Table.Cell>
                {project.country.name}
              </Table.Cell>
              <Table.Cell>
                {project.title}
              </Table.Cell>
              <Table.Cell>
              Funding: ${project.funding.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} / Goal: ${project.goal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </Table.Cell>
              <Table.Cell>
                <Button onClick={()=>this.handleRemove(project)} icon>
                  <Icon name='close' />
                </Button>
                <Button onClick={()=>this.goToDonation(project)} icon>
                  <Icon name='dollar sign' />
                </Button>
              </Table.Cell>
            </Table.Row>)
          })}
        </Table.Body>
      </Table>
    )
  }
}

export default withRouter(StarredProjectsList)
