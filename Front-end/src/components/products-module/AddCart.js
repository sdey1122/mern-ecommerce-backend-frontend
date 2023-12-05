import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startAddToCart } from '../../actions/cartActions'
import { BsFillCartPlusFill } from "react-icons/bs"

const AddCart = (props) => {
    const { name, price, supplierId, _id } = props
    const dispatch = useDispatch()

    const userId = useSelector((state) => {
        return state.customer.data._id 
    })

    console.log('userId',userId)

    const handleCart = () => {
        const cartBody = {
            name: name,
            price: price,
            supplierId: supplierId,
            productId: _id,
            userId: userId
        }
        dispatch(startAddToCart(cartBody, _id))
    }

    return(
        <div onClick={ handleCart }>
            {<BsFillCartPlusFill size="2rem"/>}
        </div>
    )   
     
}

export default AddCart