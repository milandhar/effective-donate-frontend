import React, { Component } from 'react';
import { Grid, Image, Dropdown, Header, Icon } from 'semantic-ui-react'
import logo from '../logo.svg';
import '../App.css';
import ChoroplethMap from './choroplethMap.js'
import CountryCard from './CountryCard.js'
import ThemesDropdownMultiple from './ThemesDropdownMultiple'
import Navbar from './Navbar.js'
import { withRouter } from 'react-router-dom'


class ProjectBrowser extends Component {

  constructor(props){
    super(props)
    this.state = {
      countryList: [],
      selectedCountry: this.props.appSelectedCountry,
      projectThemes: this.props.userThemes,
      countryProjects: [],
      themesUpdated: false,
      countryUpdated: this.props.updatedSelectedCountry
    }
  }

  componentDidMount(){
    this.fetchCountries()
    this.fetchThemeProjects()
  }

  setSelectedCountry = () => {
    console.log('in set selected country')
    if(this.props.location && this.props.location.state && this.props.location.state.countryCode){
      if(this.state.selectedCountry === ""){
        this.setState({selectedCountry: this.props.location.state.countryCode}, this.fetchThemeProjects)
      }
    }
  }

  fetchCountries = () => {
    console.log('in fetchCountries')
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
      const sortJsonArray = require('sort-json-array');
      if(this.props.location && this.props.location.state && this.props.location.state.countryCode){
        if(this.state.selectedCountry === ""){
      this.setState({
        countryList: sortJsonArray(countryArray, 'text')},
        this.setSelectedCountry)
        }
      } else {
        this.setState({countryList: sortJsonArray(countryArray, 'text')})
      }
    })
  }

  fetchProjects = () => {
    console.log('in fetch projects')
    const countryCode = this.state.selectedCountry
    const url = `http://localhost:3000/api/v1/get_projects?countryCode=${countryCode}`
    fetch(url)
    .then(res=>res.json())
    .then(json=> {
      this.setState({countryProjects: json})
    })
  }

  fetchThemeProjects = () => {
    console.log('in fetch theme projects')
    const countryCode = this.state.selectedCountry
    console.log(countryCode)
    // const [theme1, theme2, theme3, theme4, theme5, theme6, theme7, theme8, theme9, theme10, theme11, theme12, theme13, theme14, theme15, theme16, theme17, theme18] = this.state.projectThemes
    const url = `http://localhost:3000/api/v1/get_theme_projects`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({themes: this.state.projectThemes, countryCode: countryCode})
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        countryProjects: json
      }, this.setState({themesUpdated: true}))
    })

  }

  handleChange = (ev, data) => {
    this.setState({selectedCountry: data.value}, this.fetchThemeProjects)
  }

  addFavorite = (ev, data) => {

  }

  logout = () => {
    localStorage.setItem('jwt', '')
    localStorage.setItem('username', '')
    localStorage.setItem('email_address', '')
    localStorage.setItem('first_name', '')
    localStorage.setItem('last_name', '')
    this.props.history.push("/")
    return false
  }

  updateProjectThemes = (themes) => {
    console.log('in update project themes')
    this.props.updateAppThemes(themes)
    this.setState({projectThemes: themes}, this.fetchThemeProjects)
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
              <Dropdown
                fluid
                search
                selection
                placeholder="Country"
                options={this.state.countryList}
                onChange={this.handleChange}
                value={this.state.selectedCountry}
              />
          </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center'>
                <Header.Content>Themes</Header.Content>
              </Header>
              <ThemesDropdownMultiple updateMapThemes={this.updateProjectThemes} themes={this.props.themes} mapThemes={this.state.projectThemes} />
            </Grid.Column>
          </Grid.Row>
          {(this.state.themesUpdated)
            ? <Grid.Row columns = {4}>
                {this.state.countryProjects.map((project) => {
                  return <div className="column"> <CountryCard id={project.id} orgUrl={project.organization.url} organization={project.organization.name} handleStar={this.addFavorite()} funding={project.funding} longTermImpact={project.long_term_impact} summary={project.summary} goal={project.goal} key={project.id} image={project.image_url} theme={project.theme.name} title={project.title} country={project.country.name}/></div>
              })}
            </Grid.Row>
            : <div>loading</div>
          }
        </Grid>
      </div>
    )
  }
}

export default withRouter(ProjectBrowser)
