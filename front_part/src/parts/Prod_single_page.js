import Capsules from '../Capsules'
import {Link} from 'react-router-dom'
import './Prod_card'
import {Image, ListGroup, Card, Row, Col} from 'react-bootstrap'

const Prod_single_page = ({ match }) => {
    const capsule = Capsules.find(i=>i._id === Number.parseInt(match.params.id))
       // console.log(capsule)
    return(
        <>
            <Link to='/' className='back'>Назад</Link>
            <p className='subtitle'><h3>{capsule.name}</h3></p>
            <Image className='w-25' src={capsule.picture} alt={capsule.name}></Image>

        </>
    )
}

export default Prod_single_page