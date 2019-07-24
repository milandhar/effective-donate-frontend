import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


export default class CountryCard extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
    <Card>
    <Image src={this.props.image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{this.props.title}</Card.Header>
      <Card.Meta>{this.props.theme}</Card.Meta>
      <Card.Description>
        {this.props.name}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='star' />
        <Icon name='dollar sign' />
      </a>
    </Card.Content>
  </Card>
    )
  }


}
