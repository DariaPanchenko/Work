import {Row,Col} from 'react-bootstrap'
import Capsule1 from '../components/Capsule1'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {allCpsles} from '../actions/capsuleActions'
import './Prod_card.css'

const Prod_card = () =>{
   // const [Capsules, setCapsules]=useState([])
    const dispatch = useDispatch()
    const allCapsules = useSelector(state =>state.allCapsules)
    const  {error,Capsules} = allCapsules
    useEffect(()=>{
        dispatch(allCpsles())
    },[dispatch])
    return(
        <>
        <div className='subtitle'>
            <h2>Доступные подборки</h2>
        </div>
        {Capsules?<Row>
        {Capsules.map(capsule =>(
            <Col  key={capsule._id}sm={3} md={6} lg={3} xl={4}>
                <Capsule1 Capsule={capsule}/>
            </Col>
        ))}
        </Row>:<h2>{error}</h2>}
        </>
    )
}

export default Prod_card