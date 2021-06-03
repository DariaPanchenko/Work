import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, Button, Row, Col, Card} from 'react-bootstrap'
import {submitEmail} from "../actions/userActions";
import './Prod_card'

const Submit_page = ({history}) => {
    const [passcode, setPasscode] = useState('')
    const [message,setMessage] = useState(null)
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {broadcast,error,uInf} = userRegister
    const userSubmit = useSelector(state=>state.userSubmit)
    const {success: successSubmit} = userSubmit

    useEffect(() => {
        if (successSubmit) {
            history.push('/')
        }
        else if(uInf.passcode === '-1'){
            history.push('/')
        }
    }, [dispatch, history, uInf._id, uInf, successSubmit])

    const submitHandler = (e) => {
        e.preventDefault()
        if (passcode !== uInf.passcode) {
            setMessage('Пароли не совпадают')
        } else {
            dispatch(submitEmail({ _id: uInf.id, name: uInf.name,email: uInf.email, admin: uInf.admin, newCreator:uInf.newCreator, passcode: -1 }))
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
                                    <h2 className="userAll__title">Подтвердите почту</h2>
                                </div>
                                <div>
                                    <h6>Кодовое слово</h6>
                                    <input className="form-control" type='text' required placeholder='' value={passcode} onChange={(e)=>setPasscode(e.target.value)}></input>
                                </div>
                                <Button type='submit' variant='primary'>Подтвердить</Button>
                            </Form>
                            <Row>
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

export default Submit_page