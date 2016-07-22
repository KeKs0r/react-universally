import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { AUTH } from 'constants';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import PasswordTitle from './PasswordTitle';




export default class PasswordEnter extends Component {
  /*
    @todo: PropTypes
  */
  constructor(){
    super();
    this.state = {
      passwordMask: true
    }
    this.login = this.login.bind(this);
    this.next = this.next.bind(this);
    this.maskPassword = this.maskPassword.bind(this);
  }

  login(fields){
    const { email, password }  = fields;
    const {loginWithPassword} = this.props;
    loginWithPassword(email, password);
  }

  maskPassword(e){
    e.preventDefault();
    this.setState({
      passwordMask: !this.state.passwordMask
    })
  }

  getPasswordTitle(){
    switch(this.props.login_status){
      case AUTH.USER_EXISTS:
        return 'Enter Your Password'
      case AUTH.NEW_USER:
        return 'Looks like you don’t have an account. Let’s set a password.'
      default:
        return 'This is the default';
    }
  }

  render() {
      const {fields: {email, password}, handleSubmit , valid, login_status} = this.props;
      // const {email} = fields;
      // const { password } = _.mapValues(fields, (field) => {
      //   if(field.error && !field.touched){
      //     return _.omit(field, 'error');
      //   }
      //   return field;
      // });
      const eyeIcon = (this.state.passwordMask) ? 'ai ai-show' : 'ai ai-hide' ;
      return (
            <form className = "form-centered" onSubmit={handleSubmit(this.login)} >

              <PasswordTitle headline={this.getPasswordTitle()}  credential={email.value} />

              <div>
                <Input type={ this.state.passwordMask ? 'text' : 'password' } hint='Email, Phone #, Username' label='Password' {...password} required>
                  <a className="input-link" href="#" onClick={this.maskPassword}>
                    <i className={eyeIcon}></i>
                  </a>
                </Input>
              </div>

              <Button className="btn-full" raised primary disabled={!valid} onClick={handleSubmit(this.login)}>
                  NEXT
              </Button>
          </form>
        );
    }//render
}
