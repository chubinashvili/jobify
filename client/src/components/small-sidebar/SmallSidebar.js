import Wrapper from '../../assets/wrappers/SmallSidebar.js';
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/jobs/jobsSlice';
import Logo from '../logo/Logo.js';
import NavLinks from '../nav-links/NavLinks';

const SmallSidebar = () => {
  const dispatch = useDispatch();
  const { showSidebar } = useSelector(
    state => state.jobs,
  );
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button 
            data-testid="close-btn"
            type='button' 
            className='close-btn' 
            onClick={() => toggleSidebar(dispatch)}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={() => toggleSidebar(dispatch)} />
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSidebar