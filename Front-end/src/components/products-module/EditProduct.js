import React, { useState } from "react"
import AddProduct from "./AddProduct"
import ModalComp from '../reusables/ModalComp'
import { MdEdit } from "react-icons/md"

const EditProduct = (props) => {
    const { name, price, supplierId, _id } = props

    const [ show, setShow ] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    return (
        <>
            <ModalComp
                showVariant=""
                handleShow={ handleShow }
                showText={<MdEdit size="1.5rem"/>}
                show={ show }
                handleClose={handleClose}
                size="md"
                titleComponent={ <h4 className="ms-3"> Edit Product </h4> }
                bodyComponent={
                    <AddProduct
                        name={ name }
                        price={ price }
                        supplierId={ supplierId }
                        productId = { _id }
                        handleClose={ handleClose }
                    />  
                }
                hideVariant="outline-secondary"
                hideText="close"
            />
        </>
    )
}

export default EditProduct