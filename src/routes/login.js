import LoginFormContainer from '../containers/Login/LoginForm';
import _UsernamePrompt from '../components/Login/UsernamePrompt';
import _PasswordEnter from '../components/Login/PasswordEnter';

const UsernamePrompt = LoginFormContainer(_UsernamePrompt);
const PasswordEnter = LoginFormContainer(_PasswordEnter);


const routes = [
  { path: 'login-prompt',
    component: {
      main: LoginPrompt,
      left: 'Component Text'
  }},
  { path: 'password-enter',
    component: {
      main: PasswordEnter,
      left: 'Other Text'
  }}
];


export default routes;
