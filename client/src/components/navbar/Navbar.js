import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/jobs/jobsSlice';
import { logoutUser } from '../../store/user/userSlice';
import Logo from '../logo/Logo.js';
import Wrapper from '../../assets/wrappers/Navbar.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector(
    state => state.user,
  );

  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn'
          onClick={() => toggleSidebar(dispatch)}
        >
          <FaAlignLeft />
        </button>
        
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        
        <div className='btn-container'>
          <button className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
             {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              onClick={() => logoutUser(dispatch)} 
              className='dropdown-btn'
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Navbar