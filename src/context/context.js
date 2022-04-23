import React, { createContext, useContext, useReducer, useState } from 'react'
import { faker } from '@faker-js/faker';
import cartReducer, { productreducer } from './reducer';

faker.seed(100)

const CartContext = createContext()

const Context = ({ children }) => {
    const items = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.image(),
        inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    }))

    const [state, dispatch] = useReducer(cartReducer, {
        productsArray: items,
        cart: []
    })

    const [productstate, productdispatch] = useReducer(productreducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ""
    })

    return (
        <CartContext.Provider value={{ state, dispatch, productstate, productdispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}

export default Context
