import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapBrowser from './components/mapBrowser.js';
import LoginForm from './components/loginForm';
import Profile from './components/Profile';
import BubbleMap from './components/BubbleMap';
import CreateUserForm from './components/createUserForm';
import CountryMap from './components/CountryMap';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  constructor(){
    super()
    this.state = {
      }
    }

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/"
          render={(props) => (
            <LoginForm {...props}
              onLogin={this.updateUser}
              user={this.state.user}
            />
          )}
        />
            <Route path={'/map'} component={MapBrowser} />
            <Route path={'/create_user'} component={CreateUserForm} />
            <Route path={'/profile'} component={Profile} />
            <Route path={'/bubble'} component={BubbleMap} />
            <Route path={'/country'} component={CountryMap} />
          </Router>
      </div>


      // <div className="app-div" style={{
      //   height:"50vh",
      //   width: "50vw"
      // }}>
      //   <button onClick={this.findLastProject} id="refreshBtn">Get New Projects</button>
      //   <button onClick={this.refreshMap} id="refreshBtn">Refresh Projects</button>
      //   <ChoroplethMap data={this.state.data}/>
      // </div>
    );
  }
}


export default App;
