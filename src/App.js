import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapBrowser from './components/mapBrowser.js';
import LoginForm from './components/loginForm';
import Profile from './components/Profile';
import CreateUserForm from './components/createUserForm';
import ProjectBrowser from './components/ProjectBrowser';
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
        updatedSelectedCountry: false
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
    this.setState({
      updatedSelectedCountry: true,
      selectedCountry: country
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/"
          render={(props) => (
            <LoginForm {...props}
              onLogin={this.updateUser}
              user={this.state.user}/>
              )}
            />
          {(this.state.updatedThemes)
            ? <Route
              path={'/map'}
              render={()=><MapBrowser updateSelectedCountry={this.updateSelectedCountry} updateAppThemes={this.updateAppThemes} themes={this.state.themes} userThemes={this.state.userThemes} fetchUserThemes={this.fetchUserThemes}/>}
            />
          : <div>Loading Thing</div>}
            <Route path={'/create_user'} component={CreateUserForm} />
            <Route path={'/profile'} component={Profile} />
            {(this.state.updatedThemes)
          ? <Route
              path={'/projects'}
              render={()=><ProjectBrowser updatedSelectedCountry={this.state.updatedSelectedCountry} updateSelectedCountry={this.updateSelectedCountry} appSelectedCountry={this.state.selectedCountry} updateAppThemes={this.updateAppThemes} themes={this.state.themes} userThemes={this.state.userThemes} fetchUserThemes={this.fetchUserThemes}/>}
              />
          : <div>Loading Thing</div>}
          </Router>
      </div>


      // <div className="app-div" style={{
      //   height:"50vh",
      //   width: "50vw"
      // }}>
      //   <button onClick={this.findLastProject} id="refreshBtn">Get New Projects</button>
      //   <button onClick={this.refreshMap} id="refreshBtn">Refresh Projects</button>
      //   <ChoroplethMap data={this.state.data}/>
      // </div>
    );
  }
}


export default App;
