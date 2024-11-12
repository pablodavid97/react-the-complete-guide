import { forwardRef, useContext } from 'react';
import Input from './Input';
import { isValidEmail } from '../util';
import { CartContext } from '../store/cart-context';
import { ModalContext } from '../store/modal-context';

const CheckoutForm = forwardRef(function CheckoutForm(
    { isLoading, hasError },
    ref
) {
    const { cartTotal, cart } = useContext(CartContext);
    const { setDisableModal } = useContext(ModalContext);

    console.log('cart: ', cart);

    if (isLoading) {
        return <p>Creating order...Please wait.</p>;
    }

    if (hasError) {
        return <p>{hasError.message}</p>;
    }

    const handleEmailValidation = (email) => {
        const validEmail = isValidEmail(email);

        if (!validEmail) {
            setDisableModal(true);
        } else {
            setDisableModal(false);
        }

        return validEmail;
    };

    return (
        <form ref={ref}>
            <h2>Checkout</h2>
            <p>
                Total Amount: <strong>${cartTotal.toFixed(2)}</strong>
            </p>
            <Input id='name' label='Full Name' name='name' />
            <Input
                id='email'
                label='E-Mail Address'
                type='email'
                name='email'
                validationFn={handleEmailValidation}
                validationMsg='Please enter a valid email address.'
            />

            <Input id='street' label='Street' name='street' />

            <div className='control-row'>
                <Input id='postalCode' label='Postal Code' name='postal-code' />
                <Input id='city' label='City' name='city' />
            </div>
        </form>
    );
});

export default CheckoutForm;
