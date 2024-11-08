import { useState, useEffect, useRef } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Modal from './components/Modal';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';

import { fetchMeals } from './util';

function App() {
    const [products, setProducts] = useState([]);
    const [productFetchError, setProductFetchError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState({});
    const [modalType, setModalType] = useState('cart');
    const modalRef = useRef();

    const cartItems = Object.entries(cart);
    let cartTotal = 0;
    cartItems.forEach(([, item]) => {
        cartTotal += item.qnty * item.product.price;
    });

    const addProductToCart = (newProduct) => {
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

    useEffect(() => {
        const retrieveMeals = async () => {
            setIsLoading(true);
            try {
                const data = await fetchMeals();
                setProducts(data);
            } catch (error) {
                setProductFetchError({
                    message: error.message || 'error fetching data',
                });
            }
            setIsLoading(false);
        };
        retrieveMeals();
    }, []);

    const openCart = () => {
        modalRef.current.open();
    };

    const handleRemoveItem = (productId) => {
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

    const handleAddItem = (productId) => {
        const item = cart[productId];

        setCart((prev) => ({
            ...prev,
            [productId]: {
                product: item.product,
                qnty: item.qnty + 1,
            },
        }));
    };

    const proceedToCheckout = () => {
        setModalType('checkout');
    };

    console.log('products: ', products);
    console.log('cart: ', cart);

    const handleModalSubmit =
        modalType === 'cart' ? proceedToCheckout : () => {};

    const handleModalClose = () => {
        setModalType('cart');
    };

    return (
        <>
            <Modal
                ref={modalRef}
                submitBtnText={`${
                    modalType === 'cart'
                        ? 'Proceed To Checkout'
                        : 'Submit Order'
                }`}
                onSubmit={handleModalSubmit}
                submitBtnClassName='button'
                onClose={handleModalClose}
                // submitBtnClassName={`button ${
                //     cartItems.length === 0 ? 'disabled' : null
                // }`}
                // disableSubmit={cartItems.length === 0}
            >
                {modalType === 'cart' && (
                    <Cart
                        cartItems={cartItems}
                        onAddItem={handleAddItem}
                        onRemoveItem={handleRemoveItem}
                        cartTotal={cartTotal}
                    />
                )}
                {modalType === 'checkout' && (
                    <CheckoutForm cartTotal={cartTotal} />
                )}
            </Modal>
            <Header cart={cart} onOpenCart={openCart} />
            <main className='container'>
                <Products
                    products={products}
                    hasError={productFetchError}
                    isLoading={isLoading}
                    onAddToCart={addProductToCart}
                />
            </main>
        </>
    );
}

export default App;
