import axios from "axios"
import swal from 'sweetalert'

export const startGetProducts = () => {
    return (dispatch) => {
        axios.get('/api/product/')   
            .then((response) => {
                const result = response.data
                // console.log('get pro', result)
                dispatch(setProducts(result))
            })
            .catch((error) => {
                console.log(error)
            })  
    }
} 

export const setProducts = (products) => {
    return {
        type: 'SET_PRODUCTS',
        payload: products
    }
}

export const startCreateProduct = (productData, suppId, redirect) => {
    console.log('supplier idd')
    return (dispatch) => {
        axios.post(`/api/product/${suppId}`, productData, {
            headers: {
                "Token" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('add pro', result)
                dispatch(addProduct(result))
                redirect()
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const addProduct = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product
    }
}

export const startEditProduct = (editedData, productId, closeModal) => {
    return (dispatch) => {
        axios.put(`/api/product/${productId}`, editedData, {
            headers: {
                "Token" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('upd res', result)
                closeModal()
                dispatch(updateProduct(result))
            })
            .catch((error) => {
                console.log(error) 
            })
    }
}

export const updateProduct = (result) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: result
    }
}

export const startDeleteProduct= (productId) => {
    return (dispatch) => {
        axios.delete(`/api/product/${productId}`, {
            headers: {
                "Token" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('del prood', result)
                dispatch(removeProduct(result._id))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const removeProduct = (productId) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: productId 
    }
}