import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class FavoriteThemes extends Component {

  //make a single list with the id and name => selected options at this time
  //set the value initially with fetch
  //onchange => change that list
  //build function that translates theme id to string
  //build function that translates theme string to id

  constructor(){
    super()
    this.state = {
      userThemes: [],
      themes: [],
      themeOptions: [],
    }
  }

  componentWillMount(){
    console.log('in mount')
    this.getThemes()
  }


  getThemes = () => {
    console.log('in themes')
    const url = 'http://localhost:3000/api/v1/themes'
    fetch(url)
    .then(res=>res.json())
    .then(json => {
      this.setState({themes: json})
    })
    .then(()=> this.fetchUserThemes())
  }

  getThemeFromId = (themeId) => {
    let theme = this.state.themes.find(theme=>theme.id===themeId)
    return theme
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
        themeArray.push(this.getThemeFromId(json.user.theme1))
        themeArray.push(this.getThemeFromId(json.user.theme2))
        themeArray.push(this.getThemeFromId(json.user.theme3))
        this.setState({
          userThemes: themeArray
        })
      })
      .then(() => this.renderThemeField())
      return themeArray
  }

  returnDropdown = (themeNum) => {
    let userTheme = this.state.userThemes[0]
    let themes = this.state.themes
      return this.state.themes.map((theme) => {
        return <option value={theme.id}>{theme.name}</option>
      }
    )
    return this.state.themes.map((theme)=> {
      return(
        <div>
          {theme.name}
        </div>
        )
      })
  }

  findDefaults = () => {
    // let userThemeId = this.state.userThemes[i]
    console.log('in find defaults')
    let themes = this.state.themes
    let defaults = []
    this.state.userThemes.forEach((theme, idx) => {
      defaults.push(themes[theme]["name"])
    })
    this.setState({default: defaults})
  }


  renderThemeField = () => {
    console.log('in render theme field')
    let themes = this.state.themes.sort(this.compare)
    let optionsArray = []
    this.state.themes.forEach((theme)=> {
        optionsArray.push({key: theme.id, text: theme.name, value: theme.name})
      })
      this.setState({themeOptions: optionsArray})
    }

    getThemeFromState = (idx) => {
      let theme = ""
      if(this.state.userThemes[idx]){
        theme = this.state.userThemes[idx]["name"]
      } else{
        theme = "Select a Theme"
      }
      return theme
    }

    getThemeFromName = (name) => {
      let theme = this.state.themes.find(theme=>theme.name===name)
      return theme
    }

    handleChange = (ev, data) => {
      let userThemeNumber = parseInt(data.name)
      let newThemeName = data.value
      let newThemeId = this.getThemeFromName(newThemeName).id
      let prevUserThemes = this.state.userThemes
      let unique = true
      prevUserThemes.forEach(theme => {
        if(theme.name === newThemeName){
          unique = false
        }
      })
      if(unique){
        prevUserThemes.splice(userThemeNumber, 1, {id: newThemeId, name: newThemeName})
        this.setState({prevUserThemes})
        this.postUserThemes(userThemeNumber, newThemeId)
      } else{
        window.alert('duplicate theme')
      }
    }

    postUserThemes = (themeNumber, themeId) => {
      let bodyHash = {}
      bodyHash[`theme${themeNumber+1}`] = themeId
      console.log(bodyHash)
      const URL = `http://localhost:3000/api/v1/users/${localStorage.userid}`
      const headers = {
          method: 'Put',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyHash)
      }
      fetch(URL, headers)
          .then(res=>res.json())
          // .then(json => {
          //   if(!json["error"]){
          //     this.props.history.push("/")
          //   }
          // })
          // .catch(error => console.log(error))
        }

  render(){
    return(
      <div class="dropdown-container">
        <Dropdown
          fluid
          selection
          key="0"
          name="0"
          options={this.state.themeOptions}
          value={this.getThemeFromState(0)}
          onChange={this.handleChange}
        />
        <Dropdown
          fluid
          selection
          key="1"
          name="1"
          options={this.state.themeOptions}
          value={this.getThemeFromState(1)}
          onChange={this.handleChange}
        />
        <Dropdown
          fluid
          selection
          key="2"
          name="2"
          options={this.state.themeOptions}
          value={this.getThemeFromState(2)}
          onChange={this.handleChange}
        />
        {/*<div class="select-container">
          <select class="ui dropdown">
            {this.returnDropdown(0)}
          </select>
        </div>
        <div class="select-container">
          <select class="ui dropdown">
            {this.returnDropdown(1)}
          </select>
        </div>
        <div class="select-container">
          <select class="ui dropdown">
            {this.returnDropdown(2)}
          </select>
        </div>*/}
      </div>
    )
  }
}
