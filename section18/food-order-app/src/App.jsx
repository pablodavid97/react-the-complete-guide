import { useState, useEffect, useContext } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Modal from './components/Modal';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import { ModalContext } from './store/modal-context';

import { fetchMeals, submitOrder } from './http';

function App() {
    const [products, setProducts] = useState([]);
    const [productFetchError, setProductFetchError] = useState();
    const [orderCreationError, setOrderCreationError] = useState();
    const [loadingProducts, setloadingProducts] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);

    const { modalRef, formRef, modalType, order } = useContext(ModalContext);

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
                } catch (error) {
                    setOrderCreationError({
                        message: error.message || 'Error when creating order.',
                    });
                }
            }
            setLoadingOrder(false);
        };
        submitCheckoutForm();
    }, [order]);

    return (
        <>
            <Modal
                ref={modalRef}
                submitBtnText={`${
                    modalType === 'cart'
                        ? 'Proceed To Checkout'
                        : 'Submit Order'
                }`}
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
            <Header />
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
