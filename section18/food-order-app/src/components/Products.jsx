import { useContext } from 'react';
import { CartContext } from '../store/cart-context';

const Products = ({ products }) => {
    const { addItemToCart } = useContext(CartContext);

    return (
        <ul id='meals'>
            {products.map((product) => {
                return (
                    <li className='meal-item' key={product.id}>
                        <article>
                            <img
                                src={`http://localhost:3000/${product.image}`}
                                alt={product.name}
                            />
                            <h3>{product.name}</h3>
                            <span className='meal-item-price'>
                                ${product.price}
                            </span>
                            <p className='meal-item-description'>
                                {product.description}
                            </p>
                            <button
                                className='meal-item-actions button'
                                onClick={() => addItemToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </article>
                    </li>
                );
            })}
        </ul>
    );
};

export default Products;
