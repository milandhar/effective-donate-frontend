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
      selectedRowIds: [],
      draggingRowId: null
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount () {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('keydown', this.onWindowKeyDown);
    window.addEventListener('touchend', this.onWindowTouchEnd);
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('click', this.onWindowClick);
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && ("lightblue"),
    ...draggableStyle,
  })

  reOrder = () => {
    const { reorderEnabled } = this.state

    this.setState({
      reorderEnabled: !reorderEnabled
    })
  }

  saveOrder = () => {
    const { starredProjects } = this.state;
    // Take new state of dispo group list and POST to endpoint
  }

  onDragStart = start => {
    console.log(start)
    const id = start.draggableId;
    const selected = this.state.selectedRowIds.find(selectedId => selectedId === id);

    // If dragging an item that is not selected, unselect all items
    if (!selected) {
      this.unselectAll();
    }

    this.setState({
      draggingRowId: start.draggableId,
    });
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
    const { reOrder, saveOrder } = this;
    const { StarredProjects, selectedRowIds, reorderEnabled } = this.state;
    const selected = selectedRowIds;
    return(
    <div style={{padding: "30px" }}>
      <Button onClick={reOrder}>{reorderEnabled ? "Cancel Reorder" : "Toggle Reorder"}</Button>
      <Button onClick={saveOrder}>Save New Order</Button>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              {reorderEnabled && (<Table.HeaderCell />)}
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
                        draggableId={project.id.toString()}
                        index={idx}
                        key={project.id}
                      >
                        {(provided, snapshot) => (
                        <Ref innerRef={provided.innerRef}>
                          <Table.Row
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={this.getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            key={project.id}
                            className="project">
                            {reorderEnabled && (<Table.Cell>{
                                <Icon
                                  name="bars"
                                  color="grey"
                                  className="ds__DispoGroup__row-drag"
                                />
                              }</Table.Cell>)}
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
