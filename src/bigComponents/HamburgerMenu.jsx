import {Nav, Navbar, Container} from 'react-bootstrap';
import { PageNavLink } from '../components/PageNavLink';


const Menu = () => {

    return (
        <Navbar expand="lg" collapseOnSelect className="bg-body-tertiary">
            <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='fixed lg:static top-[0px] left-[0px] z-10 bg-[#E9E9E9] lg:bg-[transparent] w-2/3 p-[20px] lg:p-[0px] h-screen lg:h-[50px]'>
                <Nav className="me-auto flex gap-[40px]"  navbarScroll>
                    <PageNavLink to="/" text='Dashboard' />
                    <PageNavLink to="/orderList" text='Orders' />
                    <PageNavLink to="/settings" text='Settings' />
                </Nav>
                </Navbar.Collapse>    
            </Container>
        </Navbar>
    )
}

export default Menu;