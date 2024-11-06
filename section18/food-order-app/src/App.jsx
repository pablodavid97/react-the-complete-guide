import { useState, useEffect } from 'react';

import Header from './components/Header';
import Products from './components/Products';

import { fetchMeals } from './util';

function App() {
    const [products, setProducts] = useState([]);
    const [productFetchError, setProductFetchError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState({});

    const addProductToCart = (product) => {
        setCart((prev) => ({ ...prev, [product.id]: { product, qnty: 1 } }));
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

    console.log('products: ', products);
    console.log('cart: ', cart);

    return (
        <>
            <Header cart={cart} />
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
