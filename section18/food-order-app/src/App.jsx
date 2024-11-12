import { useState, useEffect, useContext } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Modal from './components/Modal';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import { ModalContext } from './store/modal-context';

import { fetchMeals, submitOrder } from './http';

// TODO: move use effects into useFetch hook
function App() {
    const [products, setProducts] = useState([]);
    const [hasError, setHasError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { modalRef, formRef, modalType, order } = useContext(ModalContext);

    useEffect(() => {
        const retrieveMeals = async () => {
            setHasError(null);
            setIsLoading(true);
            try {
                const data = await fetchMeals();
                setProducts(data);
            } catch (error) {
                setHasError({
                    message: error.message || 'error fetching data',
                });
            }
            setIsLoading(false);
        };
        retrieveMeals();
    }, []);

    // TODO: This should be improved... only should be called when submit button is pressed, not when order changes.
    useEffect(() => {
        const submitCheckoutForm = async () => {
            if (!order) return;
            setHasError(null);
            setIsLoading(true);
            try {
                await submitOrder(order);
            } catch (error) {
                console.log('error: ', error);
                setHasError({
                    message: error.message || 'Error when creating order.',
                });
            }
            setIsLoading(false);
        };
        submitCheckoutForm();
    }, [order]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasError(null);
        }, [1000]);

        return () => {
            clearTimeout(timer);
        };
    }, [hasError]);

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
                {modalType === 'checkout' && <CheckoutForm ref={formRef} />}
            </Modal>
            <Header />
            <main className='container'>
                {isLoading && <p>Loading data...</p>}
                {hasError && <p>{hasError.message}</p>}
                {!isLoading && <Products products={products} />}
            </main>
        </>
    );
}

export default App;
