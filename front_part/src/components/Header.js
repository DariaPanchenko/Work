import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import '../parts/Prod_card.css'
const Header = () => {
    return(
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className='subtitle_header'>B•look</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                            <Nav.Link className='subtitle_header'>Корзина</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                            <Nav.Link className='subtitle_header'>Войти</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header