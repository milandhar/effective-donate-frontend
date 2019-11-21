import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Loader, Visibility, Card, Icon, Image, Progress } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import config from 'react-global-configuration';


class CountryCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      starred: false,
      show: false
    }
  }

  static propTypes = {
        src: PropTypes.string.isRequired,
        size: PropTypes.string
    }

  static defaultProps = {size: `large`,}

  showImage = () => {
    this.setState({show: true})
  }

  componentDidMount(){
    this.checkIfStarred()
  }

  handleStar = () => {
    //post to user_starred_projects here
    const userId = localStorage.userid
    const projectId = this.props.id
    const url = `${config.get('API_URL')}/api/v1/user_starred_projects`
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: userId, project_id: projectId})
    }
    fetch(url, headers)
      .then(res=>res.json())
      .then(json => {
        if(!json.error){
          this.setState({starred: true})
        }
      })
  }

  checkIfStarred = () => {
    let starred = false
    const userId = localStorage.userid
    const projectId = this.props.id
    const url = `${config.get('API_URL')}/api/v1/check_star`
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: userId, project_id: projectId})
    }
    fetch(url, headers)
    .then(res=>res.json())
    .then(json => {
        if(json["status"] === "Star"){
          starred = true
          this.setState({starred:true})
        }
    })
  }

  handleDollar = (project) => {
    this.props.handleDonate(project)
    this.props.history.push("/donate")
  }

  render(){
    const { size } = this.props
    if (!this.state.show) {
        return (
        <div className="visiblity-div">
          <Visibility as="span" onTopVisible={this.showImage}>
            <Loader active inline="centered" size={size} />
          </Visibility>
        </div>
      )
    }
    return(
    <Card>
    <Image src={this.props.image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{this.props.title}</Card.Header>
      <Card.Meta>{this.props.theme} | {this.props.country}</Card.Meta>
      <Card.Meta> <a className="org-link" href={this.props.orgUrl} target="_blank">{this.props.organization}</a></Card.Meta>
      <Progress value={this.props.funding} total={this.props.goal} color='blue' progress='percent' percent={Math.round(this.props.funding*100/this.props.goal)} />
      <Card.Meta>${this.props.funding.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} / ${this.props.goal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Card.Meta>
      <Card.Description>
        {this.props.name}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a onClick={this.handleStar}>
        {this.state.starred ? <Icon className="active" name='star' /> : <Icon name='star' />}
      </a>
      <a onClick={()=>this.handleDollar(this.props)}>
        <Icon name='dollar' />
      </a>
    </Card.Content>
  </Card>
    )
  }
}

export default withRouter(CountryCard)
