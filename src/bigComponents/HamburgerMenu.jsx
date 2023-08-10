import {Nav, Navbar, Container} from 'react-bootstrap';
import { PageNavLink } from '../components/PageNavLink';
import { logOut } from '../helpers/firebaseControl';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FiLogOut } from 'react-icons/fi';


const Menu = () => {

    const { setUser, setUserRole } = useContext(AppContext);

    const [expanded, setExpanded] = useState(false);

    const handleLinkClick = () => {
        console.log('click')
        setExpanded(false);
    };

    const handleLogOut = () => {
        logOut();
        setUser(null);
        setUserRole('');
      };

    return (
        <Navbar expanded={expanded} onToggle={setExpanded} expand="lg" collapseOnSelect className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav" className='fixed lg:static top-[0px] left-[0px] z-10 bg-[#E9E9E9] lg:bg-[transparent] w-2/3 p-[20px] lg:p-[0px] h-screen lg:h-[50px]'>
                    <Nav className="flex gap-[20px]"  navbarScroll>
                        <PageNavLink to="/" text='Dashboard' onClick={handleLinkClick} />
                        <PageNavLink to="/orderList" text='Orders' onClick={handleLinkClick}/>
                        <PageNavLink to="/settings" text='Settings' onClick={handleLinkClick}/>
                    </Nav>
                </Navbar.Collapse> 
                <button className='p-[10px] border border-gray-700 rounded bg-white flex gap-[10px] items-center'
                    onClick={handleLogOut}
                >  
                    <span>Выйти</span>
                    <FiLogOut />
                </button>
            </Container>
        </Navbar>
    )
}

export default Menu;