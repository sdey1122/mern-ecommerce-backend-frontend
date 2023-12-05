const cartInitialState = {
    isLoading: false,
    data: [],
    errors: {}
}

const cartReducer = (state = cartInitialState, action) => {
    switch(action.type) {
        case 'SET_CART': {
            return {...state, data: [...action.payload]}
        }
        case "ADD_CART": {
            return {...state, data: [...state.data, {...action.payload}]}
        }
        case "REMOVE_CART": {
            const result = state.data.filter((item) => {
                return item._id !== action.payload
            })
            return {...state, data: [...result]}
        }
        default: {
            return {...state}
        }
    }
} 

export default cartReducer