import React, {Component} from 'react';
import ThemesDropdownMultiple from './ThemesDropdownMultiple'
import Navbar from './Navbar.js'
import { Grid, Button } from 'semantic-ui-react'
import '../App.css'

class MobileBrowser extends Component {
  constructor(props){
    super(props)
    this.state = {
      browserThemes: []
    }
  }

  updateBrowserThemes = (themes) => {
    this.props.updateAppThemes(themes)
    this.setState({browserThemes: themes})
  }

  render(){
    return (
      <div className="app-div">
        <Navbar activeItem='map' logout={this.props.logout}/>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <ThemesDropdownMultiple updateMapThemes={this.updateBrowserThemes} themes={this.props.themes} mapThemes={this.state.browserThemes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
