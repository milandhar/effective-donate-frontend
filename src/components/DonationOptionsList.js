import React, { Component } from 'react'
import { List, Button } from 'semantic-ui-react'

export default class DonationOptionsList extends Component {

  handleClick = (amount) => {
    this.props.updateChosenAmount(amount)
  }

  render(){
    return(
      <List divided verticalAlign='middle'>
      {this.props.donationOptions.map((option, idx) => {
        return (<List.Item key={option.id} className="donation options">
          <List.Content className="donation amount">
          <Button color='green' onClick={() => this.handleClick(option.amount)} circular>${option.amount}</Button>
          </List.Content>
          <List.Content className="donation description">
            <List.Header> {option.description} </List.Header>
          </List.Content>
        </List.Item>)
      })}
      </List>
    )
  }
}
