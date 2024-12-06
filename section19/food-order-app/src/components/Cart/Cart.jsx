import { useContext } from 'react';
import { CartContext } from '../../store/cart-context';
import CartItem from './CartItem';

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
                        {cartItems.map(([key, item]) => (
                            <CartItem
                                key={key}
                                item={item}
                                onIncrease={addItemToCart}
                                onDecrease={removeItemFromCart}
                            />
                        ))}
                    </ul>
                    <div className='cart-total'>${cartTotal.toFixed(2)}</div>
                </>
            )}
        </div>
    );
};

export default Cart;
