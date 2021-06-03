import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions'
import {Form, Button, Row, Col, Card} from 'react-bootstrap'
import './Prod_card'

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
            if(uInf.passcode === '-1'){
                history.push(redirect)
            }
            else {
                history.push(redirect)
                history.push('/submit')
            }
        }
    },[history,uInf,redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password!==repeatPassword){
            setMessage('Пароли не совпадают')
        } else{
         dispatch(register(name,email,password))
        }
    }
    return(
        <>
            {message && <h3>{message}</h3>}
            {error && <h3>{error}</h3>}
            {broadcast && <h3>Загрузка...</h3>}
            <Row>
                <Col md={6} className="mx-auto">
                    <Card>
                        <img className="card-img" src={'/pic/fon.png'} alt="fon"/>
                        <div className="card-img-overlay">
                            <Form onSubmit={submitHandler}>
                                <div>
                                    <h2 className="userAll__title">Регистрация</h2>
                                </div>
                                <div>
                                    <h6>Имя</h6>
                                    <input className="form-control" type='name' required placeholder='' value={name} onChange={(e)=>setName(e.target.value)}></input>
                                </div>

                                <div>
                                    <h6>Эл.почта</h6>
                                    <input className="form-control" type='email' required placeholder='' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                                </div>

                                <div>
                                    <h6>Пароль</h6>
                                    <input className="form-control" type='password' required placeholder='' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                                </div>

                                <div>
                                    <h6>Подтвердите пароль</h6>
                                    <input className="form-control" type='password' required placeholder='' value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)}></input>
                                </div>
                                <Button type='submit' variant='primary'>Зарегистрироваться</Button>
                            </Form>
                            <Row>
                                <Col>
                                    <div className="reg__style">Уже есть аккаунт?{' '}<Link className="reg__style" to={redirect?`/login?redirect=${redirect}`:'/login' }>Войти</Link></div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )

}
export default Reg_page