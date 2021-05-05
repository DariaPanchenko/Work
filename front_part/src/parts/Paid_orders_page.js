import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {getOrderId} from '../actions/paidActions.js'


const Paid_orders_page = ({match}) =>{
    const ordId = match.params.id
    const dispatch = useDispatch()

    const orderId = useSelector(state=>state.orderId)
    const {ord, broadcast, error }=orderId
    useEffect(() => {
        dispatch(getOrderId(ordId))
    }, [])

    return(
        <>
            <Row>
                <Col md={8}>
                   
                   <p>{ordId}</p>



                </Col>
            </Row>
        </>
    )
}

export default Paid_orders_page