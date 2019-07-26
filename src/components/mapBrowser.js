import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import logo from '../logo.svg';
import '../App.css';
import ChoroplethMap from './choroplethMap.js'
import ThemesDropdownMultiple from './ThemesDropdownMultiple'
import Navbar from './Navbar.js'

class MapBrowser extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: [["ABW", 0],	["AFG", 0],	["AGO", 0],	["AIA", 0],	["ALA", 0],	["ALB", 0],	["AND", 0],	["ANT", 0],	["ARE", 0],	["ARG", 0],	["ARM", 0],	["ASM", 0],	["ATA", 0],	["ATF", 0],	["ATG", 0],	["AUS", 0],	["AUT", 0],	["AZE", 0],	["BDI", 0],	["BEL", 0],	["BEN", 0],	["BFA", 0],	["BGD", 0],	["BGR", 0],	["BHR", 0],	["BHS", 0],	["BIH", 0],	["BLM", 0],	["BLR", 0],	["BLZ", 0],	["BMU", 0],	["BOL", 0],	["BRA", 0],	["BRB", 0],	["BRN", 0],	["BTN", 0],	["BVT", 0],	["BWA", 0],	["CAF", 0],	["CAN", 0],	["CCK", 0],	["CHE", 0],	["CHL", 0],	["CHN", 0],	["CIV", 0],	["CMR", 0],	["COD", 0],	["COG", 0],	["COK", 0],	["COL", 0],	["COM", 0],	["CPV", 0],	["CRI", 0],	["CUB", 0],	["CXR", 0],	["CYM", 0],	["CYP", 0],	["CZE", 0],	["DEU", 0],	["DJI", 0],	["DMA", 0],	["DNK", 0],	["DOM", 0],	["DZA", 0],	["ECU", 0],	["EGY", 0],	["ERI", 0],	["ESH", 0],	["ESP", 0],	["EST", 0],	["ETH", 0],	["FIN", 0],	["FJI", 0],	["FLK", 0],	["FRA", 0],	["FRO", 0],	["FSM", 0],	["GAB", 0],	["GBR", 0],	["GEO", 0],	["GGY", 0],	["GHA", 0],	["GIB", 0],	["GIN", 0],	["GLP", 0],	["GMB", 0],	["GNB", 0],	["GNQ", 0],	["GRC", 0],	["GRD", 0],	["GRL", 0],	["GTM", 0],	["GUF", 0],	["GUM", 0],	["GUY", 0],	["HKG", 0],	["HMD", 0],	["HND", 0],	["HRV", 0],	["HTI", 0],	["HUN", 0],	["IDN", 0],	["IMN", 0],	["IND", 0],	["IOT", 0],	["IRL", 0],	["IRN", 0],	["IRQ", 0],	["ISL", 0],	["ISR", 0],	["ITA", 0],	["JAM", 0],	["JEY", 0],	["JOR", 0],	["JPN", 0],	["KAZ", 0],	["KEN", 0],	["KGZ", 0],	["KHM", 0],	["KIR", 0],	["KNA", 0],	["KOR", 0],	["KWT", 0],	["LAO", 0],	["LBN", 0],	["LBR", 0],	["LBY", 0],	["LCA", 0],	["LIE", 0],	["LKA", 0],	["LSO", 0],	["LTU", 0],	["LUX", 0],	["LVA", 0],	["MAC", 0],	["MAF", 0],	["MAR", 0],	["MCO", 0],	["MDA", 0],	["MDG", 0],	["MDV", 0],	["MEX", 0],	["MHL", 0],	["MKD", 0],	["MLI", 0],	["MLT", 0],	["MMR", 0],	["MNE", 0],	["MNG", 0],	["MNP", 0],	["MOZ", 0],	["MRT", 0],	["MSR", 0],	["MTQ", 0],	["MUS", 0],	["MWI", 0],	["MYS", 0],	["MYT", 0],	["NAM", 0],	["NCL", 0],	["NER", 0],	["NFK", 0],	["NGA", 0],	["NIC", 0],	["NIU", 0],	["NLD", 0],	["NOR", 0],	["NPL", 0],	["NRU", 0],	["NZL", 0],	["OMN", 0],	["PAK", 0],	["PAN", 0],	["PCN", 0],	["PER", 0],	["PHL", 0],	["PLW", 0],	["PNG", 0],	["POL", 0],	["PRI", 0],	["PRK", 0],	["PRT", 0],	["PRY", 0],	["PSE", 0],	["PYF", 0],	["QAT", 0],	["REU", 0],	["ROU", 0],	["RUS", 0],	["RWA", 0],	["SAU", 0],	["SDN", 0],	["SEN", 0],	["SGP", 0],	["SGS", 0],	["SHN", 0],	["SJM", 0],	["SLB", 0],	["SLE", 0],	["SLV", 0],	["SMR", 0],	["SOM", 0],	["SPM", 0],	["SRB", 0],	["STP", 0],	["SUR", 0],	["SVK", 0],	["SVN", 0],	["SWE", 0],	["SWZ", 0],	["SYC", 0],	["SYR", 0],	["TCA", 0],	["TCD", 0],	["TGO", 0],	["THA", 0],	["TJK", 0],	["TKL", 0],	["TKM", 0],	["TLS", 0],	["TON", 0],	["TTO", 0],	["TUN", 0],	["TUR", 0],	["TUV", 0],	["TWN", 0],	["TZA", 0],	["UGA", 0],	["UKR", 0],	["UMI", 0],	["URY", 0],	["USA", 0],	["UZB", 0],	["VAT", 0],	["VCT", 0],	["VEN", 0],	["VGB", 0],	["VIR", 0],	["VNM", 0],	["VUT", 0],	["WLF", 0],	["WSM", 0],	["YEM", 0],	["ZAF", 0],	["ZMB", 0],	["ZWE", 0], ["SSD", 0]],
      mapThemes: [],
      updatedData: false,
      updatedMapThemes: false
      }
    }

  //loop through the prevState 2D array and determine which index the ["XYZ", 0] subarray is located

  componentDidMount(){
    // this.props.fetchUserThemes()
    // this.getProjectCount()
    // console.log('in did mount')
    // console.log(this.state.updatedMapThemes)
    // if(this.state.updatedMapThemes){
    //   this.getThemeProjectCount()
    // }
    this.setState({
      mapThemes: this.props.userThemes,
      updatedMapThemes: true
    }, this.getThemeProjectCount)
  }

  getThemeProjectCount = () => {
    console.log('in get theme project count')
    console.log(this.state.mapThemes)
    const url = "http://localhost:3000/api/v1/get_project_theme_count"
    let prevData = this.state.data
    let [theme1, theme2, theme3, theme4, theme5, theme6, theme7, theme8, theme9, theme10, theme11, theme12, theme13, theme14, theme15, theme16, theme17, theme18] = this.state.mapThemes
    const getCountryISO3 = require("country-iso-2-to-3");
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({themes: this.state.mapThemes})
    })
    .then(res => res.json())
    .then(json => {
        json.forEach((country)=> {
          let i = (this.getArrayIndex(prevData, [country[0], 0]))
          //replace the ["XYZ", 0] array with the actual project Count
          // prevData.splice(i, 1, [country[0], Math.log(country[1])])
          if (country[1]) {
            prevData.splice(i, 1, [country[0], Math.log(country[1])])
          }
        })
      this.setState({
        updatedData: true,
        data: prevData
      })
      // , this.setState({data: prevData}))
    })
  }

  getProjectCount = () => {
    const url = "http://localhost:3000/api/v1/get_project_count"
    let prevData = this.state.data
    const getCountryISO3 = require("country-iso-2-to-3");
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
        json.forEach((country)=> {
          let i = (this.getArrayIndex(prevData, [country[0], 0]))
          //replace the ["XYZ", 0] array with the actual project Count
          // prevData.splice(i, 1, [country[0], Math.log(country[1])])
          if (country[1]) {
            prevData.splice(i, 1, [country[0], Math.log(country[1])])
          }
        })
      this.setState({
        updatedData: true,
        data: prevData
      })
      // , this.setState({data: prevData}))
    })
  }


  getArrayIndex(array, item) {
      for (var i = 0; i < array.length; i++) {
          if (array[i][0] == item[0]) {
              return i;  //return the index
          }
      }
      return false;   // Not found
  }

  // getThemes = () => {
  //   const url = 'http://localhost:3000/api/v1/themes'
  //   fetch(url)
  //   .then(res=>res.json())
  //   .then(json => {
  //     this.setState({themes: json}, this.fetchUserThemes)
  //   })
  // }

  // getThemeFromId = (themeId) => {
  //   let theme = this.state.themes.find(theme=>theme.id===themeId)
  //   return theme
  // }

  // fetchUserThemes = () => {
  //   let themeArray = []
  //   let token = localStorage.getItem("jwt")
  //     fetch('http://localhost:3000/api/v1/profile', {
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       }
  //     })
  //     .then(res=>res.json())
  //     .then(json=> {
  //       themeArray.push(this.getThemeFromId(json.user.theme1))
  //       themeArray.push(this.getThemeFromId(json.user.theme2))
  //       themeArray.push(this.getThemeFromId(json.user.theme3))
  //       this.setState({
  //         filteredThemes: themeArray
  //       })
  //     })
  //     // .then(() => this.renderThemeField())
  //     // return themeArray
  // }

  logout = () => {
    localStorage.setItem('jwt', '')
    localStorage.setItem('username', '')
    localStorage.setItem('email_address', '')
    localStorage.setItem('first_name', '')
    localStorage.setItem('last_name', '')
    this.props.history.push("/")
    return false
  }


  refreshMap = () => {
    const url = "http://localhost:3000/api/v1/fetch_projects"
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({nextProject: null})
    })
      .then(res => res.json())
      .then(json => this.refreshMapLoop(json, url))
  }

  findLastProject = () => {
    const url = "http://localhost:3000/api/v1/find_last_project"
    let maxId
    return fetch(url)
    .then(res => res.json())
    .then(x => this.getNextProjects(x))
  }

  getNextProjects = (maxId) => {
    const url = "http://localhost:3000/api/v1/fetch_projects"
    //find last project id in projects table here
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({nextProject: maxId})
    })
      .then(res => res.json())
      .then(json => this.refreshMapLoop(json, url))
  }

  refreshMapLoop = (json, url) => {
    let hasNextFlag = false
    if (json["has_next"]){
      hasNextFlag = true
      }

    //change this to while to keep looping!
    while (hasNextFlag) {
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify({nextProject: json["nextProjectId"]}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json["has_next"]){
          hasNextFlag = true
          this.refreshMapLoop(json, url)
        }
        // else{
        //   hasNextFlag = false
        // }
      })
    }
  }

  goToProjects = (geography) => {
    this.props.history.push({
      pathname: '/projects',
      state: {countryCode: geography.id}
    })
  }

  updateMapThemes = (themes) => {
    this.props.updateAppThemes(themes)
    this.setState({mapThemes: themes}, this.getThemeProjectCount)
  }

  render() {
    return (
      <div className="app-div">
        {console.log('in map render')}
        <Navbar logout={this.logout}/>
        <div>
          <button onClick={this.findLastProject} id="refreshBtn">Get New Projects</button>
          <button onClick={this.refreshMap} id="refreshBtn">Refresh Projects</button>
        </div>
        <Grid divided='vertically'>
          <Grid.Row columns={1}>
            <Grid.Column>
              {(this.state.updatedData)
                ? <ChoroplethMap history={this.props.history} handleClick={this.goToProjects} data={this.state.data}/>
              : <div>Loading Thing</div>}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="map-dropdown-div"columns={1}>
            <Grid.Column>
              <div>
                <div class="attribution-div">
                  <a href="https://www.globalgiving.org/" target="_blank">
                    <img id="gg-logo" src={require('../img/GG2015_Logo_horizontal_4color.png')} />
                  </a>
                  <p class="gg-attribution">Project Data</p>
                </div>
              </div>
              <h1>Select Theme(s)</h1>
              {(this.state.updatedMapThemes)
              ? <ThemesDropdownMultiple updateMapThemes={this.updateMapThemes} themes={this.props.themes} mapThemes={this.state.mapThemes} className="map-dropdown"/>
            : <div>loading</div>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}


export default MapBrowser;
