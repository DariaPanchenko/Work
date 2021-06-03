import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {allCpsles, delCapsule, MadeNewCapsule} from '../actions/capsuleActions'
import actionTypes from '../reducers/actionTypes'
import {Button, Row, Col, Card, ListGroup} from 'react-bootstrap'
import './Prod_card'

const ProdALL_page = ({history}) =>{
    const dispatch = useDispatch()
    const allCapsules = useSelector(state=>state.allCapsules)
    const {broadcast,error,Capsules} = allCapsules

    const CapsuleDel = useSelector(state=>state.CapsuleDel)
    const {broadcast:broadcastDel ,error: errorDel ,success: successDel} = CapsuleDel
    const CapsuleMadeNew = useSelector(state=>state.CapsuleMadeNew)
    const {broadcast:broadcastMadeNew ,error: errorMadeNew ,success: successMadeNew, capsule: OkNewCapsule} = CapsuleMadeNew

    const userLog = useSelector(state => state.userLog)
    const {uInf} = userLog

    useEffect(()=>{
        dispatch({type: actionTypes.CAPSULE_MADE_NEW_RESET})
        if(!uInf.admin){
            history.push('/login')
        }

        if(successMadeNew){
            history.push(`/admin/capsule/${OkNewCapsule._id}/change`)
        }else {
            dispatch(allCpsles())
        }
    },[dispatch, history, uInf,successDel, successMadeNew,OkNewCapsule])

    const createCapsHandler=()=>{
       dispatch(MadeNewCapsule())
    }
    const deleteHandler=(id)=>{
        dispatch(delCapsule(id))
    }
    return(
        <>{broadcastDel && <h4>Загрузка...</h4>}
            {errorDel && <h4>{errorDel}</h4>}
            {broadcastMadeNew && <h4>Загрузка...</h4>}
            {errorMadeNew && <h4>{errorMadeNew}</h4>}
            {broadcast?<h4>Загрузка...</h4>:error?<h4>{error}</h4>:(
            <Row>
                <Col md={8} className="mx-auto">
                    <Card>
                        <img className="card-img" src={'../../pic/fon.png'} alt="fon"/>
                        <div className="card-img-overlay">
                            <ListGroup variant='flush'>
                                <div>
                                    <h2 className="userAll__title"> Подборки</h2>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-secondary"  onClick={createCapsHandler}>Создать новую</button>
                                </div>
                                <div className="scroll__pgU">
                                    {Capsules.map(capsule=>(
                                        <div key={capsule._id}>
                                            <div className="hr">
                                            </div>
                                            <div>
                                                <h5 className="userAll__descr" >ID подборки: {capsule._id}</h5>
                                            </div>
                                            <div>
                                                <h5 className="userAll__descr">ID создателя: {capsule.user}</h5>
                                            </div>
                                            <div>
                                                <h5 className="userAll__descr">Название: {capsule.name}</h5>
                                            </div>
                                            <div>
                                                <h5 className="userAll__descr">Цена: {capsule.price} ₽</h5>
                                            </div>
                                            <div>
                                                <h5 className="userAll__descr">Автор: {capsule.author}</h5>
                                            </div>
                                            <div>
                                                <h5 className="userAll__descr">Ссылка: {capsule.link}</h5>
                                            </div>
                                            <div>
                                                <Button variant='light' className='btn-sm' onClick={() => deleteHandler(capsule._id)}><h6>Удалить</h6>
                                                </Button>
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
export default ProdALL_page