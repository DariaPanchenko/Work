import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import './Prod_card'
import {Button, Image} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {cpslesSingle} from '../actions/capsuleActions'

const Prod_single_page = ({ history, match }) => {
    const capsuleSingle = useSelector(state => state.capsuleSingle)
    const{error, capsule} = capsuleSingle
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(cpslesSingle(match.params.id))
    },[dispatch,match])
    const addToBasket =()=>{
        history.push(`/cart/${match.params.id}`)
    }
    return(
        <>
            <Link to='/' className='back'>Назад</Link>
            {capsule?(<div>
                <div className='subtitle'>
                    <h3>{capsule.name}</h3>
                </div>
                <Image className='w-25' src={capsule.picture} alt={capsule.name}></Image></div>):<h3>{error}</h3>}
                <Button onClick={addToBasket} className='btn-dark w-30' type='button'>Хочу купить</Button>
        </>
    )
}
export default Prod_single_page