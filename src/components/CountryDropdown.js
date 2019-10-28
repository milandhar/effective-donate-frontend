import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class CountryDropdown extends Component {
  constructor(props){
    super(props)
    this.state = {
      countryList: [],
      selectedCountry: null,
    }
  }

  handleChange = (ev, data) => {
    if(this.props.onProjectBrowser){
      this.setState({selectedCountry: data.value}, this.props.fetchThemeProjects)
    } else {
      this.setState({selectedCountry: data.value})
    }
  }

  render(){
    return(<Dropdown
      className="country-drop"
      value={this.state.selectedCountry}
      onChange={this.handleChange}
      placeholder='Countries'
      options={this.state.options}
      />)
  }

}
