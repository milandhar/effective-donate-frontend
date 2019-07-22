import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class ThemesDropdownMultiple extends Component {
  constructor(){
    super()
    this.state = {
      options: []
    }
  }

  componentDidMount(){
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

  changeState = (newOptions) => {
    this.setState({options: newOptions})
  }

// const options = [
//   { key: 'angular', text: 'Angular', value: 'angular' },
//   { key: 'css', text: 'CSS', value: 'css' },
//   { key: 'design', text: 'Graphic Design', value: 'design' },
//   { key: 'ember', text: 'Ember', value: 'ember' },
//   { key: 'html', text: 'HTML', value: 'html' },
//   { key: 'ia', text: 'Information Architecture', value: 'ia' },
//   { key: 'javascript', text: 'Javascript', value: 'javascript' },
//   { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
//   { key: 'meteor', text: 'Meteor', value: 'meteor' },
//   { key: 'node', text: 'NodeJS', value: 'node' },
//   { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
//   { key: 'python', text: 'Python', value: 'python' },
//   { key: 'rails', text: 'Rails', value: 'rails' },
//   { key: 'react', text: 'React', value: 'react' },
//   { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
//   { key: 'ruby', text: 'Ruby', value: 'ruby' },
//   { key: 'ui', text: 'UI Design', value: 'ui' },
//   { key: 'ux', text: 'User Experience', value: 'ux' },
// ]

  render() {return <Dropdown placeholder='Themes' fluid multiple selection options={this.state.options} />}
}
