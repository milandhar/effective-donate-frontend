import React, { Component} from 'react'
import { Button, Form, Grid, Header, Checkbox } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'

export default class CreateUserForm extends Component {

    constructor() {
        super();
        this.state = {
          themes: [],
          topThemes: []
        };
        this.username = React.createRef()
        this.password = React.createRef()
        this.firstname = React.createRef()
        this.lastname = React.createRef()
        this.emailaddress = React.createRef()
    }


    componentDidMount(){
      this.getThemes()
    }

    getThemes = () => {
      const url = 'http://localhost:3000/api/v1/themes'
      fetch(url)
      .then(res=>res.json())
      .then(json => {this.setState({themes: json})})
    }

    createUser = () => {
        const URL = 'http://localhost:3000/api/v1/users'
        let[theme_id_1, theme_id_2, theme_id_3] = this.state.topThemes
        if(!theme_id_1){
          theme_id_1 = null
        } else if (!theme_id_2) {
          theme_id_2 = null
        } else if (!theme_id_3) {
          theme_id_3 = null
        }

        console.log(theme_id_1)
        console.log(theme_id_2)
        console.log(theme_id_3)

        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username.current.form[0].value,
               password: this.password.current.form[1].value,
               first_name: this.firstname.current.form[2].value,
               last_name: this.lastname.current.form[3].value,
               email_address: this.emailaddress.current.form[4].value,
               theme1: theme_id_1,
               theme2: theme_id_2,
               theme3: theme_id_3
            })
        }
        fetch(URL, headers)
            .then(res=>res.json())
            .then(json => {
              console.log(json["error"])
              if(!json["error"]){
                this.props.history.push("/")
              }
            })
            .catch(error => console.log(error))
    }

    handleSubmit = ()=>{
        this.createUser()
    }

    backToLogin = () => {
      // window.location.replace("http://localhost:3001/");
      this.props.history.push("/")
    }

    compare = (a, b) => {
      // Use toUpperCase() to ignore character casing
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }

    handleChange = (ev, data) =>{
      console.log(data)
      let prevThemes = this.state.topThemes
      if (prevThemes.length < 4){
        prevThemes.push(data.value)
        this.setState({topThemes: prevThemes})
      }
    }



    renderThemeField = () => {
      let themes = this.state.themes.sort(this.compare)
      return this.state.themes.map((theme)=> {
        return(
          <Form.Field
            control={Checkbox}
            label={theme.name}
            value={theme.id}
            onClick={this.handleChange}
            checked={this.state.checked}
          />
          )
        })
      }

      // getThemeId = (themeName) => {
      //   let themes = this.state.themes
      //   console.log(themes)
      // }


    render() {
        return(
            <div>
                <header className='spacer'> </header>
                <container className='login-section'>
                <div className='login-div'>
                <article className ='login'>
                <Header  as='h1' dividing> Create Account </Header>
                <Grid centered columns={2} padded='vertically'>
                <Form className='create-form'>
                  <Form.Group widths='equal'>


                    <Form.Field>
                     <label>Username</label>
                     <input ref={this.username} name='username' placeholder='username' required/>
                     </Form.Field>

                     <Form.Field>
                     <label>Password</label>
                     <input ref={this.password} type="password" name='password' placeholder='password' required/>
                     </Form.Field>

                     <Form.Field>
                     <label>First Name</label>
                     <input ref={this.firstname} type="text" name='firstname' placeholder='First Name' required/>
                     </Form.Field>

                     <Form.Field>
                     <label>Last Name</label>
                     <input ref={this.lastname} type="text" name='lastname' placeholder='Last Name' required/>
                     </Form.Field>

                     <Form.Field>
                     <label>Email Address</label>
                     <input ref={this.emailaddress} type="email"name='email_address' placeholder='email' required/>
                     </Form.Field>
                  </Form.Group>
                  <Form.Group inline>
                    <label>Top Themes (Up to 3)</label>
                    <div>
                      {this.renderThemeField()}
                    </div>

                    {/* <Form.Field
                      control={Checkbox}
                      label='Animals'
                      value={this.getThemeId('Animals')}
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Checkbox}
                      label='Arts and Culture'
                      value='Arts and Culture'
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Checkbox}
                      label='Children'
                      value='Children'
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Checkbox}
                      label='Education'
                      value='Education'
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Checkbox}
                      label='Democracy and Governance'
                      value='Democracy and Governance'
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Checkbox}
                      label='Disaster Recovery'
                      value='Disaster Recovery'
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Checkbox}
                      label='Disaster Recovery'
                      value='Disaster Recovery'
                      onChange={this.handleChange}
                    />
                    */}
                  </Form.Group>
                     <div id="button-div">
                       <Form.Field>
                         <Button onClick={this.handleSubmit}>Create Profile</Button>
                       </Form.Field>
                       <Form.Field>
                        {/* <Button><Link to="/" replace>Return to Login</Link></Button>*/}
                          <Button onClick={this.backToLogin}>Return to Login</Button>
                       </Form.Field>
                     </div>
                </Form>
                </Grid>
                </article>
                </div>
                </container>
            </div>
        )
    }
}
