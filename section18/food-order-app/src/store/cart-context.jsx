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

// TODO: Replace state handling with reducers...
export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState({});
    const [totalItems, setTotalItems] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const cartItems = Object.entries(cart);

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

        setTotalItems((prev) => prev + 1);
        setCartTotal((prev) => prev + parseFloat(newProduct.price));
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
        setTotalItems((prev) => prev - 1);
        setCartTotal((prev) => prev - parseFloat(item.product.price));
    };

    const emptyCart = () => {
        setCart({});
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
