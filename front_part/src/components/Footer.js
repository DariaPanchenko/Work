import imgInst from  '../pic/INST.png'
import imgVK from '../pic/VK.png'
import imgFB from '../pic/FB.png'
import {Container, Row, Col} from 'react-bootstrap'
const Footer = () => {
    return(
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <div className="footer__contacts">
                            <a className="contacts__socials" href='/'><img className="contacts__socials-inst" src={imgInst} alt="inst"/></a>
                            <a className="contacts__socials" href='/'><img className="contacts__socials-vk" src={imgVK} alt="vk"/></a>
                            <a className="contacts__socials" href='/'><img className="contacts__socials-fb" src={imgFB} alt="fb"/></a>
                        </div>
                        B•look
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
export default Footer