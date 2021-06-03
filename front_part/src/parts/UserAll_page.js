import {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {AllUsersForAdm, DelUserForAdm} from '../actions/userActions'
import {Button, Row, Col, Card, ListGroup} from 'react-bootstrap'
import './Prod_card'
const UserALL_page = ({history}) =>{
    const dispatch = useDispatch()
    const usersAllForAdm = useSelector(state=>state.usersAllForAdm)
    const {broadcast,error,users} = usersAllForAdm
    const userLog = useSelector(state => state.userLog)
    const {uInf} = userLog

    const userDelForAdm = useSelector(state=>state.userDelForAdm)
    const {success: successDel} = userDelForAdm
    useEffect(()=>{
        if(uInf && uInf.admin){
            dispatch(AllUsersForAdm())
        }else {
            history.push('/login')
        }
    },[dispatch, history, successDel, uInf])

    const deleteHandler=(id)=>{
        dispatch(DelUserForAdm(id))
    }

    return(
        <>
            {broadcast?<h4>Загрузка...</h4>:error?<h4>{error}</h4>:(
            <Row>
                <Col md={8} className="mx-auto">
                    <Card>
                        <img className="card-img" src={'../../pic/fon.png'} alt="fon"/>
                        <div className="card-img-overlay">
                            <ListGroup variant='flush'>
                                <div>
                                    <h2 className="userAll__title"> Зарегистрированные пользователи</h2>
                                </div>
                                <div className="scroll__pgU">
                                {users.map((user)=>(
                                    <div key={user._id}>
                                        <div className="hr">
                                        </div>
                                        <div>
                                            <h5 className="userAll__descr">ID пользователя: {user._id}</h5>
                                        </div>
                                         <div>
                                             <h5 className="userAll__descr">Имя: {user.name}</h5>
                                         </div>
                                        <div>
                                            <h5 className="userAll__descr">Почта: {user.email}</h5>
                                        </div>
                                        <div>
                                            <h5 className="userAll__descr">Права создателя подборок: {user.newCreator?(<h5>Есть</h5>):
                                                (<h5>Нет</h5>)}</h5>
                                        </div>
                                        <div>
                                            <LinkContainer to={`/admin/user/${user._id}/change`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <h6>Изменить/Заказы всех</h6>
                                                </Button>
                                            </LinkContainer>
                                        </div>
                                        <div className="userAll__del">
                                            <Button  variant='light' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <h6>Удалить</h6>
                                            </Button>
                                        </div>

                                    </div>))}
                                    </div>
                            </ListGroup>
                        </div>
                    </Card>
                </Col>
            </Row>)}

        </>
    )
}
export default UserALL_page