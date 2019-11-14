import React, { Component } from 'react'
import { Button, Icon, Table, Flag } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

class StarredProjectsList extends Component {

  handleRemove = (project) => {
    console.log(project)
    this.props.removeFavorite(project.id)
  }

  goToDonation = (project) => {
    this.props.handleDonate(project)
    this.props.history.push("/donate")
  }

  onDragEnd = (result) => {
    // ToDo: Reorder our table
  }


  render(){
    return(
    <DragDropContext onDragEnd={this.onDragEnd}>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Project Title</Table.HeaderCell>
            <Table.HeaderCell>Funding / Goal</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Droppable droppableId="table">
          {(droppableProvided: DroppableProvided) => (
            <Table.Body
              ref={(ref: ?HTMLElement) => {
                this.tableRef = ref;
                droppableProvided.innerRef(ref)
              }}
              {...droppableProvided.droppableProps}
              >
              {this.props.projectArray.map((project, idx) => {
                return (
                  <Draggable
                    draggableId={project.id}
                    index={idx}
                    key={project.id}>
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot,
                    ) => (
                      <Table.Row key={project.id} className="project">
                      <Table.Cell>
                        {project.country.name}
                        <Flag name={project.country.name.toLowerCase()}/>
                      </Table.Cell>
                      <Table.Cell width={5}>
                        {project.title}
                      </Table.Cell>
                      <Table.Cell className="fundingCell">
                      Funding: ${project.funding.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} / Goal: ${project.goal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </Table.Cell>
                      <Table.Cell id="remove-donate-div">
                        <Button color='red' onClick={()=>this.handleRemove(project)} icon>
                          <Icon name='close' />
                        </Button>
                        <Button color='green' onClick={()=>this.goToDonation(project)} icon>
                          <Icon name='dollar sign' />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                    )}
                </Draggable>)
              })}
            </Table.Body>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
    )
  }
}

export default withRouter(StarredProjectsList)
