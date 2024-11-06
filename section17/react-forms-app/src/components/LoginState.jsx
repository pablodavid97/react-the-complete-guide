import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';
import useInput from '../hooks/useInput';

export default function LoginState() {
    const {
        value: email,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError,
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

    const {
        value: password,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: passwordHasError,
    } = useInput('', (value) => isNotEmpty(value) && hasMinLength(value, 6));

    function handleSubmit(event) {
        event.preventDefault();

        if (emailHasError || passwordHasError) {
            return;
        }

        console.log('Submitted!');
        console.log('user email: ', email);
        console.log('user password: ', password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className='control-row'>
                <Input
                    label='email'
                    id='email'
                    type='email'
                    name='email'
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    value={email}
                    error={emailHasError}
                    errorMsg='Please enter a valid email address'
                />
                <Input
                    label='password'
                    id='password'
                    type='password'
                    name='password'
                    onBlur={handlePasswordBlur}
                    onChange={handlePasswordChange}
                    value={password}
                    error={passwordHasError}
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
