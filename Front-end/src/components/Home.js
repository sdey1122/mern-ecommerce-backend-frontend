import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ProductList from './products-module/ProductsList'
import Heading from './reusables/Heading'
import {startGetProducts} from '../actions/productsAction'

const Home = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetProducts())
    }, [])
    
    return (
        <div className='container'>
            <ProductList/>
        </div> 
    )
}

export default Home