import React, { Component } from 'react'
import { Form, Header, Icon  } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

export default class LoginForm extends Component {

  constructor(){
    super();

    this.username = React.createRef()
    this.password = React.createRef()

    if (this.getToken()) {
        this.getProfile()
      }
    }

  getToken(jwt) {
    return localStorage.getItem('jwt')
  }

  getProfile = () => {
    let token = this.getToken()
    fetch('http://localhost:3000/api/v1/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res=>res.json())
    .then(json=> {
      this.setState({user: json.user})
      // this.props.onLogin(json.user);
      // localStorage.setItem("user_id", json.user.id)
    })
  }

  saveToken = (token) => {
    localStorage.setItem('jwt', token)
  }

  saveUserInfo = (json) => {
    localStorage.setItem('userid', json["user"]["id"])
    localStorage.setItem('username', json["user"]["username"])
    localStorage.setItem('email_address', json["user"]["email_address"])
    localStorage.setItem('first_name', json["user"]["first_name"])
    localStorage.setItem('last_name', json["user"]["last_name"])
  }

  login = (ev) => {
    ev.preventDefault()
    const username = this.username.current.value
    const password = this.password.current.value

    const URL = 'http://localhost:3000/api/v1/login/'
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: {username, password}})
    }
    fetch(URL, headers)
      .then(res=>res.json())
      .then(json => {
          if (json && json.jwt) {
            this.saveToken(json.jwt)
            this.saveUserInfo(json)
            this.getProfile()
            this.setState(prevState => ({
              loggedIn: true
            }), ()=> console.log(this.state.loggedIn));
            this.props.history.push("/map")
          }else{
            console.log('nope!')
          }
        })
      }


  render(){
    return(
      <div className='body'>
        <header className='spacer'> </header>
          <div className='login-section'>
            <div className='login-div'>
              <article className ='login'>
                <Header as='h1' icon textAlign='center'>
                  EffectiveDonate
                  <Icon name='globe' circular />
                </Header>
                <h2>Sign in</h2>
                <Form onSubmit={this.login}>
                <Form.Field className="login-field" onChange={this.handleChange}>
                <label>Username</label>
                <input name='username' type="text" placeholder='username' ref={this.username} required />
                </Form.Field>
                <Form.Field className="login-field" onChange={this.handleChange}>
                <label>Password</label>
                <input id='loginpassword' name='password' type="password" placeholder='password' ref={this.password} required />
                </Form.Field>
                <Form.Field>
                {/*<Link to ="/browse"> */}
                <input type="submit" class="large ui button" value="Log In" onClick={this.login}/>
                {/*</Link> */}
                <Link to="/create_user" replace>
                  <input type="submit" class="large ui button" value="Create Profile"/>
                </Link>
                </Form.Field>
                </Form>
              </article>
            </div>
          </div>
        </div>
    )
  }

}
