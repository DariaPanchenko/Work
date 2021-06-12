import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import './Prod_card'
import {Button, Row, Col, Form, ListGroup, Card} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {cpslesSingle, createComm} from '../actions/capsuleActions'
import actionTypes from '../reducers/actionTypes.js'
const Prod_single_page = ({ history, match }) => {
    const [comment, setComment] = useState('')

    const capsuleSingle = useSelector(state => state.capsuleSingle)
    const{error, capsule} = capsuleSingle

    const userLog = useSelector(state=>state.userLog)
    const {uInf} = userLog

    const dispatch= useDispatch()
    const capsuleComm = useSelector((state) => state.capsuleComm)
    const {success: successCapsuleComm, broadcast: broadcastCapsuleComm, error: errorCapsuleComm,} = capsuleComm

    useEffect(()=>{
        if (successCapsuleComm) {
            setComment('')
        }
        if (!capsule._id || capsule._id !== match.params.id) {
            dispatch(cpslesSingle(match.params.id))
            dispatch({ type: actionTypes.CAPSULE_COMM_RESET })
        }
    },[dispatch,match,successCapsuleComm])

    const addToBasket =()=>{
        history.push(`/cart/${match.params.id}`)
    }
    const madeComm = (e) => {
        e.preventDefault()
        dispatch(createComm(match.params.id, { comment,}))
    }
    return(
        <>
            <Row>
                <Col md={6}>
                     {capsule?(<div>
                        <div className="subtitle">
                            <h3>{capsule.name}</h3>
                            <h5>Автор подборки - {capsule.author}</h5>
                        </div>
                         <Card className='my-2 p-2 rounded'>
                         <img className='card-img-top' src={capsule.picture} alt={capsule.name}></img>
                         </Card>
                        <h5 className="subtitle__header">{capsule.descr}</h5></div>):<h3>{error}</h3>}
                    <div>
                         <Button disabled={!uInf} onClick={addToBasket} className='btn-dark w-35 d-block mx-auto' type='button'>Хочу купить</Button>
                     </div>
                </Col>
                <Col md={4} className="clr__background">
                <h5 className="subtitle">Отзывы ({capsule.countComm})</h5>
                 {capsule.comms.length === 0 && <h4>Нет отзывов</h4>}
                    <ListGroup variant='flush' className="clr__background">
                   <div className="scroll__pg">
                          {capsule.comms.map((co) => (
                            <ListGroup.Item  className="clr__background comment__place" key={co._id}>
                                <strong className="text-black-50">{co.name}</strong>
                                <p className="text-black-50">{co.createdAt.substring(0, 10)}</p>
                                <p className="text-white">{co.comment}</p>
                            </ListGroup.Item>
                        ))}
                    </div>
                       
                        <ListGroup.Item className="clr__background">
                            <h5 className="text-black-50">Оставьте отзыв</h5>
                            {successCapsuleComm && (<h4 variant='success'>Отзыв опубликован</h4>)}
                            {errorCapsuleComm && (<h4>{errorCapsuleComm}</h4>)}
                            {uInf ? (
                                <Form onSubmit={madeComm}>
                                    <Form.Group controlId='comment'  className="window__background" >
                                        <Form.Control as='textarea'row='3' value={comment} onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button disabled={broadcastCapsuleComm} className='btn-dark w-30' type='submit' variant='primary'>
                                        Отправить
                                    </Button>
                                </Form>) : (<h4><Link to='/login'>Войдите</Link> чтобы оставить комментарий{' '}</h4>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}
export default Prod_single_page