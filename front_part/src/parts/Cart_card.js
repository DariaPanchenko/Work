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
    //console.log(cartItems)
    useEffect(()=>{
        if(capsId){
            dispatch(addItem(capsId))
        }
    },[dispatch,capsId])

    const removeItem =(id)=>{
       dispatch(remItem(id))
    }
 /*const procCheckout =()=>{
     history.push('/login?redirect=buy')
 }*/

    const checkoutForBuy= () => {
       /* history.push('/buy')*/
        dispatch(saveBuyCapsule('SavePay'))
        history.push('/allpayment')
    }
    return(
        <Row>
            <Col md={6} className="mx-auto">
                <Card>
                    <img className="card-img" src={'../../pic/fon.png'} alt="fon"/>
                    <div className="card-img-overlay">
                        <div>
                            <h4 className="subtitle">Подборки</h4>
                        </div>
                {cartItems.length ===0?<h3>Пусто</h3>:(
                    <ListGroup variant='flush'>
                        {cartItems.map((itm) => (
                            <div key={itm.capsule}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={itm.picture} alt={itm.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/capsule/${itm.capsule}`}>{itm.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        <h5 className="subtitle__header">{itm.price} ₽</h5>
                                    </Col>
                                    <Col md={3}>
                                        <Button type='button' className="btn-dark" variant='light' onClick={()=>removeItem(itm.capsule)}>
                                            <i className='delett'>Удалить</i>
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </ListGroup>)}
                        <h5 className='subtitle'>
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