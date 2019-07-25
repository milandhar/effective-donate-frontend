import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class ThemesDropdownMultiple extends Component {
  constructor(){
    super()
    this.state = {
      options: [],
      themes: [],
      filteredThemes: []
    }
  }

  componentDidMount(){
    this.getThemes()
    const url = "http://localhost:3000/api/v1/themes"
    let newOptions = []
    fetch(url)
    .then(res=>res.json())
    .then(json=> {
      json.forEach(theme => {
        newOptions.push({key: theme["name"], text: theme["name"], value: theme["name"]})
      })
      // , () => this.changeState(newOptions)
    })
    .then(() => this.changeState(newOptions))
  }

  fetchUserThemes = () => {
    console.log('in fetch user themes')
    let themeArray = []
    let token = localStorage.getItem("jwt")
      fetch('http://localhost:3000/api/v1/profile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res=>res.json())
      .then(json=> {
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
          filteredThemes: themeArray
        })
      })
      // .then(() => this.renderThemeField())
      // return themeArray
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
      this.setState({themes: json}, this.fetchUserThemes)
    })
  }

  changeState = (newOptions) => {
    this.setState({options: newOptions})
  }

  handleChange = (ev, data) => {
    this.setState({filteredThemes: data.value})
  }

  render() {return <Dropdown value={this.state.filteredThemes} onChange={this.handleChange} placeholder='Themes' fluid multiple selection options={this.state.options} />}
}
