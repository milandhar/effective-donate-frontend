import React, { Component} from 'react'
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'

export default class CreateUserFOrm extends Component {

    constructor() {
        super();
        // this.state = {
        //     username: '',
        //     email_address: ''
        // };
        this.username = React.createRef()
        this.password = React.createRef()
        this.firstname = React.createRef()
        this.lastname = React.createRef()
        this.emailaddress = React.createRef()

    }


    createUser = () => {
        const URL = 'http://localhost:3000/api/v1/users'

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
               email_address: this.emailaddress.current.form[4].value
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
