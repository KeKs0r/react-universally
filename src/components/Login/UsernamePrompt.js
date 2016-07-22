import React, { Component, PropTypes } from 'react';
import {Tabs , Tab} from 'react-toolbox/lib/tabs';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { Link } from 'react-router';

 export default class UsernamePrompt extends Component {
   static propTypes = {
     login: PropTypes.func.isRequired,
     handleSubmit: PropTypes.func.isRequired
   }
   constructor(){
     super();
     this.state = {
       index: 0
     }
   }
    login(fields){
      const {email}  = fields;
      const {login} = this.props;
      login(email);
    }
   render () {
     const {fields:{email, password}, handleSubmit} = this.props;
     return (
      <form className = "form-centered" onSubmit={handleSubmit(this.login.bind(this))} >
          <p className="lead">Let’s start with your email address or phone number.</p>
          <div>
            <Input type='text' hint='Email, Phone #, Username' label='Email or phone' {...email} required/>
          </div>

          <Button className="btn-full" raised primary  onClick={handleSubmit(this.login.bind(this))}>
              NEXT
          </Button>
        </form>

     );
   }
}
