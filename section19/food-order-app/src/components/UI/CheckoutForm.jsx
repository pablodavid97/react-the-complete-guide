import { forwardRef, useContext } from 'react';
import Input from './Input';
import { isValidEmail } from '../../util';
import { CartContext } from '../../store/cart-context';
import { ModalContext } from '../../store/modal-context';

const CheckoutForm = forwardRef(function CheckoutForm(_, ref) {
    const { cartTotal } = useContext(CartContext);
    const { setDisableModal } = useContext(ModalContext);

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
            <Input id='name' label='Full Name' name='name' required />
            <Input
                id='email'
                label='E-Mail Address'
                type='email'
                name='email'
                validationFn={handleEmailValidation}
                validationMsg='Please enter a valid email address.'
                required
            />

            <Input id='street' label='Street' name='street' required />

            <div className='control-row'>
                <Input
                    id='postalCode'
                    label='Postal Code'
                    name='postal-code'
                    required
                />
                <Input id='city' label='City' name='city' required />
            </div>
        </form>
    );
});

export default CheckoutForm;
