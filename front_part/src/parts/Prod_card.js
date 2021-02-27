import Capsules from '../Capsules';
import {Row,Col} from 'react-bootstrap';
import Capsule1 from '../components/Capsule1'
import './Prod_card.css'

const Prod_card = () =>{
    return(
        <>
           <p className='subtitle'> <h2>Доступные подборки</h2></p>
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