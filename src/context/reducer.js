const cartReducer = (state, action) => {

    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart,
                {
                    ...action.payload,
                    quantity: 1
                }]
            }
        case "REMOVE_FROM_CART":
            return {
                ...state, cart: [...state.cart.filter((cartItem) => {
                    return cartItem.id !== action.payload
                })]
            }
        case 'CHANGE_CART_QTY':
            return {
                ...state,
                cart: [...state.cart
                    .filter(item => item.id === action.payload.id ?
                        item.quantity = action.payload.quantity :
                        item.quantity)]
            }
        default:
            return state;
    }

}

export default cartReducer

export const productreducer = (state, action) => {
    switch (action.type) {
        case 'SORT_BY_PRICE':
            return { ...state, sort: action.payload }
        case 'FILTER_BY_STOCK':
            return { ...state, byStock: !state.byStock }
        case 'FILTER_BY_FASTDELIVERY':
            return { ...state, byFastDelivery: !state.byFastDelivery }
        case 'FILTER_BY_RATING':
            return { ...state, byRating: action.payload }
        case 'FILTER_BY_SEARCHQUERY':
            return { ...state, searchQuery: action.payload }
        case 'CLEAR_FILTERS':
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: "",
                sort: ""
            }
        default:
            return state;
    }
}
