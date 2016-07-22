import { reduxForm } from 'redux-form';
import { login , loginWithPassword } from '../../actions/auth';
const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

const formConfig = {
  form: 'LoginOptionsForm',
  fields: ['email', 'password'],
  destroyOnUnmount: false,
  validate
}

const mapStateToProps = (state) => {
  login_status = state.auth.login_status
}

const LoginContainer = function(Component) {
  return reduxForm(
    formConfig,
    mapStateToProps,
    { login, loginWithPassword }
  )
}

export default LoginContainer
