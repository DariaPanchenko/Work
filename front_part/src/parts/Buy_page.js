import Iform from '../components/Iform'
import { Form, Button, Col } from 'react-bootstrap'
import Slides from '../components/Slides.js'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {saveBuyCapsule} from '../actions/cartActions.js'

const Buy_page = ({history})=>{

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveBuyCapsule(paymentMethod))
        history.push('/allpayment')
    }
    return(
        <Iform>
            <Slides step1 step2 />
            <h3>Метод оплаты</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Col>
                        <Form.Check type='radio' label='PayPal' id='PayPal' name='paymentMethod' value='PayPal' checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Продолжить
                </Button>
            </Form>
        </Iform>
    )
}

export default Buy_page