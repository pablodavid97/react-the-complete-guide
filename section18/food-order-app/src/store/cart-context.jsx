import { createContext, useState } from 'react';

export const CartContext = createContext({
    cartItems: [],
    cart: {},
    cartTotal: 0,
    totalItems: 0,
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    emptyCart: () => {},
});

export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState({});
    const cartItems = Object.entries(cart);
    let cartTotal = 0;
    let totalItems = 0;

    cartItems.forEach(([, item]) => {
        cartTotal += item.qnty * item.product.price;
        totalItems += item.qnty;
    });

    const addItemToCart = (newProduct) => {
        const product = cart[newProduct.id];

        if (product) {
            setCart((prev) => ({
                ...prev,
                [newProduct.id]: {
                    product: newProduct,
                    qnty: product.qnty + 1,
                },
            }));
        } else {
            setCart((prev) => ({
                ...prev,
                [newProduct.id]: { product: newProduct, qnty: 1 },
            }));
        }
    };

    const removeItemFromCart = (productId) => {
        const item = cart[productId];

        if (item.qnty === 1) {
            const { [productId]: _, ...newCart } = cart;
            setCart(newCart);
        } else {
            setCart((prev) => ({
                ...prev,
                [productId]: {
                    product: item.product,
                    qnty: item.qnty - 1,
                },
            }));
        }
    };

    const emptyCart = () => {
        setCart({});
    };

    const ctxValue = {
        cartItems: cartItems,
        cart: {},
        cartTotal: cartTotal,
        totalItems: totalItems,
        addItemToCart,
        removeItemFromCart,
        emptyCart,
    };

    return (
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}
