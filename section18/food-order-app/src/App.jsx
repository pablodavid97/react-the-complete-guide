import { useState, useEffect, useRef, useContext } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Modal from './components/Modal';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import { CartContext } from './store/cart-context';

import { fetchMeals, submitOrder } from './http';

function App() {
    const [products, setProducts] = useState([]);
    const [productFetchError, setProductFetchError] = useState();
    const [orderCreationError, setOrderCreationError] = useState();
    const [loadingProducts, setloadingProducts] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [modalType, setModalType] = useState('cart');
    const [order, setOrder] = useState();
    const modalRef = useRef();
    const formRef = useRef();
    const { cart, emptyCart, totalItems } = useContext(CartContext);
    const disableSubmit = totalItems === 0 || !order;

    useEffect(() => {
        const retrieveMeals = async () => {
            setloadingProducts(true);
            try {
                const data = await fetchMeals();
                setProducts(data);
            } catch (error) {
                setProductFetchError({
                    message: error.message || 'error fetching data',
                });
            }
            setloadingProducts(false);
        };
        retrieveMeals();
    }, []);

    useEffect(() => {
        const submitCheckoutForm = async () => {
            setLoadingOrder(true);
            if (order) {
                try {
                    await submitOrder(order);
                    emptyCart();
                    setModalType('cart');
                } catch (error) {
                    setOrderCreationError({
                        message: error.message || 'Error when creating order.',
                    });
                }
                modalRef.current.close();
            }
            setLoadingOrder(false);
        };
        submitCheckoutForm();
    }, [order]);

    const openCart = () => {
        modalRef.current.open();
    };

    const handleModalSubmit = (event) => {
        event.preventDefault();
        if (modalType === 'cart') {
            setModalType('checkout');
        }

        if (modalType === 'checkout') {
            if (formRef.current) {
                const formData = new FormData(formRef.current);
                const data = Object.fromEntries(formData.entries());

                setOrder({
                    customer: data,
                    items: cart,
                });
            }
        }
    };

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
                onClose={handleModalClose}
                disableSubmit={disableSubmit}
            >
                {modalType === 'cart' && <Cart />}
                {modalType === 'checkout' && (
                    <CheckoutForm
                        ref={formRef}
                        isLoading={loadingOrder}
                        hasError={orderCreationError}
                    />
                )}
            </Modal>
            <Header onOpenCart={openCart} />
            <main className='container'>
                <Products
                    products={products}
                    hasError={productFetchError}
                    isLoading={loadingProducts}
                />
            </main>
        </>
    );
}

export default App;
