import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { startGetCart } from '../../actions/cartActions'
import Heading from '../reusables/Heading'
import CartList from "./CartList"

const Cart = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetCart())
    }, [])

    const userId = useSelector((state) => {
        return state.customer.data._id
    }) 

    const cartData = useSelector((state) => {
        return state.cart.data
    })
    const result = cartData.filter((item) => {
        return item.userId._id === userId
    })
    console.log('cdd', result)

    return (
        <div className="container">
            { result.length > 0 ? (
                <>
                    <Heading
                        className="my-5"
                        type="h3"
                        title={`My Cart - ${result.length}`}
                    />
                    <CartList/>
                </>
            ) : (
                <h4 className="mt-5">No Cart Items. Add Products to Cart. <Link className="" to="/products">Click here</Link></h4>
            )}
        </div>
    )
}

export default Cart