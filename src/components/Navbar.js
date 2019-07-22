import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'


export default class Navbar extends Component {

    constructor() {
      super();
        this.state = {
        user_id: null,
        username: ''
      };
    }

    logout = () => {
      // localStorage.setItem('jwt', '')
      // localStorage.setItem('username', '')
      // localStorage.setItem('email_address', '')
      // localStorage.setItem('first_name', '')
      // localStorage.setItem('last_name', '')
      // this.props.history.push("/")
      // return false
      this.props.logout()
    }

    // getProfile = () => {
    //   let token = localStorage.getItem("jwt")
    //   fetch('http://localhost:3000/api/v1/profile', {
    //     headers: {
    //       'Authorization': 'Bearer ' + token
    //     }
    //   })
    //   .then(res=>res.json())
    //   .then(json=> {
    //     console.log(json)
    //     this.setState({
    //       user_id: json.user.id,
    //       username: json.user.username
    //     })
    //   })
    // }

    render() {
        return(
            <div>
              <div class="ui seven fluid item top attached menu borderless">
                <div class="item">
                <a class="item" href="http://localhost:3001/browse">
                  <img class="ui avatar image" />
                Map
                </a>
                </div>
                <a href="http://localhost:3001/liked" class="item">
                Favorites
                </a>
                <a class='item'></a>
                <a class='item bark-font'>
                  <h2 className='bark-font'>         EffectiveDonate         </h2>
                </a>
                <a class='item'></a>
                <a href="http://localhost:3001/profile" class="item">
                  <i class='user icon'></i>
                    {localStorage.getItem('username')}
                  </a>
                <div class="item">
                  <div onClick={this.logout} class="ui blue button">Log Out</div>
                </div>
              </div>
            </div>
          )
        }
      }
