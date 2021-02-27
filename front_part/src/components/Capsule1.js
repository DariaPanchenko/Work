import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Capsule1=({Capsule})=>{
    return(
        <Card className='my-3 p-3 rounded'>
            <Link to={`/capsule/${Capsule._id}`}>
                <Card.Img src={Capsule.picture} variant='top'/>
            </Link>
            <Card.Body>
                <Link to={`/capsule/${Capsule._id}`}>
                    <Card.Title as='div'>
                        <strong>{Capsule.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='h6'>Автор: {Capsule.author}</Card.Text>
                <Card.Text as='h4'>{Capsule.price} ₽</Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Capsule1