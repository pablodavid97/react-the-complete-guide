import img from '../assets/logo.jpg';

const Header = ({ cart }) => {
    console.log('cart: ', cart);
    let totalItems = 0;

    Object.entries(cart).forEach(([, item]) => {
        console.log('item: ', item);
        totalItems += item.qnty;
    });
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
