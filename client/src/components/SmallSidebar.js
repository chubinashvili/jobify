import Wrapper from '../assets/wrappers/SmallSidebar.js';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext.js';
import { NavLink } from 'react-router-dom';
import links from '../utils/links.js';
import Logo from './Logo.js';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button 
            type='button' 
            className='close-btn' 
            onClick={() => toggleSidebar(!showSidebar)}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            {links.map(link => {
              const { text, path, id, icon } = link;
              return (
                <NavLink
                  to={path}
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  key={id}
                  onClick={toggleSidebar}
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              ) 
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSidebar