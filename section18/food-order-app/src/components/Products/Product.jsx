import { useContext } from 'react';
import { CartContext } from '../../store/cart-context';
import Button from '../UI/Button';

const Product = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);

    const handleAddItemToCart = () => {
        addItemToCart(product);
    };

    return (
        <li className='meal-item'>
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
                    onClick={handleAddItemToCart}
                >
                    Add to Cart
                </Button>
            </article>
        </li>
    );
};

export default Product;
