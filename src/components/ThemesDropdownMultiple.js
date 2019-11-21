import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import config from 'react-global-configuration';

export default class ThemesDropdownMultiple extends Component {
  constructor(props){
    super(props)
    this.state = {
      options: [],
      themes: this.props.themes,
      filteredThemes: this.props.mapThemes,
      themeNamesArray: []
    }
  }

  componentDidMount(){
    const url = `${config.get('API_URL')}/api/v1/themes`
    let newOptions = []
    let themeNamesArray = []
    fetch(url)
    .then(res=>res.json())
    .then(json=> {
      json.forEach(theme => {
        newOptions.push({key: theme["name"], text: theme["name"], value: theme["name"]})
        themeNamesArray.push(theme["name"])
      })
      newOptions.unshift({key: "All", text: "All", value: "All"})
    })
    .then(() => this.changeState(newOptions), this.setState({themeNamesArray: themeNamesArray}))
  }

  changeState = (newOptions) => {
    this.setState({options: newOptions})
  }

  handleChange = (ev, data) => {
    if(data.value.includes("All")){
      this.setState({filteredThemes: this.state.themeNamesArray})
      this.props.updateMapThemes(this.state.themeNamesArray)
    } else {
      this.setState({filteredThemes: data.value})
      this.props.updateMapThemes(data.value)
    }
  }

  render(){
    return(<Dropdown
      className="themes-drop"
      value={this.state.filteredThemes}
      onChange={this.handleChange}
      placeholder='Themes'
      fluid multiple selection
      options={this.state.options}
    />)
  }
}
