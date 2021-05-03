import Iform from '../components/Iform'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {restoreEmail} from '../actions/userActions'

const Forgot_pass = () => {
    const [email,setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const userForgotPass = useSelector(state=>state.userForgotPass)
    const {error} = userForgotPass

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(restoreEmail(email))
        setMessage('Проверьте почту с новым паролем');
    }
    return(
        <Iform>
            <h2>Введите почту, чтобы получить письмо</h2>
            {error && <h3>{error}</h3>}
            {message && <h3>{message}</h3>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Эл.почта</Form.Label>
                    <Form.Control type='email' placeholder=''value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Отправить</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Проверьте вашу почту.{' '}
                </Col>
            </Row>
        </Iform>
    )
}
export default Forgot_pass