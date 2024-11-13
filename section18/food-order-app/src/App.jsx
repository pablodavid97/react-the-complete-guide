import { useContext } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Modal from './components/Modal';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import { ModalContext } from './store/modal-context';
import useFetch from './hooks/useFetch';

import { fetchMeals, submitOrder } from './http';

function App() {
    const { modalRef, formRef, modalType, order } = useContext(ModalContext);

    const {
        data: products,
        error: fetchingProductsError,
        isLoading: loadingProducts,
    } = useFetch(fetchMeals);

    const { error: submitOrderError, isLoading: loadingSubmitOrder } = useFetch(
        submitOrder,
        { method: 'POST', data: order }
    );

    const isLoading = loadingProducts || loadingSubmitOrder;
    const hasError =
        fetchingProductsError || submitOrderError
            ? {
                  message:
                      fetchingProductsError.message || submitOrderError.message,
              }
            : null;

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
