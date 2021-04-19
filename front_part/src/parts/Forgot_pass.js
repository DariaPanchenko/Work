import Iform from '../components/Iform'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Forgot_pass = () => {
    return(
        <Iform>
            <h2>Введите почту, чтобы получить письмо</h2>
            <Form>
                <Form.Group controlId='email'>
                    <Form.Label>Эл.почта</Form.Label>
                    <Form.Control type='email' placeholder=''></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Отправить</Button>
            </Form>
        </Iform>
    )
}

export default Forgot_pass