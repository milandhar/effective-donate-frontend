import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import FavoriteThemes from './FavoriteThemes'

import Navbar from './Navbar'
import StarredProjectsList from './StarredProjectsList'
// import ProfileDisplay from './ProfileDisplay'
// import EmailDisplay from './EmailDisplay'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            projectArray: []
          }
          // this.getProfile()
        };

    componentDidMount(){
      this.fetchProjects()
    }

    fetchProjects = () => {
      let userId = localStorage.userid
      const url = `http://localhost:3000/api/v1/get_user_projects`
      const headers = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id: userId})
      }
      fetch(url, headers)
        .then(res=>res.json())
        .then(json => {
          if(!json.error){
            this.setState({projectArray: json})
          }
        })
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

     logout = () => {
       localStorage.setItem('jwt', '')
       localStorage.setItem('username', '')
       localStorage.setItem('email_address', '')
       localStorage.setItem('first_name', '')
       localStorage.setItem('last_name', '')
       this.props.history.push("/")
       return false
     }

    render() {
        {document.body.style = 'background: white;'}
        return(
          <section class = "profile-section">
           <Navbar logout={this.logout}/>
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
                    Starred Projects:
                  </h1>
                  <StarredProjectsList projectArray={this.state.projectArray}/>
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
