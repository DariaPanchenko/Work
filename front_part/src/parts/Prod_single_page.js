import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Prod_card'
import {Image} from 'react-bootstrap'
import axios from 'axios'

const Prod_single_page = ({ match }) => {
   // const capsule = Capsules.find(i=>i._id === Number.parseInt(match.params.id))
       // console.log(capsule)
    const [capsule, setCapsule]=useState([])
    useEffect(()=>{
        const fetchCapsule = async()=>{
            const {data}= await axios.get(`/api/capsules/${match.params.id}`)
            setCapsule(data)
        }
        fetchCapsule()
    },[match])
    return(
        <>
            <Link to='/' className='back'>Назад</Link>
            <div className='subtitle'>
                <h3>{capsule.name}</h3>
            </div>
            <Image className='w-25' src={capsule.picture} alt={capsule.name}></Image>

        </>
    )
}

export default Prod_single_page