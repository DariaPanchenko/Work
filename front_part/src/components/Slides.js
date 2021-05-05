import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Slides = ({ step1, step2}) => {
    return (
        <Nav className='justify-content-center mb-4'>

            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/buy'>
                        <Nav.Link>Оформить</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Оформить</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/allpayment'>
                        <Nav.Link>Оплатить</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Оплатить</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default Slides
