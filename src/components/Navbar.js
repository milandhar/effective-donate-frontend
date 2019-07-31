import React, { Component } from 'react'
import { Menu, Segment, Button } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
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
      this.props.logout()
    }

    redirect = (ev, data) => {
      if(data.name === 'logout'){
        this.logout()
      } else if (data.name === localStorage.getItem("first_name")){
        this.props.history.push(`/profile`)
      } else{
        this.props.history.push(`/${data.name}`)
      }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        return(
          <Segment inverted>
            <Menu inverted pointing secondary>
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

            //   <div>
            //   <div class="ui seven fluid item top attached menu borderless">
            //     <a class="item">
            //     <Link to="/map" replace>
            //     <i class="globe icon"></i>
            //     Map
            //     </Link>
            //     </a>
            //     <a class="item">
            //       <Link to="/projects" replace>
            //     <i class="tasks icon"></i>
            //     Projects
            //     </Link>
            //     </a>
            //     <a class='item'></a>
            //     <a class='item bark-font'>
            //       <h2 className='bark-font'>         EffectiveDonate         </h2>
            //     </a>
            //     <a class='item'></a>
            //
            //       <a class="item">
            //         <Link to="/profile" replace>
            //         <i class='user icon'></i>
            //           {localStorage.getItem('username')}
            //         </Link>
            //       </a>
            //
            //     <div class="item">
            //       <div onClick={this.logout} class="ui blue button">Log Out</div>
            //     </div>
            //   </div>
            // </div>

          )
        }
      }
export default withRouter(Navbar);
