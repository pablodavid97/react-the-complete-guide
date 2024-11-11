const Cart = ({ cartItems, onAddItem, onRemoveItem, cartTotal }) => {
    console.log('cart items: ', cartItems);

    return (
        <div className='cart'>
            <h2>Your Cart</h2>
            {cartItems.length === 0 && <p>No items have been added yet.</p>}
            {cartItems.length > 0 && (
                <>
                    <ul>
                        {cartItems.map(([key, item]) => {
                            console.log('key: ', key);
                            console.log('item: ', item);
                            return (
                                <li key={key} className='cart-item'>
                                    {item.product.name} - {item.qnty} x $
                                    {item.product.price}
                                    {/* TODO: Add click handlers to update item qnties */}
                                    <span className='cart-item-actions'>
                                        <button
                                            onClick={() => onRemoveItem(key)}
                                        >
                                            -
                                        </button>
                                        {item.qnty}
                                        <button onClick={() => onAddItem(key)}>
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
