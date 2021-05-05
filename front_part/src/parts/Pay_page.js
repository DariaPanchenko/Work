import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Slides from '../components/Slides.js'
import { useDispatch, useSelector } from 'react-redux'
import {orderMade} from '../actions/paidActions.js'


const Pay_page = ({history}) =>{
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, itm) => acc + itm.price, 0)
    )
    const madeOrder = useSelector(state=>state.madeOrder)
    const {ord, success, error }= madeOrder

    useEffect(() => {
        if (success) {
            history.push(`/order/${ord._id}`)
            /*dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })*/
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler=()=>{
        dispatch(orderMade({
            orderItm: cart.cartItems,
            payment: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            allPrice: cart.itemsPrice,
        }))
    }
    return(
        <>
            <Slides step1 step2 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>Способ оплаты</h2>
                            <strong>Метод: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2> Выбранные товары </h2>
                            {cart.cartItems.length === 0 ? (
                                <h4>Корзина пуста</h4>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((itm, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={itm.picture}
                                                        alt={itm.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/capsule/${itm.capsule}`}>
                                                        {itm.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {itm.price} ₽
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Общая сумма</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Cумма</Col>
                                <Col>{cart.itemsPrice} ₽</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <h3>{error}</h3>}
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                            >
                                Оплатить
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default Pay_page