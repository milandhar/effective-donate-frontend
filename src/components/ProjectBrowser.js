import React, { Component } from 'react';
import { Grid, Image, Dropdown, Header, Icon } from 'semantic-ui-react'
import logo from '../logo.svg';
import '../App.css';
import ChoroplethMap from './choroplethMap.js'
import ThemesDropdownMultiple from './ThemesDropdownMultiple'
import Navbar from './Navbar.js'

export default class ProjectBrowser extends Component {

  constructor(){
    super()
    this.state = {
      countryList: [],
      selectedCountry: "",
      selectedThemes: []
    }
  }

  componentDidMount(){
    this.fetchCountries()
  }

  fetchCountries = () => {
    const url = `http://localhost:3000/api/v1/countries`
    const getCountryISO2 = require("country-iso-3-to-2");
    let countryArray = []
    fetch(url)
    .then(res=>res.json())
    .then(json=>{
      console.log(json)
      json.forEach((country, idx) => {
          let iso2 = getCountryISO2(country.iso3166CountryCode)
          if(iso2 && country.name){
          countryArray.push({
            key: iso2.toLowerCase(),
            value: iso2.toLowerCase(),
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
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
            <Header as='h3' textAlign='center'>
              <Header.Content>Country</Header.Content>
            </Header>
              <Dropdown
                placeholder='Select Country'
                fluid
                search
                selection
                options={this.state.countryList}
              />
            </Grid.Column>
            <Grid.Column>
            <Header as='h3' textAlign='center'>
              <Header.Content>Themes</Header.Content>
            </Header>
              <ThemesDropdownMultiple />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}
