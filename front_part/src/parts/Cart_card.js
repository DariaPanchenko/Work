import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {Row,Col,ListGroup,Image,Button,Card,Form} from "react-bootstrap";
import {addItem, remItem} from  '../actions/cartActions.js'
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
        history.push('/payment')
    }
    return(
        <Row>
            <Col md={6}>
                <div className='subtitle'>
                     <h3>Продолжить покупку</h3>
                </div>
                {cartItems.length ===0?<h3>Пусто</h3>:(
                    <Card>
                    <ListGroup variant='flush'>
                        {cartItems.map(itm => (
                            <ListGroup.Item key={itm.caps}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={itm.picture} alt={itm.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/capsule/${itm.caps}`}>{itm.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {itm.price} ₽
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={()=>removeItem(itm.Capsule)}>
                                            <i className='delett'>Удалить</i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </Card>)}
            </Col>
            <Col md={8}>
                    <ListGroup variant='flush' className='subtitle'>
                        <ListGroup.Item>
                            <h5 className='subtitle'>
                                Общая сумма - {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)} ₽
                            </h5>
                            <Button type='button' className="btn-dark">
                                Купить
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
            </Col>
        </Row>
    )
}
export default Cart_card