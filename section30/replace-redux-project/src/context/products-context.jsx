import { createContext, useState } from 'react';

export const ProductsContext = createContext({
    products: [],
    toggleFav: (id) => {},
});

const PrdouctsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([
        {
            id: 'p1',
            title: 'Red Scarf',
            description: 'A pretty red scarf.',
            isFavorite: false,
        },
        {
            id: 'p2',
            title: 'Blue T-Shirt',
            description: 'A pretty blue t-shirt.',
            isFavorite: false,
        },
        {
            id: 'p3',
            title: 'Green Trousers',
            description: 'A pair of lightly green trousers.',
            isFavorite: false,
        },
        {
            id: 'p4',
            title: 'Orange Hat',
            description: 'Street style! An orange hat.',
            isFavorite: false,
        },
    ]);

    const toggleFav = (productId) => {
        setProducts((prevList) => {
            const prodIndex = prevList.findIndex((p) => p.id === productId);
            const newFavStatus = !prevList[prodIndex].isFavorite;
            const updatedProducts = [...prevList];
            updatedProducts[prodIndex] = {
                ...prevList[prodIndex],
                isFavorite: newFavStatus,
            };
            return updatedProducts;
        });
    };

    const ctxValue = {
        products,
        toggleFav,
    };

    return (
        <ProductsContext.Provider value={ctxValue}>
            {children}
        </ProductsContext.Provider>
    );
};

export default PrdouctsContextProvider;
