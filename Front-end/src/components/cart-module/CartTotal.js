import React from "react"
import { useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import Heading from "../reusables/Heading"
import Button from '../reusables/Button'

const CartTotal = (props) => {

    const userId = useSelector((state) => {
        return state.customer.data._id
    }) 

    const cartData = useSelector((state) => {
        return state.cart.data
    })

    const result = cartData.filter((item) => {
        return item.userId._id === userId
    })

    const totalPrice = () => {
        let sum = 0
        for(const item of result) {
            sum += Number(item.productId.price)
        }
        return sum
    }

    const price = totalPrice()

    const handleCheckout = () => {
        props.history.push('/user/payment')
    }

    return (
        <>
            <Heading
                className="mt-2 d-flex justify-content-end"
                type="h4"
                title={`Subtotal(${result.length}items) - ${price}`} 
            />

            <div className="d-flex justify-content-end">
                <Button
                    type="button"
                    className="btn btn-outline-success my-3"
                    value="CheckOut"
                    handleClick={ handleCheckout }
                /> 
            </div>
        </>
    )
}

export default withRouter(CartTotal)