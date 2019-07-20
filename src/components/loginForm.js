import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import logo from '../images/logo.png'
import { Link, Redirect } from 'react-router-dom'

export default class LoginForm extends Component {

  constructor(){
    super();

    this.username = React.createRef()
    this.password = React.createRef()

    if (this.getToken()) {
        this.getProfile()
      }
    }

  getToken(jwt) {
      return localStorage.getItem('jwt')
    }

}
