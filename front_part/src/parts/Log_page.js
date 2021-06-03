import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userActions'
import {Form, Button, Row, Col, Card} from 'react-bootstrap'
import './Prod_card'


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
        <>
            {error && <h3>{error}</h3>}
            <Row>
                <Col md={6} className="mx-auto">
                    <Card>
                        <img className="card-img" src={'/pic/fon.png'} alt="fon"/>
                        <div className="card-img-overlay">
                        <Form onSubmit={submitHandler}>
                            <div>
                                <h2 className="userAll__title">Войти</h2>
                            </div>
                            <div>
                                <h6>Эл.почта</h6>
                                <input className="form-control" type='email' placeholder='' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                            </div>

                            <div>
                                <h6>Пароль</h6>
                                <input className="form-control" type='password' placeholder='' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                            </div>
                            <Button type='submit' variant='primary'>Войти</Button>
                        </Form>
                        <Row>
                            <Col>
                                <div className="reg__style">Новый пользователь?{' '}<Link className="reg__style" to={redirect?`/register?redirect=${redirect}`:'/register' }>Регистрация</Link></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="reg__style">Забыли пароль?{' '}<Link className="reg__style" to={'/forgot'}>Восстановить</Link></div>
                            </Col>
                        </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Log_page