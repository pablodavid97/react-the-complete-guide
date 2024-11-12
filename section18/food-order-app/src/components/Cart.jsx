import { useContext } from 'react';
import { CartContext } from '../store/cart-context';

const Cart = () => {
    const { cartItems, cartTotal, addItemToCart, removeItemFromCart } =
        useContext(CartContext);

    return (
        <div className='cart'>
            <h2>Your Cart</h2>
            {cartItems.length === 0 && <p>No items have been added yet.</p>}
            {cartItems.length > 0 && (
                <>
                    <ul>
                        {cartItems.map(([key, item]) => {
                            return (
                                <li key={key} className='cart-item'>
                                    {item.product.name} - {item.qnty} x $
                                    {item.product.price}
                                    <span className='cart-item-actions'>
                                        <button
                                            onClick={() =>
                                                removeItemFromCart(key)
                                            }
                                        >
                                            -
                                        </button>
                                        {item.qnty}
                                        <button
                                            onClick={() =>
                                                addItemToCart(item.product)
                                            }
                                        >
                                            +
                                        </button>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className='cart-total'>${cartTotal.toFixed(2)}</div>
                </>
            )}
        </div>
    );
};

export default Cart;
