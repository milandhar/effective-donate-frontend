import React, { Component } from 'react'

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

     editProfile = newState =>{
     }

    render() {
        {document.body.style = 'background: white;'}
        return(
            <section class = "profile-section">
             <Navbar />
            <div class="ui celled grid">
              <div class="row list-top-image">
                <div class='profile-header'>
                  <h2 class="ui header highlight">
                    {localStorage.getItem('username')}
                  </h2>
                  <h2 class="ui header highlight">
                    <i class="user icon"></i>
                  </h2>
                  <h2 class="ui header highlight">
                    {localStorage.getItem('first_name')} {localStorage.getItem('last_name')}
                  </h2>
              </div>
            </div>
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
            </div>

            {/* {this.state.selected==='email'?*/}
            {/* <EmailDisplay updateEmail={this.getProfile} user={this.state.profileInfo} />:*/}
            {/* <ProfileDisplay updateProfile={this.getProfile} user={this.state.profileInfo}/>}*/}
        </section>
        )
    }
}
