import imgLogo from '../assets/investment-calculator-logo.png';

const Header = () => (
    <header id='header'>
        <img
            src={imgLogo}
            alt='Logo with money bag and gold coins on the side.'
        />
        <h1>Investment Calculator</h1>
    </header>
);

export default Header;
