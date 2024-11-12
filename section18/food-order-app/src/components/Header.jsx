import { useContext } from 'react';

import img from '../assets/logo.jpg';
import { CartContext } from '../store/cart-context';
import { ModalContext } from '../store/modal-context';

const Header = () => {
    const { totalItems } = useContext(CartContext);
    const { openModal } = useContext(ModalContext);

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={img} alt='Dinner plate with view of city.' />
                REACTFOOD
            </div>
            <button onClick={openModal} className='text-button'>
                Cart ({totalItems})
            </button>
        </header>
    );
};

export default Header;
