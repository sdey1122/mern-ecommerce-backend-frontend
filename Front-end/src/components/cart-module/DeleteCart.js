import React from "react"
import { useDispatch } from "react-redux"
import Button from '../reusables/Button'
import { startDeleteCart } from "../../actions/cartActions"
import { HiMinusCircle } from "react-icons/hi"

const DeleteCart = (props) => {
    const { _id } = props

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(startDeleteCart(_id))
    }

    return (
        <div onClick={ handleDelete }>
            <HiMinusCircle size="2rem"/>
        </div>
    )
}

export default DeleteCart