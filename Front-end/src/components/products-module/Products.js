import React, {useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProductsList from './ProductsList'
import Heading from '../reusables/Heading'
import { startGetProducts } from '../../actions/productsAction'

const Products = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetProducts())
    }, [])

    const data = useSelector((state) => {
        return [state.supplierLogin.supplierLogin, state.products.data ]
    })

    const [supplierLogin, productsData] = data

    return (
        <div className='container'> 

            <div className="row">
                <div className="col-10 pt-5">
                    <Heading
                        type="h3"
                        title= {`Total Products - ${productsData.length}`}
                    />
                </div>    
                <div className="col-2 pt-5">
                    { supplierLogin && (
                        <Link to="/supplier/products/add" className="btn btn-outline-primary "> New Product </Link>
                    ) }
                </div> 
            </div>
            <ProductsList/>
        </div>
    )
}

export default withRouter(Products)