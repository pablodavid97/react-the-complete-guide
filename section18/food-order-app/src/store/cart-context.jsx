import { createContext, useReducer, useState } from 'react';

export const CartContext = createContext({
    cartItems: [],
    cart: {},
    cartTotal: 0,
    totalItems: 0,
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    emptyCart: () => {},
});

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const { newProduct } = action.payload;
        const product = state[newProduct.id];

        if (product) {
            return {
                ...state,
                [newProduct.id]: {
                    product: newProduct,
                    qnty: product.qnty + 1,
                },
            };
        } else {
            return {
                ...state,
                [newProduct.id]: { product: newProduct, qnty: 1 },
            };
        }
    }

    if (action.type === 'REMOVE_ITEM') {
        const { productId } = action.payload;
        const item = state[productId];

        if (item.qnty === 1) {
            const { [productId]: _, ...newCart } = state;
            return newCart;
        } else {
            return {
                ...state,
                [productId]: {
                    product: item.product,
                    qnty: item.qnty - 1,
                },
            };
        }
    }

    if (action.type === 'EMPTY_CART') {
        return {};
    }

    return state;
};

export default function CartContextProvider({ children }) {
    const [cart, cartDispatch] = useReducer(cartReducer, {});
    const [totalItems, setTotalItems] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const cartItems = Object.entries(cart);

    const addItemToCart = (newProduct) => {
        cartDispatch({
            type: 'ADD_ITEM',
            payload: { newProduct },
        });
        setTotalItems((prev) => prev + 1);
        setCartTotal((prev) => prev + parseFloat(newProduct.price));
    };

    const removeItemFromCart = (product) => {
        cartDispatch({
            type: 'REMOVE_ITEM',
            payload: { productId: product.id },
        });
        setTotalItems((prev) => prev - 1);
        setCartTotal((prev) => prev - parseFloat(product.price));
    };

    const emptyCart = () => {
        cartDispatch({
            type: 'EMPTY_CART',
        });
        setCartTotal(0);
        setTotalItems(0);
    };

    const ctxValue = {
        cartItems,
        cart,
        cartTotal,
        totalItems,
        addItemToCart,
        removeItemFromCart,
        emptyCart,
    };

    return (
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}
