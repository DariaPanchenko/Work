import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {allCpsles, MadeNewCapsule} from '../actions/capsuleActions'
import actionTypes from '../reducers/actionTypes'
import {Row, Col, Card, ListGroup} from 'react-bootstrap'
import './Prod_card'

const ProdALLCreator_page = ({history}) =>{
    const dispatch = useDispatch()
    const allCapsules = useSelector(state=>state.allCapsules)
    const {broadcast,error,Capsules} = allCapsules

    const CapsuleMadeNew = useSelector(state=>state.CapsuleMadeNew)
    const {broadcast:broadcastMadeNew ,error: errorMadeNew ,success: successMadeNew, capsule: OkNewCapsule} = CapsuleMadeNew

    const userLog = useSelector(state => state.userLog)
    const {uInf} = userLog

    useEffect(()=>{
        dispatch({type: actionTypes.CAPSULE_MADE_NEW_RESET})
        if(!uInf.newCreator){
            history.push('/login')
        }
        if(successMadeNew){
            history.push(`/creator/capsule/${OkNewCapsule._id}/change`)
        }else {
            dispatch(allCpsles())
        }
    },[dispatch, history, uInf, successMadeNew,OkNewCapsule])

    const createCapsHandler=()=>{
        if(window.confirm('После нажатия OK, подборка будет создана с параметрами по умолчанию, заполняйте поля внимательно, чтобы сохранить в нужном для вас виде!')) {
            dispatch(MadeNewCapsule())
        }
    }
    return(
        <>{broadcastMadeNew && <h4>Загрузка...</h4>}
            {errorMadeNew && <h4>{errorMadeNew}</h4>}
            {broadcast?<h4>Загрузка...</h4>:error?<h4>{error}</h4>:(
                <Row>
                    <Col md={8} className="mx-auto">
                        <Card>
                            <img className="card-img" src={'../../pic/fon.png'} alt="fon"/>
                            <div className="card-img-overlay">
                                <ListGroup variant='flush'>
                                    <div className="scroll__pgU">
                                        <div>
                                            <h2> Подборки</h2>
                                        </div>
                                        <Row>
                                        <Col md={4}>
                                        <div>
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={createCapsHandler}>Создать новую</button>
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6>Чтобы удалить подборку обратитесь к администратору на почту, указав нужный ID подборки.</h6>
                                        </Col>
                                        </Row>
                                        {Capsules.map(capsule=>(
                                            <div key={capsule._id}>
                                                <div className="hr">
                                                </div>
                                                <div>
                                                    <h5>ID подборки: {capsule._id}</h5>
                                                </div>
                                                <div>
                                                    <h5>ID создателя: {capsule.user}</h5>
                                                </div>
                                                <div>
                                                    <h5>Название: {capsule.name}</h5>
                                                </div>
                                                <div>
                                                    <h5>Цена: {capsule.price} ₽</h5>
                                                </div>
                                                <div>
                                                    <h5>Автор: {capsule.author}</h5>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ListGroup>
                            </div>
                        </Card>
                    </Col>
                </Row>)}
        </>
        )
    }
export default ProdALLCreator_page