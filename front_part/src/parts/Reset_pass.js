import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {paramProfile, resetPassword} from "../actions/userActions";
import Iform from "../components/Iform";
import {Button, Form} from "react-bootstrap";
import actionTypes from "../reducers/actionTypes";

const Reset_pass = ({location, history, match}) => {
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState(null)


    const dispatch = useDispatch()
    const userResetPass = useSelector(state=>state.userResetPass)
    const {broadcast,error,uInfores,success} = userResetPass
    const userLog = useSelector(state => state.userLog)
    const {uInf} = userLog

   // console.log(uInfores.resetLinkPass)
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(resetPassword('uInfores.resetLinkPass', password))
    }

    return(
        <Iform>
            {error && <h3>{error}</h3>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control type='password' required placeholder='' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Сменить</Button>
            </Form>
        </Iform>
    )
}

export default Reset_pass