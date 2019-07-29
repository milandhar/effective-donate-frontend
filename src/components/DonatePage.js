import React, { Component } from 'react'
import { Grid, Header, Icon, Radio, Form } from 'semantic-ui-react'
import FavoriteThemes from './FavoriteThemes'
import DonationOptionsList from './DonationOptionsList'

import Navbar from './Navbar'

export default class DonatePage extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedProject: JSON.parse(localStorage.getItem('selectedProject')),
      donationOptions: [],
      chosenAmount: null
    }
  }

  componentDidMount(){
    this.findDonationOptions()
  }

  logout = () => {
    localStorage.setItem('jwt', '')
    localStorage.setItem('username', '')
    localStorage.setItem('email_address', '')
    localStorage.setItem('first_name', '')
    localStorage.setItem('last_name', '')
    this.props.history.push("/")
    return false
  }

  findDonationOptions = () => {
    let projectId = this.state.selectedProject.id
    const url = `http://localhost:3000/api/v1/find_donation_options`
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({project_id: projectId})
    }
    fetch(url, headers)
      .then(res=>res.json())
      .then(json => {
        console.log(json)
        this.setState({donationOptions: json})
      })
  }

  updateChosenAmount = (amount) => {
    this.setState({chosenAmount: amount})
  }

  handleAmountChange = (ev) => {
    this.updateChosenAmount(ev.target.value)
  }

  render() {
    return(
      <section>
        <Navbar logout={this.logout}/>
          <div>
            <Header as='h2' icon textAlign='center'>
              <Icon name='dollar sign' circular />
            </Header>
          </div>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header as='h2' textAlign='center'>
                <Header.Content>{this.state.selectedProject.title}</Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Amount:</label>
                  <input
                    placeholder='Donation Amount'
                    value={this.state.chosenAmount}
                    onChange={this.handleAmountChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Donate Monthly?</label>
                  <Radio toggle />
                </Form.Field>
                {(this.state.chosenAmount)
              ?<Form.Field>
                  <label>Total:</label>
                    <Header as='h2' textAlign='center'>
                      <Header.Content>{`$${this.state.chosenAmount}`}</Header.Content>
                    </Header>
                </Form.Field>
              : <div></div>
                }
              </Form>
            </Grid.Column>
            <Grid.Column>
              <DonationOptionsList updateChosenAmount={this.updateChosenAmount} donationOptions={this.state.donationOptions}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    )
  }

}
