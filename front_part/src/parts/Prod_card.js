import {Row,Col} from 'react-bootstrap'
import Capsule1 from '../components/Capsule1'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Prod_card.css'

const Prod_card = () =>{
    const [Capsules, setCapsules]=useState([])
    useEffect(()=>{
        const fetchCapsules = async()=>{
            const {data}= await axios.get('api/capsules')
            setCapsules(data)
        }
    fetchCapsules()
    },[])

    return(
        <>
            <div className='subtitle'>
               <h2>Доступные подборки</h2>
            </div>
            <Row>
                {Capsules.map(Capsule =>(
                    <Col  sm={3} md={6} lg={3} xl={4}>
                        <Capsule1 Capsule={Capsule}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Prod_card