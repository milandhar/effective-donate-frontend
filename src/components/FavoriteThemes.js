import React, { Component } from 'react'

export default class FavoriteThemes extends Component {


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
