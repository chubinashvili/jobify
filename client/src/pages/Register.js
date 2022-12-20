import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Logo,
  FormRow,
  Alert
} from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { setupUser } from '../store/user/userSlice';
import { displayAlert } from '../store/alerts/alertsSlice';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user } = useSelector(
    state => state.user,
  )
  const { isLoading, showAlert } = useSelector(
    state => state.alerts
  )

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if(!email || !password || (!isMember && !name)) {
      displayAlert(dispatch);
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser(dispatch, { 
        currentUser, 
        endpoint: 'login', 
        alertText: 'Login Successful!'
      });
    } else {
      setupUser(dispatch, { 
        currentUser, 
        endpoint: 'register', 
        alertText: 'User Created!'
      });
    }
    setValues(initialState);
  }
  
  useEffect(() => {
    if(user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate])
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow 
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email input */}
        <FormRow 
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow 
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button 
          type='submit' 
          className='btn btn-block'
          disabled={isLoading}
          >
           submit
        </button>
        <button 
          type='button' 
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() => {
            setupUser(dispatch, { 
              currentUser: { email: 'testUser@test.com', password: 'secret'}, 
              endpoint: 'login', 
              alertText: 'Login Successful!'
            });
          }}
        >
           {isLoading ? 'loading...' : 'demo app'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button 
            type='button' 
            onClick={toggleMember} 
            className='member-btn'
            >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register