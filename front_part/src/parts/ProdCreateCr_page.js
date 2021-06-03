import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {cpslesSingle} from '../actions/capsuleActions'
import {Form, Button, Row, Col, Card} from 'react-bootstrap'
import {SetCapsule} from '../actions/capsuleActions'
import actionTypes from '../reducers/actionTypes'
import './Prod_card'

const ProdCreateCr_page = ({match, history}) =>{
    const capsuleId = match.params.id
    const [name, newName] = useState('')
    const [price,newPrice] = useState(0)
    const [picture, newPicture] = useState('')
    const [author, newAuthor] = useState('')
    const [contact,newContact] = useState('')
    const [link,newLink] = useState('')
    const [descr,newDescr] = useState('')


    const dispatch = useDispatch()
    const capsuleSingle = useSelector(state => state.capsuleSingle)
    const {broadcast,error,capsule} = capsuleSingle
    const CapsuleSet = useSelector(state => state.CapsuleSet)
    const {broadcast: broadcastCapsSet,error:errorCapsSet, success: successCapsSet } = CapsuleSet
    useEffect(()=>{
        if(successCapsSet){
            dispatch({type:actionTypes.CAPSULE_SET_RESET})
            history.push('/admin/capsAll')
        } else {
            if(!capsule.name || capsule._id !== capsuleId){
                dispatch(cpslesSingle(capsuleId))
            }  else {
                newName(capsule.name)
                newPrice(capsule.price)
                newAuthor(capsule.author)
                newContact(capsule.contact)
                newLink(capsule.link)
                newDescr(capsule.descr)
            }
        }
    },[dispatch,history,capsuleId,capsule,successCapsSet])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(SetCapsule({ _id: capsule._id,name, price,picture,author,contact,link,descr}))
    }
    return(
        <>
                {broadcastCapsSet && <h3>Загрузка...</h3>}
                {errorCapsSet && <h3>{errorCapsSet}</h3>}
                {broadcast?<h3>Загрузка...</h3>:error?<h3>{error}</h3>:(
                    <Row>
                        <Col md={8} className="mx-auto">
                            <Card>
                                <img className="card-img" src={'/pic/fon.png'} alt="fon"/>
                                <div className="card-img-overlay">
                                    <Form onSubmit={submitHandler}>
                                        <div>
                                            <h2 className="userAll__title">Создать подборку</h2>
                                        </div>
                                        <Row>
                                            <Col md={5}>
                                        <div>
                                            <h6 className="prodCreate__descr">Название подборки</h6>
                                            <input className="form-control prodCreate__inpt" type='name' required placeholder='' value={name} onChange={(e)=>newName(e.target.value)}></input>
                                        </div>

                                        <div>
                                            <h6 className="prodCreate__descr">Цена</h6>
                                            <input className="form-control prodCreate__inpt" type='number' required placeholder='' value={price} onChange={(e)=>newPrice(e.target.value)}></input>
                                        </div>

                                        <div>
                                            <h6 className="prodCreate__descr">Картинка</h6>
                                            <input className="form-control prodCreate__inpt" type='text' required placeholder='' value={picture} onChange={(e)=>newPicture(e.target.value)}></input>
                                        </div>
                                            </Col>
                                            <Col md={5}>
                                        <div>
                                            <h6 className="prodCreate__descr">Автор подборки</h6>
                                            <input className="form-control prodCreate__inpt" type='text' required placeholder='' value={author} onChange={(e)=>newAuthor(e.target.value)}></input>
                                        </div>

                                        <div>
                                            <h6 className="prodCreate__descr">Связь с автором</h6>
                                            <input className="form-control prodCreate__inpt" type='text' required placeholder='' value={contact} onChange={(e)=>newContact(e.target.value)}></input>
                                        </div>

                                        <div>
                                            <h6 className="prodCreate__descr">Ссылка на подборку</h6>
                                            <input className="form-control prodCreate__inpt"type='text' required placeholder='' value={link} onChange={(e)=>newLink(e.target.value)}></input>
                                        </div>

                                        <div>
                                            <h6 className="prodCreate__descr">Описание</h6>
                                            <input className="form-control prodCreate__inpt"  as='textarea'row='3' required placeholder='' value={descr} onChange={(e)=>newDescr(e.target.value)}></input>
                                        </div>
                                            </Col>
                                    </Row>
                                        <div className="prodCreate__for__btn">
                                            <Button type='submit' variant='primary'>Установить</Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                )}
        </>
    )
}
export default ProdCreateCr_page