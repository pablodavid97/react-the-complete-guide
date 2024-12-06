import { useContext } from 'react';

import Header from './components/UI/Header';
import Products from './components/Products/Products';
import Modal from './components/UI/Modal';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/UI/CheckoutForm';
import Snackbar from './components/UI/Snackbar';

import { ModalContext } from './store/modal-context';

import useFetch from './hooks/useFetch';
import { fetchMeals, submitOrder } from './http';

function App() {
    const { modalRef, formRef, modalType, modalError, order } =
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
                {hasError && (
                    <Snackbar message={hasError.message} type='error' />
                )}
                {success && <Snackbar message={success.message} />}
                {isLoading && <p>Loading data...</p>}
                {!isLoading && <Products products={products} />}
            </main>
        </>
    );
}

export default App;
