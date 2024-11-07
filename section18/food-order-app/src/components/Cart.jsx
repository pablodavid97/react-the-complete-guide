const Cart = ({ cart }) => {
    const cartItems = Object.entries(cart);
    let cartTotal = 0;

    cartItems.forEach(([, item]) => {
        cartTotal += item.qnty * item.product.price;
    });

    console.log('cart items: ', cartItems);

    return (
        <div className='cart'>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map(([key, item]) => {
                    console.log('key: ', key);
                    console.log('item: ', item);
                    return (
                        <li key={key} className='cart-item'>
                            {item.product.name} - {item.qnty} x $
                            {item.product.price}
                            <span className='cart-item-actions'>
                                <button>-</button>
                                {item.qnty}
                                <button>+</button>
                            </span>
                        </li>
                    );
                })}
            </ul>
            <div className='cart-total'>${cartTotal}</div>
            <form method='dialog' className='modal-actions'>
                <button className='text-button'>Close</button>
                <button className='button'>Go to Checkout</button>
            </form>
        </div>
    );
};

export default Cart;
