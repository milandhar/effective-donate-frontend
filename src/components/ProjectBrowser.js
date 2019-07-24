import React, { Component } from 'react';
import { Grid, Image, Dropdown, Header, Icon } from 'semantic-ui-react'
import logo from '../logo.svg';
import '../App.css';
import ChoroplethMap from './choroplethMap.js'
import CountryCard from './CountryCard.js'
import ThemesDropdownMultiple from './ThemesDropdownMultiple'
import Navbar from './Navbar.js'

export default class ProjectBrowser extends Component {

  constructor(){
    super()
    this.state = {
      countryList: [],
      selectedCountry: "",
      selectedThemes: [],
      countryProjects: []
    }
  }

  componentDidMount(){
    this.fetchCountries()
  }

  setSelectedCountry = () => {
    console.log('in set selected')
    if(this.props.location.state.countryCode){
      console.log(this.props.location.state.countryCode)
      this.setState({selectedCountry: this.props.location.state.countryCode})
    }
  }

  fetchCountries = () => {
    console.log('in fetch countries')
    const url = `http://localhost:3000/api/v1/countries`
    const getCountryISO2 = require("country-iso-3-to-2");
    let countryArray = []
    fetch(url)
    .then(res=>res.json())
    .then(json=>{
      json.forEach((country, idx) => {
          let iso2 = getCountryISO2(country.iso3166CountryCode)
          if(iso2 && country.name){
          countryArray.push({
            key: iso2.toLowerCase(),
            value: country.iso3166CountryCode,
            flag: iso2.toLowerCase(),
            text: country.name
          })
        }
      })
    })
    // let countries = json.country.name.sort(this.compare)
    const sortJsonArray = require('sort-json-array');
    console.log(sortJsonArray(countryArray, 'text'))
    this.setState({countryList: sortJsonArray(countryArray, 'text')})
    this.setSelectedCountry()
  }

  fetchProjects = (countryCode) => {
    console.log('in fetch projects')
    const url = `http://localhost:3000/api/v1/get_projects?countryCode=${countryCode}`
    fetch(url)
    .then(res=>res.json())
    .then(json=> {
      this.setState({countryProjects: json})
    })
    .then(()=>this.setSelectedCountry())
  }

  handleChange = (ev, data) => {
    this.setState({selectedCountry: data.value})
    this.fetchProjects(data.value)
  }

  render() {
    return(
      <div className="app-div">
        <Navbar logout={this.logout}/>
        <div>
          <Header as='h2' icon textAlign='center'>
            <Icon name='tasks' circular />
          </Header>
        </div>
        <Grid>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as='h3' textAlign='center'>
                <Header.Content>Country</Header.Content>
              </Header>
              {console.log('in render')}
              {console.log(this.state.selectedCountry)}
              <Dropdown
                fluid
                search
                selection
                options={this.state.countryList}
                onChange={this.handleChange}
                placeholder={this.state.selectedCountry}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center'>
                <Header.Content>Themes</Header.Content>
              </Header>
              <ThemesDropdownMultiple />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
              {this.state.countryProjects.map((project) => {
                return <CountryCard key={project.id} image={project.image_url} theme={project.theme.name} title={project.title} country={project.country}/>
              })}
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}
