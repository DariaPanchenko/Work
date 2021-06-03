import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import{useDispatch, useSelector} from 'react-redux'
import '../parts/Prod_card.css'
import {logout} from '../actions/userActions'
const Header = () => {
    const userLog=useSelector(state=>state.userLog)
    const{uInf} = userLog
    const dispatch=useDispatch()
    return(
        <header>
            <Navbar bg="light" expand="md">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className='subtitle_header'>Beauty look</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {uInf && <LinkContainer to='/cart'>
                                <Nav.Link className='subtitle__header'>Корзина</Nav.Link>
                            </LinkContainer>}
                           {uInf && <LinkContainer to='/profile'>
                                    <Nav.Link className='subtitle__header'>{uInf.name}</Nav.Link>
                                </LinkContainer> }
                            {uInf && uInf.admin && (
                                <LinkContainer to='/admin/userAll'>
                                    <Nav.Link className='subtitle__header'>Пользователи</Nav.Link>
                                </LinkContainer>
                            )}
                            {uInf && uInf.admin && (
                                <LinkContainer to='/admin/capsAll'>
                                    <Nav.Link className='subtitle__header'>Подборки</Nav.Link>
                                </LinkContainer>
                            )}
                            {uInf && uInf.newCreator && (
                                <LinkContainer to='/creator/capsAll'>
                                    <Nav.Link className='subtitle__header'>Подборки</Nav.Link>
                                </LinkContainer>
                            )}
                            {!uInf && <LinkContainer to='/register?redirect=/'>
                                <Nav.Link className='subtitle__header'>Регистрация</Nav.Link>
                            </LinkContainer>}
                            {uInf && <LinkContainer to='/'>
                                <Nav.Link className='subtitle__header' onClick={()=>dispatch(logout())}>Выйти</Nav.Link>
                            </LinkContainer>}
                           {!uInf && <LinkContainer to='/login'>
                                <Nav.Link className='subtitle__header'>Войти</Nav.Link>
                            </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header