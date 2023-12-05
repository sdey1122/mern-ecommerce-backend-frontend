import React from "react"
import { useSelector } from "react-redux"
import DeleteCart from "./DeleteCart"
import CartTotal from "./CartTotal"

const CartList = (props) => {

    const userId = useSelector((state) => {
        return state.customer.data._id
    }) 

    const cartData = useSelector((state) => {
        return state.cart.data 
    })
    
    const result = cartData.filter((item) => {
        return item.userId._id === userId
    })

    return (
        <>
            <div className="row mt-5">
                <div className="col-md-12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            { result.map((ele) => {
                                return (
                                    <tr key={ele._id}>
                                        <td>{ele.productId.name}</td>
                                        <td>{ele.productId.price}</td>
                                        <td><DeleteCart {...ele}/></td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </div>
            <CartTotal />                
        </>
    )
}

export default CartList