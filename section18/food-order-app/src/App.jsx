import { useContext, useEffect, useState } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Modal from './components/Modal';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import { ModalContext } from './store/modal-context';
import useFetch from './hooks/useFetch';

import { fetchMeals, submitOrder } from './http';

function App() {
    const { modalRef, formRef, modalType, order, modalError } =
        useContext(ModalContext);

    const {
        data: products,
        error: fetchingProductsError,
        isLoading: loadingProducts,
    } = useFetch(fetchMeals);

    const {
        success,
        error: submitOrderError,
        isLoading: loadingSubmitOrder,
    } = useFetch(submitOrder, { method: 'POST', data: order });

    const isLoading = loadingProducts || loadingSubmitOrder;
    let hasError = fetchingProductsError
        ? { message: fetchingProductsError.message }
        : null;

    if (submitOrderError) {
        hasError = { message: submitOrderError.message };
    }

    return (
        <>
            <Modal
                ref={modalRef}
                submitBtnText={`${
                    modalType === 'cart'
                        ? 'Proceed To Checkout'
                        : 'Submit Order'
                }`}
                hasError={modalError}
            >
                {modalType === 'cart' && <Cart />}
                {modalType === 'checkout' && <CheckoutForm ref={formRef} />}
            </Modal>
            <Header />
            <main className='container'>
                {success && <p className='success'>{success.message}</p>}
                {isLoading && <p>Loading data...</p>}
                {hasError && <p className='error-msg'>{hasError.message}</p>}
                {!isLoading && <Products products={products} />}
            </main>
        </>
    );
}

export default App;
