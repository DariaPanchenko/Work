import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
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
            <Row>
                <Col md={8} className="mx-auto">
                    <Card>
                        <img className="card-img" src={'../../pic/fon.png'} alt="fon"/>
                        <div className="card-img-overlay">
                        <ListGroup variant='flush'>
                            <div>
                             <h2 className="title__Cart"> Выбранные товары </h2>
                                {cart.cartItems.length === 0 ? (
                                    <h4>Корзина пуста</h4>
                                     ) : (
                                    <ListGroup variant='flush'>
                                        <div className="scroll__pgCart">
                                         {cart.cartItems.map((itm, index) => (
                                             <div key={index}>
                                                     <div>
                                                         <Link to={`/capsule/${itm.capsule}`}>{itm.name}</Link>
                                                     </div>
                                                    <div>
                                                        <h5>{itm.price} ₽</h5>
                                                    </div>
                                            </div>
                                    ))}
                                        </div>
                                </ListGroup>
                            )}
                        </div>
                            <h4 className='subtitle__Cart'>Общая сумма - {cart.itemsPrice} ₽</h4>
                        <div>
                            {error && <h3>{error}</h3>}
                            <Button type='button' className="btn-dark" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                Оформить
                            </Button>
                        </div>
                        </ListGroup>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Pay_page