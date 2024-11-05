import { useState } from 'react';
import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';

export default function LoginState() {
    const [input, setInput] = useState({
        email: '',
        password: '',
    });
    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false,
    });
    // const [enteredEmail, setEnteredEmail] = useState();
    // const [enteredPassword, setEnteredPassword] = useState();

    // const handleEmailChange = (event) => {
    //     setEnteredEmail(event.target.value);
    // };

    // const handlePwdChange = (event) => {
    //     setEnteredPassword(event.target.value);
    // };

    const isEmailValid =
        (isEmail(input.email) && isNotEmpty(input.email)) || !didEdit.email;
    const isValidPassowrd =
        (isNotEmpty(input.password) && hasMinLength(input.password, 6)) ||
        !didEdit.password;

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));

        setDidEdit((prev) => ({
            ...prev,
            [name]: false,
        }));
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Submitted!');
        console.log('user email: ', input.email);
        console.log('user password: ', input.password);
    }

    const handleInputBlur = (event) => {
        const { name } = event.target;

        setDidEdit((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className='control-row'>
                <Input
                    label='email'
                    id='email'
                    type='email'
                    name='email'
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={input.email}
                    error={!isEmailValid}
                    errorMsg='Please enter a valid email address'
                />
                <Input
                    label='password'
                    id='password'
                    type='password'
                    name='password'
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={input.password}
                    error={!isValidPassowrd}
                    errorMsg={'Password length must be greater or equal to 6'}
                />
            </div>

            <p className='form-actions'>
                <button type='button' className='button button-flat'>
                    Reset
                </button>
                <button type='submit' className='button'>
                    Login
                </button>
            </p>
        </form>
    );
}
