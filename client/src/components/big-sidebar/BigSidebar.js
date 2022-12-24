import { useSelector } from 'react-redux';
import NavLinks from '../nav-links/NavLinks';
import Logo from '../logo/Logo';
import Wrapper from '../../assets/wrappers/BigSidebar';

const BigSidebar = () => {
  const { showSidebar } = useSelector(
    state => state.jobs,
  );
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default BigSidebar