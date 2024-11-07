import { useState, useEffect, useRef } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Modal from './components/Modal';
import Cart from './components/Cart';

import { fetchMeals } from './util';

function App() {
    const [products, setProducts] = useState([]);
    const [productFetchError, setProductFetchError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState({});
    const modalRef = useRef();

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

    console.log('products: ', products);
    console.log('cart: ', cart);

    return (
        <>
            <Modal ref={modalRef}>
                <Cart cart={cart} />
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
