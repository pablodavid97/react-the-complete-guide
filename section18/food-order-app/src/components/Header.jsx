import { useContext } from 'react';

import img from '../assets/logo.jpg';
import { CartContext } from '../store/cart-context';

const Header = ({ onOpenCart }) => {
    const { totalItems } = useContext(CartContext);

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={img} alt='Dinner plate with view of city.' />
                REACTFOOD
            </div>
            <button onClick={onOpenCart} className='text-button'>
                Cart ({totalItems})
            </button>
        </header>
    );
};

export default Header;
