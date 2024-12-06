const CartItem = ({ item, onIncrease, onDecrease }) => {
    return (
        <li className='cart-item'>
            {item.product.name} - {item.qnty} x ${item.product.price}
            <span className='cart-item-actions'>
                <button onClick={() => onDecrease(item.product)}>-</button>
                {item.qnty}
                <button onClick={() => onIncrease(item.product)}>+</button>
            </span>
        </li>
    );
};

export default CartItem;
