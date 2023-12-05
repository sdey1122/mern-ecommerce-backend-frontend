const productsInitialState = {
    isLoading: false,
    data:  [],
    errors: {}
}

const productsReducer = (state = productsInitialState, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS': {
            return {...state, data: [...action.payload]}
        }
        case 'ADD_PRODUCT': {
            return {...state, data: [...state.data, {...action.payload}]}
        }
        case 'UPDATE_PRODUCT': {
            const result = state.data.map((product) => {
                if(product._id === action.payload._id){
                    return {...product, ...action.payload}
                } else {
                    return {...product} 
                }
            })
            return {...state, data: [...result]} 
        }
        case 'REMOVE_PRODUCT': {
            const result = state.data.filter((product) => {
                return product._id !== action.payload
            })
            return {...state, data: [...result]}
        }
        default: {
            return {...state}
        }
    }
}

export default productsReducer 