import React, {Component} from 'react';
import ThemesDropdownMultiple from './ThemesDropdownMultiple'
import Navbar from './Navbar.js'
import { Grid, Button } from 'semantic-ui-react'
import '../App.css'

class MobileLanding extends Component {
  constructor(props){
    super(props)
    this.state = {
      mobileThemes: []
    }
  }

  updateMobileThemes = (themes) => {
    this.props.updateAppThemes(themes)
    this.setState({mobileThemes: themes})
  }

  render(){
    return (
      <div className="app-div">
        <Navbar activeItem='map' logout={this.props.logout}/>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <ThemesDropdownMultiple updateMapThemes={this.updateMobileThemes} themes={this.props.themes} mapThemes={this.state.mobileThemes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
