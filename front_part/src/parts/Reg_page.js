import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions'
import {Form, Button,Row,Col} from 'react-bootstrap'
import Iform from '../components/Iform'

const Reg_page = ({location, history}) =>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [repeatPassword,setRepeatPassword] = useState('')
    const [message,setMessage] = useState(null)

    const dispatch = useDispatch()
    const userRegist = useSelector(state => state.userRegister)
    const {broadcast,error,uInf} = userRegist

    const redirect = location.search?location.search.split('=')[1] : '/'
    useEffect(()=>{
        if(uInf){
            history.push(redirect)
        }
    },[history,uInf,redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        //dispatch regist
        if(password!==repeatPassword){
            setMessage('Пароли не совпадают')
        } else{
        dispatch(register(name,email,password))
        }
    }
    return(
        <Iform>
            <h2>Регистрация</h2>
            {message && <h3>{message}</h3>}
            {error && <h3>{error}</h3>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type='name' required placeholder='' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Эл.почта</Form.Label>
                    <Form.Control type='email' required placeholder='' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type='password' required placeholder='' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='repeatPassword'>
                    <Form.Label>Подтвердите пароль</Form.Label>
                    <Form.Control type='password' required placeholder='' value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Зарегистрироваться</Button>
            </Form>
            <Row>
                <Col>
                    Уже есть аккаунт?{' '}<Link to={redirect?`/login?redirect=${redirect}`:'/login' }>Войти</Link>
                </Col>
            </Row>
        </Iform>
    )
}
export default Reg_page