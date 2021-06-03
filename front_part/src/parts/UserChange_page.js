import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {paramProfile,ChangeUserForAdm} from '../actions/userActions'
import {Form, Button, Row, Col, ListGroup, Card} from 'react-bootstrap'
import actionTypes from '../reducers/actionTypes'
import {LinkContainer} from "react-router-bootstrap";
import './Prod_card'
import {AllOrderGet} from '../actions/paidActions'

const UserChange_page = ({match, history}) =>{
    const usrId = match.params.id
    const [newCreator,setNewCreator] = useState(false)

    const dispatch = useDispatch()
    const userParam = useSelector(state => state.userParam)
    const {broadcast,error,userProf} = userParam

    const userChangeForAdm = useSelector(state => state.userChangeForAdm)
    const {broadcast: broadcastChange ,error:errorChange, success:successChange } = userChangeForAdm

    const userLog = useSelector(state => state.userLog)
    const {uInf} = userLog

    const getAllOrders = useSelector(state=>state.getAllOrders)
    const {broadcast:broadcastAllOrds,error: errorAllOrds,ords} = getAllOrders
    useEffect(()=>{
        if(successChange){
            dispatch({type: actionTypes.USER_CHANGE_FORADM_RESET})
            history.push('/admin/userAll')
        } else{
            if(!userProf.name || userProf._id !== usrId){
                dispatch(paramProfile(usrId))
            }else {
                setNewCreator(userProf.newCreator)
            }
        }
        if(uInf && uInf.admin){
            dispatch(AllOrderGet())
        }else {
            history.push('/login')
        }
    },[dispatch,history,usrId,userProf,successChange,uInf])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(ChangeUserForAdm({_id:usrId,newCreator}))
    }

    return(
           <> <Row>
                   <Col md={4}>
                       <div>
                            <h2 className="userChange__title">Cтатус создателя подборок</h2>
                       </div>
                       {broadcastChange && <h3>Загрузка...</h3>}
                       {errorChange && <h3>{errorChange}</h3>}
                       {broadcast?<h3>Загрузка...</h3>:error?<h3>{error}</h3>:(
                           <Form onSubmit={submitHandler}>
                               <div>
                                   <h5 className="userChange__title">{userProf.name} </h5>
                                   <div className="userCheckbox">
                                       <input className="form-check-input" type='checkbox' label="Создатель подборок"  checked={newCreator} onChange={(e)=>setNewCreator(e.target.checked)}></input>
                                   </div>
                               </div>
                               <div>
                               <Button  className="btn-dark" type='submit' variant='primary'>Обновить</Button>
                               </div>
                           </Form>
                       )}
                   </Col>

                   <Col md={8} className="mx-auto">
                       <Card>
                           <img className="card-img" src={'/pic/fon.png'} alt="fon"/>
                           <div className="card-img-overlay">
                               <ListGroup variant="flush">
                                   <h3 className="userChange__title" >Заказы всех пользователей</h3>
                                   <div className="scroll__pgUserChange">
                                       {broadcastAllOrds?(<h3>Загрузка...</h3>):errorAllOrds?(<h3>{errorAllOrds}</h3>):(
                                           ords.map((ord) => (
                                               <div key={ord._id} className="edit__UserChange">
                                                   <div className="hr">
                                                   </div>
                                                       <div md={4}>
                                                           <h5 className="userChange__descr">Пользователь: {ord.user && ord.user.name}</h5>
                                                       </div>
                                                       <div>
                                                           <h5 className="userChange__descr">Цена:{ord.allPrice} ₽</h5>
                                                       </div>
                                                       <div>
                                                          <h5 className="userChange__descr"> Оплачено: {ord.paidFinish?(
                                                               ord.datePaid.substring(0, 10)):(<h5>Нет</h5>
                                                           )}</h5>
                                                       </div>
                                                       <div>
                                                           <LinkContainer to={`/order/${ord._id}`}>
                                                               <Button className="btn-sm btn-dark">
                                                                   Посмотреть
                                                               </Button>
                                                           </LinkContainer>
                                                       </div>
                                               </div>
                                           ))
                                       )}
                                   </div>
                               </ListGroup>
                           </div>
                       </Card>
                   </Col>
           </Row>

       </>
    )
}
export default UserChange_page