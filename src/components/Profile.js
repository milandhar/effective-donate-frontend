import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import FavoriteThemes from './FavoriteThemes'
import Navbar from './Navbar'
import StarredProjectsList from './StarredProjectsList'
import Footer from './Footer'
import { withRouter } from 'react-router-dom'
import config from 'react-global-configuration';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            projectArray: [],
            projectArrayUpdated: false,
            square: { width: 175, height: 175 }
          }
        };

    componentDidMount(){
      this.fetchProjects()
    }

    fetchProjects = () => {
      let userId = localStorage.userid
      const url = `${config.get('API_URL')}/api/v1/get_user_projects`
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
            console.log(json)
            this.setState({projectArray: json, projectArrayUpdated: true})
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

     removeFavorite = (projectId) => {
       const userId = localStorage.userid
       const url = `${config.get('API_URL')}/api/v1/remove_project`
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
        return(
          <div>
            <section class = "profile-section">
             <Navbar activeItem='profile' logout={this.props.logout}/>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <div className='profile-header'>
                      <h2 className="ui header highlight">
                        <i className="user icon"></i>
                      </h2>
                      <h2 className="ui header highlight">
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

                    <FavoriteThemes getThemes={this.props.getThemes} updateAppThemes={this.props.updateAppThemes} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <h1 className="ui center aligned header highlight">
                      Starred Projects:
                    </h1>
                    {(this.state.projectArrayUpdated)
                      ? <StarredProjectsList handleDonate={this.props.handleDonate} removeFavorite={this.removeFavorite} projectArray={this.state.projectArray}/>
                      : <div></div> }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
          </section>
          <div id="footer-div">
            <Footer />
          </div>
        </div>
        )
    }
}

export default withRouter(Profile)
