import { useContext } from 'react';
import { CartContext } from '../store/cart-context';
import Button from './Button';

const Product = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);

    return (
        <article>
            <img
                src={`http://localhost:3000/${product.image}`}
                alt={product.name}
            />
            <h3>{product.name}</h3>
            <span className='meal-item-price'>${product.price}</span>
            <p className='meal-item-description'>{product.description}</p>
            <Button
                className='meal-item-actions'
                onClick={() => addItemToCart(product)}
            >
                Add to Cart
            </Button>
        </article>
    );
};

export default Product;
