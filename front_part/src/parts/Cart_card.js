import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {Row,Col,ListGroup,Image,Button,Card,Form} from "react-bootstrap";
import {addItem, remItem, saveBuyCapsule} from '../actions/cartActions.js'
import './Prod_card.css'

const Cart_card = ({match,history}) => {
    const capsId = match.params.id
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart
    useEffect(()=>{
        if(capsId){
            dispatch(addItem(capsId))
        }
    },[dispatch,capsId])

    const removeItem =(id)=>{
       dispatch(remItem(id))
    }
    const checkoutForBuy= () => {
        dispatch(saveBuyCapsule('SavePay'))
        history.push('/allpayment')
    }
    return(
        <Row>
            <Col md={8} className="mx-auto">
                <Card>
                    <img className="card-img" src={'../../pic/fon.png'} alt="fon"/>
                    <div className="card-img-overlay">
                        <div>
                            <h4 className="subtitle">Подборки</h4>
                        </div>
                {cartItems.length ===0?<h3>Пусто</h3>:(
                    <ListGroup variant='flush'>
                        <div className="scroll__pgCart">
                        {cartItems.map((itm) => (
                            <div key={itm.capsule}>
                                <div className="hr">
                                </div>
                                <div>
                                    <Link to={`/capsule/${itm.capsule}`}>{itm.name}</Link>
                                </div>
                                <div>
                                    <h5 className="subtitle__header">{itm.price} ₽</h5>
                                </div>
                                <div>
                                    <Button type='button' className="btn-sm btn-dark" variant='light' onClick={()=>removeItem(itm.capsule)}>
                                        <i className='delett'>Удалить</i>
                                    </Button>
                                </div>
                            </div>
                        ))}
                       </div>
                    </ListGroup>)}
                        <h5 className='subtitle__Cart'>
                            Общая сумма - {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)} ₽
                        </h5>
                        <Button type='button' className="btn-dark" disabled={cartItems.length === 0} onClick={checkoutForBuy}>
                            Купить
                        </Button>

                    </div>
                </Card>
            </Col>
        </Row>
    )
}
export default Cart_card