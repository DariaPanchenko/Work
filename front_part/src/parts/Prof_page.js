import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {paramProfile, updProfile} from '../actions/userActions'
import {Form, Button,Row,Col} from 'react-bootstrap'
import actionTypes from '../reducers/actionTypes'
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
    useEffect(()=>{
        if(!uInf){
            history.push('/login')
        }else{
            if(!userProf.name || success){
                dispatch({type: actionTypes.USER_UPDPROF_RESET})
                dispatch(paramProfile('profile'))
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

    return(
        <Iform>
            <h2>Профиль </h2>
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
            <Row>
                <Col>
                   Покупки
                </Col>
            </Row>
        </Iform>
    )
}
export default Prof_page