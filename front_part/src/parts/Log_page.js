import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userActions'
import {Form, Button,Row,Col} from 'react-bootstrap'
import Iform from '../components/Iform'

const Log_page = ({location, history}) =>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const userLog = useSelector(state => state.userLog)
    const {broadcast,error,uInf} = userLog
    const redirect = location.search?location.search.split('=')[1] : '/'
    useEffect(()=>{
        if(uInf){
            history.push(redirect)
        }
    },[history,uInf,redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        //dispatch login
        dispatch(login(email,password))
    }
    return(
        <Iform>
            <h2>Вход</h2>
            {error && <h3>{error}</h3>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Эл.почта</Form.Label>
                    <Form.Control type='email' placeholder='' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type='password' placeholder='' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Войти</Button>
            </Form>
            <Row>
                <Col>
                    Новый пользователь?{' '}<Link to={redirect?`/register?redirect=${redirect}`:'/register' }>Регистрация</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    Забыли пароль?{' '}<Link to={'/forgotpass'}>Восстановить</Link>
                </Col>
            </Row>
        </Iform>
    )
}
export default Log_page