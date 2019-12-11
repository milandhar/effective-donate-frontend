import React, { Component } from 'react'
import { Grid, Menu, Segment, Button, Responsive, Sidebar } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'


class Navbar extends Component {

    constructor(props) {
      super(props);
        this.state = {
        user_id: null,
        username: '',
        activeItem: this.props.activeItem
      };
    }

    logout = () => {
      if(this.props.logout()) {
        this.props.history.push("/")
      }
    }

    redirect = (ev, data) => {
      if(data.name === 'logout'){
        this.logout()
      } else if (data.name === localStorage.getItem("first_name")){
        this.props.history.push(`/profile`)
      }
        else if (data.name === 'select'){
        this.props.history.push(`/mobile_landing`)
      }else{
        this.props.history.push(`/${data.name}`)
      }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        return(
          <Grid className="menu-grid">
            <Grid.Row className="navbar" columns={1} only='computer tablet'>
              <Grid.Column>
                <Segment inverted>
                  <Menu stackable inverted pointing secondary>
                    <Menu.Item header>EffectiveDonate</Menu.Item>
                    <Menu.Menu position='right'>
                      <Menu.Item
                        name='map'
                        active={this.state.activeItem === 'map'}
                        onClick={this.redirect} />
                      <Menu.Item
                        name='projects'
                        active={this.state.activeItem === 'projects'}
                        onClick={this.redirect}
                      />
                      <Menu.Item
                        name={localStorage.getItem("first_name")}
                        active={this.state.activeItem === 'profile'}
                        onClick={this.redirect}
                      />
                      <Menu.Item>
                        <Button primary name='logout' onClick={this.redirect}>
                          Log Out
                        </Button>
                      </Menu.Item>
                    </Menu.Menu>
                  </Menu>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1} only='mobile'>
              <Grid.Column>
                  <Menu size='massive' vertical inverted>
                    <Menu.Item header>EffectiveDonate</Menu.Item>
                    <Menu.Menu position='right'>
                      <Menu.Item
                        name='select'
                        active={this.state.activeItem === 'mobileLanding'}
                        onClick={this.redirect} />
                      <Menu.Item
                        name='projects'
                        active={this.state.activeItem === 'projects'}
                        onClick={this.redirect}
                      />
                      <Menu.Item
                        name={localStorage.getItem("first_name")}
                        active={this.state.activeItem === 'profile'}
                        onClick={this.redirect}
                      />
                      <Menu.Item>
                        <Button primary name='logout' onClick={this.redirect}>
                          Log Out
                        </Button>
                      </Menu.Item>
                    </Menu.Menu>
                  </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          )
        }
      }
export default withRouter(Navbar);
