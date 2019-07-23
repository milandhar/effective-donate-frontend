import React, { Component } from 'react'

export default class FavoriteThemes extends Component {

  constructor(){
    super()
    this.state = {
      userThemes: [],
      themes: []
    }
  }

  componentDidMount(){
    console.log('in mount')
    this.getThemes()
    this.fetchUserThemes()
  }

  getThemes = () => {
    const url = 'http://localhost:3000/api/v1/themes'
    fetch(url)
    .then(res=>res.json())
    .then(json => {this.setState({themes: json})})
  }

  fetchUserThemes = () => {
    let token = localStorage.getItem("jwt")
      fetch('http://localhost:3000/api/v1/profile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res=>res.json())
      .then(json=> {
        let themeArray = []
        console.log(json)
        themeArray.push(json.user.theme1)
        themeArray.push(json.user.theme2)
        themeArray.push(json.user.theme3)
        this.setState({
          userThemes: themeArray
        })
      })
  }

  returnDropdown = (themeNum) => {
    let userTheme = this.state.userThemes[0]
    let themes = this.state.themes
    console.log(themes)


        return this.state.themes.map((theme) => {
          return <option value={theme.id}>{theme.name}</option>
          console.log(theme)
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

  render(){
    return(
      <div class="dropdown-container">
        <div class="select-container">
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
        </div>
      </div>
    )
  }
}
