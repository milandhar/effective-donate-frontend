import React, { Component } from 'react'

export default class FavoriteThemes extends Component {

  constructor(){
    super()
    this.state = {
      userThemes: []
    }
  }

  componentDidMount(){
    console.log('in mount')
    this.fetchUserThemes()
  }

  fetchUserThemes = () =>{
    console.log('in fetch')
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

  render(){
    return(
      <div class="dropdown-container">
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
      </div>
    )
  }
}
