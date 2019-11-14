import React, { Component } from 'react'
import { Button, Icon, Table, Flag, Ref } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

class StarredProjectsList extends Component {

  constructor(props){
    super(props)
    this.state = {
      starredProjects: this.props.projectArray,
      reorderEnabled: false,
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  handleRemove = (project) => {
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
    <div>
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
            {(provided, snapshot) => (
              <Ref innerRef={provided.innerRef}>
                <Table.Body {...provided.droppableProps}>
                  {this.props.projectArray.map((project, idx) => {
                    return (
                      <Draggable
                        draggableId={project.id}
                        index={idx}
                        key={project.id}
                      >
                        {(provided, snapshot) => (
                        <Ref innerRef={provided.innerRef}>
                          <Table.Row {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={project.id}
                            className="project">
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
                        </Ref>
                        )}
                    </Draggable>)
                  })}
                  {provided.placeholder}
                </Table.Body>
              </Ref>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </div>
    )
  }
}

export default withRouter(StarredProjectsList)
