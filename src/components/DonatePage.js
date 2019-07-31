import React, { Component } from 'react'
import { Grid, Header, Icon, Radio, Form, Button, Message } from 'semantic-ui-react'
import FavoriteThemes from './FavoriteThemes'
import DonationOptionsList from './DonationOptionsList'

import Navbar from './Navbar'

export default class DonatePage extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedProject: JSON.parse(localStorage.getItem('selectedProject')),
      donationOptions: [],
      starred: false,
      chosenAmount: null,
      firstName: '',
      lastName: '',
      email: '',
      cardNumber: null,
      expiration: '',
      code: null,
      submittedFirstName: '',
      submittedLastName: '',
      submittedEmail: '',
      submittedCardNumber: '',
      submittedExpiration: '',
      submittedCode: null
    }
  }

  componentDidMount(){
    this.findDonationOptions()
    this.checkIfStarred()
  }

  logout = () => {
    localStorage.setItem('jwt', '')
    localStorage.setItem('username', '')
    localStorage.setItem('email_address', '')
    localStorage.setItem('first_name', '')
    localStorage.setItem('last_name', '')
    localStorage.setItem('selectedProject', '')
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
        if(json && json[0]){
          this.setState({donationOptions: json, chosenAmount: json[0].amount})
        }
      })
  }

  updateChosenAmount = (amount) => {
    this.setState({chosenAmount: amount})
  }

  handleAmountChange = (ev) => {
    this.updateChosenAmount(ev.target.value)
  }

  handleSubmit = () => {
    const { firstName, lastName, email, cardNumber, expiration, code } = this.state
    this.setState({
      submittedFirstName: firstName,
      submittedLastName: lastName,
      submittedEmail: email,
      submittedcardNumber: cardNumber,
      submittedExpiration: expiration,
      submittedCode: code
    })
  }

  handleChange = (ev, { name, value }) => {
    this.setState({ [name]: value})
  }

  checkIfStarred = () => {
    let starred = false
    const userId = localStorage.userid
    const projectId = this.state.selectedProject.id
    const url = `http://localhost:3000/api/v1/check_star`
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
      console.log(json)
        if(json["status"] === "Star"){
          starred = true
          this.setState({starred:true})
        }
    })
  }

  handleStar = () => {
    //post to user_starred_projects here
    const userId = localStorage.userid
    const projectId = this.state.selectedProject.id
    const url = `http://localhost:3000/api/v1/user_starred_projects`
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
              <Header as='h1' textAlign='center'>
                <Header.Content>{this.state.selectedProject.title}</Header.Content>
              </Header>
              <a onClick={this.handleStar}>
              {this.state.starred ? <Icon className="donate active" name='star' /> : <Icon name='star' />}
              </a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Amount:</label>
                  <input
                    id='amount-input'
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
          <Grid.Row columns={1}>
            <Grid.Column>
              <Message positive>
                <Message.Header>On-Site Payment Coming Soon!</Message.Header>
                  <p>You may complete your donation on <a target="_blank" href={this.state.selectedProject.projectLink}>GlobalGiving</a></p>
              </Message>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <div id="payment-div">
                  <Form.Group>
                    <Form.Input onChange={this.handleChange} name='firstName' value={this.state.firstName} label='First Name' placeholder='First Name' width={4} />
                    <Form.Input onChange={this.handleChange} name='lastNAme' value={this.state.lastNAme} label='Last Name' placeholder='Last Name' width={4} />
                    <Form.Input onChange={this.handleChange} name='email' value={this.state.email} type='email' label='Email Address' placeholder='Email Address' width={8} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input onChange={this.handleChange} name='cardNumber' value={this.state.cardNumber} type='tel' label='Card Number' placeholder='Card Number' width={8} />
                    <Form.Input onChange={this.handleChange} name='expiration' value={this.state.expiration} label='Expiration' placeholder='MM/YY' width={5} />
                    <Form.Input onChange={this.handleChange} name='code' value={this.state.code} label='Code' placeholder='Code' width={3} />
                  </Form.Group>
                  <Form.Checkbox label='I agree to the Terms and Conditions' />
                  <Button type='submit'>Complete Donation</Button>
                </div>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    )
  }

}
