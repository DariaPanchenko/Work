import {Container, Row, Col} from 'react-bootstrap'
const Footer = () => {
    return(
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <div className="footer__contacts">
                            <a className="contacts__socials" href='/'><img className="contacts__socials-inst" src={'/pic/INST.png'} alt="inst"/></a>
                            <a className="contacts__socials" href='/'><img className="contacts__socials-vk" src={ '/pic/VK.png'} alt="vk"/></a>
                            <a className="contacts__socials" href='/'><img className="contacts__socials-fb" src={'/pic/FB.png'} alt="fb"/></a>
                        </div>
                        Beauty look
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
export default Footer