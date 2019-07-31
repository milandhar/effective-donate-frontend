import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapBrowser from './components/mapBrowser.js';
import LoginForm from './components/loginForm';
import Profile from './components/Profile';
import CreateUserForm from './components/createUserForm';
import ProjectBrowser from './components/ProjectBrowser';
import DonatePage from './components/DonatePage';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  constructor(){
    super()
    this.state = {
        userThemes: [],
        themes: [],
        updatedThemes: false,
        selectedCountry: "",
        updatedSelectedCountry: false,
        selectedProject: {},
        user: {}
      }
    }

  componentDidMount(){
    this.getThemes()
  }


  getThemeFromId = (themeId) => {
    let theme = this.state.themes.find(theme=>theme.id===themeId)
    return theme
  }

  getThemes = () => {
    const url = 'http://localhost:3000/api/v1/themes'
    fetch(url)
    .then(res=>res.json())
    .then(json => {
      this.setState({themes: json}, this.fetchUserThemes())
    })
  }

  fetchUserThemes = () => {
    let themeArray = []
    let token = localStorage.getItem("jwt")
      fetch('http://localhost:3000/api/v1/profile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res=>res.json())
      .then(json=> {
        if(!json["error"]){
          if(json.user.theme1){
            themeArray.push(this.getThemeFromId(json.user.theme1).name)
          }
          if(json.user.theme2){
            themeArray.push(this.getThemeFromId(json.user.theme2).name)
          }
          if(json.user.theme3) {
            themeArray.push(this.getThemeFromId(json.user.theme3).name)
          }
          this.setState({
            userThemes: themeArray,
            updatedThemes: true
          })
        }
      })
      // .then(() => this.renderThemeField())
      // return themeArray
  }

  updateAppThemes = (themes) => {
    this.setState({userThemes: themes})
  }

  updateSelectedCountry = (country) => {
    if(country){
      this.setState({
        updatedSelectedCountry: true,
        selectedCountry: country
      }, console.log(this.state.selectedCountry))
    }
  }

  handleDonate = (project) => {
    this.setState({selectedProject: project})
    localStorage.removeItem('selectedProject')
    localStorage.setItem('selectedProject', JSON.stringify(project))
  }

  setUser = (user) => {
    this.setState({user: user, selectedCountry: user.defaultCountry})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route
            exact path="/"
            render={(props) => (
            <LoginForm {...props}
              onLogin={this.updateUser}
              setUser={this.setUser}
              updateSelectedCountry={this.updateSelectedCountry}/>
              )}
            />
          {(this.state.updatedThemes)
            ? <Route
              path={'/map'}
              render={()=><MapBrowser updateSelectedCountry={this.updateSelectedCountry} updateAppThemes={this.updateAppThemes} themes={this.state.themes} userThemes={this.state.userThemes} fetchUserThemes={this.fetchUserThemes}/>}
            />
          : <div>""</div>}
            <Route
              path={'/create_user'} component={CreateUserForm} />
            <Route
              path={'/profile'}
              render={()=><Profile updateAppThemes={this.updateAppThemes} handleDonate={this.handleDonate}/>}
            />
            {(this.state.updatedThemes)
          ? <Route
              path={'/projects'}
              render={()=><ProjectBrowser handleDonate={this.handleDonate} updatedSelectedCountry={this.state.updatedSelectedCountry} updateSelectedCountry={this.updateSelectedCountry} appSelectedCountry={this.state.selectedCountry} updateAppThemes={this.updateAppThemes} themes={this.state.themes} userThemes={this.state.userThemes} fetchUserThemes={this.fetchUserThemes}/>}
              />
          : <div>""</div>}

          {(this.state.selectedProject)
          ? <Route
            path={'/donate'}
            render={()=><DonatePage project={this.state.selectedProject}/>}
            />
          : <div>""</div>}
          </Router>
      </div>

    );
  }
}


export default App;
