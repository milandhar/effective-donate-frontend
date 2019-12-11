import React, { Component } from 'react'
import { Menu, Responsive, Segment } from 'semantic-ui-react'

export default class Footer extends Component {

  render(){
    return(
      <Segment.Group>
        <Responsive as={Segment} minWidth={767}>
          <Menu borderless stackable>
            <Menu.Item name='gg-link'>
              <p id="gg-link-p">All project data from <a id="gg-anchor"href="https://www.globalgiving.org/" target="_blank"><img id="gg-footer" src={require('../img/GG2015_Logo_horizontal_4color.png')} /></a></p>
            </Menu.Item>
            <Menu.Item name='developer'>
              <p>Developed & Designed by <a href="http://milandhar.com/" target="_blank">Milan Dhar</a></p>
            </Menu.Item>
          </Menu>
        </Responsive>
      </Segment.Group>
    )
  }
}
