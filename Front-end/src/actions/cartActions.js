import axios from "axios"

export const startGetCart = () => {
    return (dispatch) => {
        axios.get('/api/cart', {
            headers: {
                "Token" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('get cart', result)
                dispatch(setCart(result))
            })
            .catch((error) => {
                console.log(error)
            })  
    }
}  

export const setCart = (cartItems) => {
    return {
        type: 'SET_CART',
        payload: cartItems
    }
}

export const startAddToCart = (cartBody, productId) => {
    return (dispatch) => {
        axios.post(`/api/cart/${productId}`, cartBody, {
            headers: {
                "Token" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                // console.log('add', result)
                dispatch(addCart(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const addCart = (cartItem) => {
    return {
        type: "ADD_CART",
        payload: cartItem
    }
}

export const startDeleteCart = (cartId) => {
    return (dispatch) => {
        axios.delete(`/api/cart/${cartId}`, {
            headers: {
                "Token" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                // console.log('del', result)
                dispatch(removeCart(result._id))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const removeCart = (_id) => {
    return {
        type: "REMOVE_CART",
        payload: _id
    }
}