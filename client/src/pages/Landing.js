import { Fragment } from 'react';
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components/index';

const Landing = () => {
  const { user } = useSelector(
    state => state.user,
  )
  return (
    <Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>job <span>tracking</span> app</h1>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
            <Link to='/register' className='btn btn-hero'>
                Login/Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className='img main-img' />
        </div>
      </Wrapper>
    </Fragment>
  )
}

export default Landing