import React, { Component } from 'react'
import { Button, Icon, Table, Flag } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class StarredProjectsList extends Component {

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
            return (<Table.Row key={project.id} className="project">
              <Table.Cell>
                {project.country.name}
                <Flag name={project.country.name.toLowerCase()}/>
              </Table.Cell>
              <Table.Cell width={5}>
                {project.title}
              </Table.Cell>
              <Table.Cell>
              Funding: ${project.funding.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} / Goal: ${project.goal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={()=>this.handleRemove(project)} icon>
                  <Icon name='close' />
                </Button>
                <Button color='green' onClick={()=>this.goToDonation(project)} icon>
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
