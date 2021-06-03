import {Button, Card, Col, Form, Row} from 'react-bootstrap'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {restoreEmail} from '../actions/userActions'
import './Prod_card'

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
        <>
            {error && <h3>{error}</h3>}
            {message && <h3>{message}</h3>}
            <Row>
                <Col md={6} className="mx-auto">
                    <Card>
                        <img className="card-img" src={'/pic/fon.png'} alt="fon"/>
                        <div className="card-img-overlay">
                            <Form onSubmit={submitHandler}>
                                <div>
                                    <h2 className="userAll__title">Введите почту, чтобы получить письмо</h2>
                                </div>
                                <div>
                                    <h6>Эл.почта</h6>
                                    <input className="form-control" type='email' placeholder=''value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                                </div>
                                <Button type='submit' variant='primary'>Отправить</Button>
                            </Form>
                            <Row className='py-3'>
                                <Col>
                                    <div className="reg__style">Проверьте вашу почту.{' '}</div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>

    )
}
export default Forgot_pass