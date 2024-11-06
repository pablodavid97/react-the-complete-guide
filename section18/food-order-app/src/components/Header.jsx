import img from '../assets/logo.jpg';

const Header = ({ cart }) => {
    console.log('cart: ', cart);
    const totalItems = Object.values(cart).length;
    return (
        <header id='main-header'>
            <div id='title'>
                <img src={img} alt='Dinner plate with view of city.' />
                REACTFOOD
            </div>
            <button className='text-button'>Cart ({totalItems})</button>
        </header>
    );
};

export default Header;
