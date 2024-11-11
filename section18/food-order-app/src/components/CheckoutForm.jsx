import { forwardRef } from 'react';
import Input from './Input';
import { isValidEmail } from '../util';

const CheckoutForm = forwardRef(function CheckoutForm({ cartTotal }, ref) {
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
                validationFn={isValidEmail}
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
