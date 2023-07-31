import {Nav, Navbar, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PageNavLink } from '../components/PageNavLink';


const Menu = () => {

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto flex gap-[40px]">
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