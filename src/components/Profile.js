import React, { Component } from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import FavoriteThemes from './FavoriteThemes'
import Navbar from './Navbar'
import StarredProjectsList from './StarredProjectsList'
import { withRouter } from 'react-router-dom'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            projectArray: [],
            square: { width: 175, height: 175 }
          }
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
        }))

     }

     editEmail = message_template => {
         this.setState(prevState => ({
             profileInfo: {...prevState.profileInfo,
                 message_template
             }
         }))
     }

     logout = () => {
       localStorage.setItem('userid', '')
       localStorage.setItem('jwt', '')
       localStorage.setItem('username', '')
       localStorage.setItem('email_address', '')
       localStorage.setItem('first_name', '')
       localStorage.setItem('last_name', '')
       this.props.history.push("/")
       return false
     }

     removeFavorite = (projectId) => {
       const userId = localStorage.userid
       const url = `http://localhost:3000/api/v1/remove_project`
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
           if(json.error){
             alert(`Could not remove project: ${json["error"]}`)
           } else{
             alert(json["message"])
             this.fetchProjects()
           }
        })
     }

    render() {
        {document.body.style = 'background: white;'}
        return(
          <section class = "profile-section">
           <Navbar activeItem='profile' logout={this.logout}/>
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  <div class='profile-header'>
                    <h2 class="ui header highlight">
                      <i class="user icon"></i>
                    </h2>
                    <h2 class="ui header highlight">
                      {localStorage.first_name} {localStorage.last_name}
                    </h2>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <h1 class="ui center aligned header highlight">
                    Favorite Themes:
                  </h1>
                  <FavoriteThemes updateAppThemes={this.props.updateAppThemes} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <h1 class="ui center aligned header highlight">
                    Starred Projects:
                  </h1>
                  <StarredProjectsList handleDonate={this.props.handleDonate} removeFavorite={this.removeFavorite} projectArray={this.state.projectArray}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        </section>
        )
    }
}

export default withRouter(Profile)
