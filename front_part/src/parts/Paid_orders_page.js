import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {getOrderId, procPayOrder} from '../actions/paidActions.js'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import actionTypes from '../reducers/actionTypes.js'

const Paid_orders_page = ({match}) =>{
    const ordId = match.params.id
    const [sdkOk, setSdkOk] = useState(false)
    const dispatch = useDispatch()

    const orderId = useSelector(state=>state.orderId)
    const {ord, broadcast, error }=orderId

    const orderProcPay= useSelector(state=>state.orderProcPay)
    const {broadcast: broadcastProcPay, success:successProcPay}=orderProcPay

    useEffect(() => {
        const scriptPayPal = async() =>{
            const {data: paypalClientID} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientID}&currency=RUB`
            script.async = true
            script.onload=()=>{
                setSdkOk(true)
            }
            document.body.appendChild(script)
        }
        if(!ord || successProcPay || ord._id !== ordId) {
            dispatch({type: actionTypes.ORDER_PAID_RESET})
            dispatch(getOrderId(ordId))
        }else if (!ord.paidFinish) {
            if (!window.paypal) {
                scriptPayPal()
            } else {
                setSdkOk(true)
            }
        }
    }, [dispatch,ord,successProcPay,ordId])

    const successPayHandler=(paymentResult)=>{
        console.log(paymentResult)
        dispatch(procPayOrder(ordId, paymentResult))
    }
    return broadcast?(<h3>Загрузка...</h3>):error?(<h3>{error}</h3>):(
        <>
            <Row>
                <Col md={8} className="mx-auto">
                    <Card>
                        <img className="card-img" src={'../../pic/fon.png'} alt="fon"/>
                        <div className="card-img-overlay">
                        <ListGroup variant="flush" >
                            <div>
                                <p>Почта: {ord.user.email}</p>
                            </div>
                            <div>
                                <h4 className="title__CartFinish">Подборки</h4>
                                {ord.orderItm.length === 0 ? (
                                    <h3>Нет заказов</h3>
                                ) : (
                                    <ListGroup variant='flush'>
                                        <div className="scroll__pgCartFinnish">
                                        {ord.orderItm.map((itm, index) => (
                                            <div key={index}>
                                                <Row>
                                                    <Col>
                                                        <Link to={`/capsule/${itm.capsule}`}>
                                                            {itm.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={3}>
                                                        {itm.price} ₽
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))}
                                        </div>
                                    </ListGroup>
                                )}
                            </div>
                            <div>
                                <h4 className="subtitle__CartFinish">Состояние оплаты: </h4>
                                {ord.paidFinish ? (<p>Дата {ord.datePaid.substring(0, 10)}</p>
                                ) : (<p>Не оплачено</p>)}
                            </div>
                            <div>
                                <h4 className="subtitle__CartFinish">Сумма заказа</h4>
                                <h4 className="subtitle__CartFinish">{ord.allPrice} ₽</h4>
                            </div>
                            {!ord.paidFinish && (
                                <div>
                                    {broadcastProcPay && <h3>Обработка...</h3>}
                                    {!sdkOk ? <h3 className="subtitle__CartFinish">Обработка...</h3>:(
                                        <PayPalButton amount={ord.allPrice}  onSuccess={successPayHandler} options={{currency: "RUB"}}></PayPalButton>
                                        )
                                    }
                                </div>
                            )}
                        </ListGroup>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Paid_orders_page