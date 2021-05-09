import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {paramProfile, updProfile} from '../actions/userActions'
import {userPaidOrderGet} from '../actions/paidActions'
import {Form, Button, Row, Col, Table, Card, ListGroup} from 'react-bootstrap'
import actionTypes from '../reducers/actionTypes'
import {LinkContainer} from 'react-router-bootstrap'
import Iform from '../components/Iform'

const Prof_page = ({location, history}) =>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [repeatPassword,setRepeatPassword] = useState('')
    const [message,setMessage] = useState(null)

    const dispatch = useDispatch()
    const userParam = useSelector(state => state.userParam)
    const {broadcast,error,userProf} = userParam

    const userUpdProf = useSelector(state => state.userUpdProf)
    const {success} = userUpdProf
    const userLog = useSelector(state => state.userLog)
    const {uInf} = userLog

    const getPaidUsrOrder = useSelector(state => state.getPaidUsrOrder)
    const {broadcast: broadcastGetOrds, error: errorGetOrds, ords } = getPaidUsrOrder

    useEffect(()=>{
        if(!uInf){
            history.push('/login')
        }else{
            if(!userProf.name || success){
                dispatch({type: actionTypes.USER_UPDPROF_RESET})
                dispatch(paramProfile('profile'))
                dispatch(userPaidOrderGet())
            }else{
                setName(userProf.name)
                setEmail(userProf.email)
            }
        }
    },[dispatch,history,uInf, userProf, success])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password!==repeatPassword){
            setMessage('Пароли не совпадают')
        } else{
          //dispatch update
            dispatch(updProfile({id:userProf._id, name, email, password}))
        }
    }
    return( <Row>
            <Col md={4}>
            <h3 className="subtitle"> Изменить профиль </h3>
            {error && <h3>{error}</h3>}
            {message && <h3>{message}</h3>}
            {success && <h3>Вы изменили данные</h3>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type='name'  placeholder='' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Эл.почта</Form.Label>
                    <Form.Control type='email'  placeholder='' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type='password'  placeholder='' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='repeatPassword'>
                    <Form.Label>Подтвердите пароль</Form.Label>
                    <Form.Control type='password'  placeholder='' value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Изменить</Button>
            </Form>
            </Col>
            <Col md={8}>
                <Card>
                    <img className="card-img" src={'../../pic/fon.png'} alt="fon"/>
                    <div className="card-img-overlay">
                        <ListGroup variant="flush">
                            <h3>Товары</h3>
                            <div className="scroll__pgs">
                                <Row>
                                    <Col md={5}>
                                        <p>Заказ</p>
                                    </Col>
                                    <Col>
                                        <p>Цена</p>
                                    </Col>
                                    <Col>
                                        <p>Оплачено</p>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            {broadcastGetOrds?(<h3>Загрузка...</h3>):errorGetOrds?(<h3>{errorGetOrds}</h3>):(
                                ords.map((ord) => (
                                <div key={ord._id}>
                                    <Row>
                                        <Col md={5}>
                                            {ord._id}
                                        </Col>
                                        <Col>
                                            {ord.allPrice}
                                        </Col>
                                        <Col>
                                            {ord.paidFinish?(
                                                ord.datePaid.substring(0, 10)):(<h5>Нет</h5>
                                                )}
                                        </Col>
                                        <Col>
                                            <LinkContainer to={`/order/${ord._id}`}>
                                                <Button className="btn-sm btn-dark">
                                                    Посмотреть
                                                </Button>
                                            </LinkContainer>
                                        </Col>
                                    </Row>
                                    </div>
                                ))
                                )}
                            </div>
                        </ListGroup>
                    </div>
                </Card>
            </Col>
            </Row>
    )
}
export default Prof_page