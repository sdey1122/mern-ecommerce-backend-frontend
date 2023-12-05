import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../reusables/InputField'
import Button from '../reusables/Button'
import Heading from '../reusables/Heading'
import { startCreateProduct, startEditProduct } from '../../actions/productsAction'
import { withRouter } from 'react-router-dom'

const AddProduct = (props) => {
    const { name: productName, price: productPrice, supplierId: prodSupplierID, productId, handleClose } = props

    const [product, setProduct] = useState({
        name: productName ? productName : '',
        price: productPrice ? productPrice : '',
        supplierId: prodSupplierID ? prodSupplierID : '',
        formErrors: {}
    })
    const errors = {}

    const dispatch = useDispatch()

    const suppId = useSelector((state) => {
        return state.supplierLogin.data._id
    })

    console.log(suppId)

    const runValidations = () => {
        // name
        if(product.name.trim().length === 0) {
            errors.name = "Product name can't be blank"
        }
        // price
        if(product.price.trim().length === 0) {
            errors.price = "Price can't be blank"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0) {
            setProduct({...product, formErrors: {}})
            const {name, price, supplierId} = product

            const formData = {
                name,
                price,
                supplierId
            }
 
            const redirect = () => {
                props.history.push('/products')
            }
            const closeModal = () => {
                handleClose()
            }

            if(!productId) {
                dispatch(startCreateProduct(formData, suppId, redirect))
            } else {
                console.log(formData)
                dispatch(startEditProduct(formData, productId, closeModal))
            }
                   
            console.log('fd', formData)
        } else {
            setProduct({...product, formErrors: {...errors}})
        }
    }

    const handleChange = (e) => {
        if(e.target.name === 'name') {
            setProduct({...product, name: e.target.value})
        } else if(e.target.name === 'price') {
            setProduct({...product, price: e.target.value})
        }
    }

    const handleClick = () => {
        props.history.push('/products')
    }

    return (
        <div className='container my-5'>
            { !productId && 
                <Heading
                    className="mb-4"
                    type="h3"
                    title="Add Products"
                /> }
            
            <form onSubmit={ handleSubmit }>
                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <InputField
                            className="form-control"
                            type="text"
                            value={ product.name }
                            handleChange={ handleChange }
                            name="name"
                            placeholder="Enter product name"
                        />
                    </div>
                    { product.formErrors.name && <div className="form-text"> {product.formErrors.name} </div> }
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <InputField
                            className="form-control"
                            type="Number"
                            value={ product.price }
                            handleChange={ handleChange }
                            name="price"
                            placeholder="Enter product price"
                        />
                    </div>
                    { product.formErrors.price && <div className="form-text"> {product.formErrors.price} </div> }
                </div>

                <InputField
                    className="btn btn-outline-primary"
                    type="submit"
                    value= { productId ? "Save Changes" : "Add" }
                />
                
                { productId ?
                    <Button
                    type="button"
                    className="btn btn-outline-secondary mx-4"
                    handleClick={ handleClose }
                    value="Cancel"
                /> : ( 
                    <Button
                        type="button"
                        className="btn btn-outline-secondary mx-4"
                        handleClick={ handleClick }
                        value="Cancel"
                    />
                ) }
            </form>
        </div>
    )
}

export default withRouter(AddProduct)