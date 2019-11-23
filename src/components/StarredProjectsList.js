import React, { Component } from 'react'
import { Button, Icon, Table, Flag, Ref } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import config from 'react-global-configuration';

class StarredProjectsList extends Component {

  constructor(props){
    super(props)
    this.state = {
      starredProjects: props.projectArray,
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
    let { starredProjects } = this.state;
    let projectIds = []

    //go thru list of project objects and unshift their ids to the empty array
    starredProjects.forEach(project => {
      projectIds.unshift(project.id)
    })
    // Take new state of starred project list and POST to endpoint
    const userId = localStorage.userid
    const url = `${config.get('API_URL')}/api/v1/update_star_orders`
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: userId, project_array: projectIds})
    }
    fetch(url, headers)
      .then(res=>res.json())
      .then(json => {
        if(!json.error){
          alert("New order saved!")
        }
      })
  }

  onDragStart = start => {
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

  unselect = () => {
    this.unselectAll();
  }

  unselectAll = () => {
    this.setState({
      selectedRowIds: [],
    });
  }

  onDragEnd = result => {
    const { destination, source, reason } = result;

    // Not a thing to do...
    if (!destination || reason === 'CANCEL') {
      this.setState({
        draggingRowId: null,
      });
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const starredProjects = Object.assign([], this.state.starredProjects);
    const project = this.state.starredProjects[source.index];
    starredProjects.splice(source.index, 1);
    starredProjects.splice(destination.index, 0, project);
    this.setState({
      starredProjects
    });
  }

  onWindowKeyDown = event => {
    if (event.defaultPrevented) {
      this.unselectAll();
    }

    if (event.key === `Escape`) {
      this.unselectAll();
    }
  }

  onWindowClick = event => {
    if (event.defaultPrevented) {
      return;
    }
    this.unselectAll();
  }

  onWindowTouchEnd = event => {
    if (event.defaultPrevented) {
      return;
    }
    this.unselectAll();
  }

  toggleSelection = rowId => () => {
    const selectedRowIds = this.state.selectedRowIds;
    const wasSelected = selectedRowIds.includes(rowId);

    const newRowIds = (() => {
      // Row was not previously selected, now will be the only selected row
      if (!wasSelected) {
        return [rowId];
      }
      // Row was part of a selected group of rows, will now become the only selected row
      if (selectedRowIds.length > 1) {
        return [rowId];
      }
      // Row was previously selected but not in a group, will now clear the selection
      return [];
    })();

    this.setState({
      selectedRowIds: newRowIds,
    });
  }

  handleRemove = (project) => {
    this.props.removeFavorite(project.id)
  }

  goToDonation = (project) => {
    this.props.handleDonate(project)
    this.props.history.push("/donate")
  }


  render(){
    const { reOrder, saveOrder } = this;
    const { StarredProjects, selectedRowIds, reorderEnabled } = this.state;
    const selected = selectedRowIds;
    return(
    <div style={{padding: "30px" }}>
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
                  {this.state.starredProjects.map((project, idx) => {
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
      {/*<Button onClick={reOrder}>{reorderEnabled ? "Cancel Reorder" : "Toggle Reorder"}</Button> */}
      <Button onClick={saveOrder}>Save New Order</Button>
    </div>
    )
  }
}

export default withRouter(StarredProjectsList)
