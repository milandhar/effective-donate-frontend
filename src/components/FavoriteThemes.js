import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class FavoriteThemes extends Component {

  constructor(){
    super()
    this.state = {
      userThemes: [],
      themes: [],
      themeOptions: [],
      default: []
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

  fetchUserThemes = () => {
    console.log('in user themes')
    let token = localStorage.getItem("jwt")
      fetch('http://localhost:3000/api/v1/profile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res=>res.json())
      .then(json=> {
        let themeArray = []
        themeArray.push(json.user.theme1)
        themeArray.push(json.user.theme2)
        themeArray.push(json.user.theme3)
        this.setState({
          userThemes: themeArray
        })
      })
      .then(() => this.renderThemeField())
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
    console.log(this.state)
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
      this.setState({themeOptions: optionsArray}, () => this.findDefaults())
    }

  render(){
    return(
      <div class="dropdown-container">
        {console.log('in render')}
        <Dropdown
          fluid
          selection
          options={this.state.themeOptions}
          defaultValue={this.state.themes[0]}
        />
        <Dropdown
          fluid
          selection
          options={this.state.themeOptions}
          defaultValue={this.state.default[1]}
        />
        <Dropdown
          fluid
          selection
          options={this.state.themeOptions}
          defaultValue={this.state.default[2]}
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
