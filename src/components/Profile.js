import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import FavoriteThemes from './FavoriteThemes'

import Navbar from './Navbar'
// import ProfileDisplay from './ProfileDisplay'
// import EmailDisplay from './EmailDisplay'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            }
          // this.getProfile()
        };

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
      //       profileInfo: {
      //         ...this.state.profileInfo,
      //         username: json.user.username,
      //         email_address: json.user.email_address,
      //         zipcode: json.user.zipcode,
      //         user_id: json.user.id,
      //         message_template: json.user.message_template
      //       }
      //     });
      //   })
      // }



    handleSelect = event => {
        const profileBtn = document.getElementById('profile')
        const emailBtn = document.getElementById('email')
        event.persist()
        if(event.target.id===emailBtn.id){
            emailBtn.classList.add('active')
            profileBtn.classList.remove('active')
        }else{
            profileBtn.classList.add('active')
            emailBtn.classList.remove('active')
        }
        this.setState(prevState => ({
            selected: event.target.name
        }), ()=> console.log('hello',  this.state.selected))

     }

     editEmail = message_template => {
         this.setState(prevState => ({
             profileInfo: {...prevState.profileInfo,
                 message_template
             }
         }), ()=> console.log(this.state.profileInfo))
     }


    render() {
        {document.body.style = 'background: white;'}
        return(
          <section class = "profile-section">
           <Navbar />
            <Grid celled>
              <Grid.Row>
                <Grid.Column width={3}>
                {/*<div class="row list-top-image">*/}
                  <div class='profile-header'>
                    <h2 class="ui header highlight">
                      {localStorage.getItem('username')}
                    </h2>
                    <h2 class="ui header highlight">
                      <i class="user icon"></i>
                    </h2>
                    <h2 class="ui header highlight">
                      {localStorage.first_name} {localStorage.last_name}
                    </h2>
                  </div>
                {/*</div>*/}
                </Grid.Column>
                <Grid.Column width={13}>
                  <h1 class="ui center aligned header highlight">
                    Favorite Themes:
                  </h1>
                  <FavoriteThemes />
                {/*  <div class="dropdown-container">
                    <div class="select-container">
                      <select class="ui dropdown">
                        <option value="">Humanitarian Assistance</option>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </select>
                      <button class="ui icon button">
                        <i class="plus circle icon"></i>
                      </button>
                    </div>
                    <div class="select-container">
                      <select class="ui dropdown">
                        <option value="">Democracy and Governance</option>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </select>
                      <button class="ui icon button">
                        <i class="plus circle icon"></i>
                      </button>
                    </div>
                    <div class="select-container">
                      <select class="ui dropdown">
                        <option value="">Climate Change</option>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </select>
                      <button class="ui icon button">
                        <i class="plus circle icon"></i>
                      </button>
                    </div>
                  </div> */}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={13}>
                  <h1 class="ui center aligned header highlight">
                    Favorited Projects:
                  </h1>
                  <div class="ui relaxed divided list">
                    <div class="item">
                      <i class="large github middle aligned icon"></i>
                      <div class="content">
                        <div class="header">Poor women micro-enterprise development-Indonesia</div>
                        <div class="description">Indonesia</div>
                      </div>
                      <div class="buttons">
                        <button class="ui button">Donate</button>
                        <button class="ui button">
                          <i class="close icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="item">
                      <i class="large github middle aligned icon"></i>
                      <div class="content">
                        <div class="header">Digital Divide Data (DDD)</div>
                        <div class="description">United States</div>
                      </div>
                      <div class="buttons">
                        <button class="ui button">Donate</button>
                        <button class="ui button">
                          <i class="close icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="item">
                      <i class="large github middle aligned icon"></i>
                      <div class="content">
                        <div class="header">Community-based landslide awareness in El Salvador</div>
                        <div class="description">El Salvador</div>
                      </div>
                      <div class="buttons">
                        <button class="ui button">Donate</button>
                        <button class="ui button">
                          <i class="close icon"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/*<div class="row mint">
                <div class="ui fluid three item top attached tabular menu">
                    <a class="active item" onClick={this.handleSelect} name='profile' id='profile'>
                        Profile
                    </a>
                    <a class="item" onClick={this.handleSelect} name='email' id='email'>
                         <i class="envelope outline icon"></i> Email
                    </a>

                 </div>
                </div>
                */}


            {/* {this.state.selected==='email'?*/}
            {/* <EmailDisplay updateEmail={this.getProfile} user={this.state.profileInfo} />:*/}
            {/* <ProfileDisplay updateProfile={this.getProfile} user={this.state.profileInfo}/>}*/}
        </section>
        )
    }
}
