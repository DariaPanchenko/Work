import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const Capsule1=({Capsule})=>{
    return(
        <Card className='my-3 p-3 rounded'>
                <img src={Capsule.picture} variant='top' alt={Capsule.picture}/>
            <Card.Body>
                <Card.Title as='div'>
                    <strong>{Capsule.name}</strong>
                </Card.Title>
                <Card.Text as='h6'>{Capsule.descr}</Card.Text>
                <Card.Text as='h6'>Автор: {Capsule.author}</Card.Text>
                <Card.Text as='h6'>{Capsule.contact}</Card.Text>
                <Link to={`/capsule/${Capsule._id}`}>
                    <Card.Title as='div'>
                        <strong> Просмотр и комментарии: {Capsule.countComm}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='h4'>{Capsule.price} ₽</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Capsule1