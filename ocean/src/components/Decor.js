import React from 'react'
import {useEffect} from 'react'
import './decor.css'
import coral from './coral2.png'

const Decor = ({goal}) => {

    return (
        <div >
            <img src={coral} className="decoration"/>
        </div>
    )


}

export default Decor;