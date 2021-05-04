import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {addItem} from '../actions/cartActions.js'
import {connect, useDispatch, useSelector} from 'react-redux'
import {useEffect} from "react";
import {cpslesSingle} from '../actions/capsuleActions.js'

const Capsule1=({Capsule, addItem, history, match})=>{
    const capsuleSingle = useSelector(state => state.capsuleSingle)
    const{error, capsule} = capsuleSingle
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(cpslesSingle(Capsule._id))
    },[dispatch,match])
   /* const addToBasket =()=>{
        history.push(`/cart/${Capsule._id}`)
    }*/
    return(
        <Card className='my-3 p-3 rounded'>
                <img src={Capsule.picture} variant='top' alt={Capsule.picture}/>
            <Card.Body>
                <Card.Title as='div'>
                    <strong>{Capsule.name}</strong>
                </Card.Title>
                <Card.Text as='h6'>{Capsule.descr}</Card.Text>
                <Card.Text as='h6'>Автор: {Capsule.author}</Card.Text>
                <Card.Text as='h6'>{Capsule.contact}</Card.Text>
                <Link to={`/capsule/${Capsule._id}`}>
                    <Card.Title as='div'>
                        <strong> Просмотр и комментарии: {Capsule.countComm}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='h4'>{Capsule.price} ₽</Card.Text>
            </Card.Body>
        </Card>
    )
}
const mapDispatchToProps = (dispatch) => ({
    addItem: Capsule => dispatch(addItem(Capsule))
});
export default connect(null,mapDispatchToProps)(Capsule1)