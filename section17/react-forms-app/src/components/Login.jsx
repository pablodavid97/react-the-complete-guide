import { useRef, useState } from 'react';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isEmailValid, setIsEmailValid] = useState(true);

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Submitted!');

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        const emailIsValid = enteredEmail.includes('@');

        if (!emailIsValid) {
            setIsEmailValid(false);
            return;
        }

        setIsEmailValid(true);
        console.log('Sending HTTP request...');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className='control-row'>
                <div className='control no-margin'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='text' name='email' ref={emailRef} />
                    <div className='control-error'>
                        {!isEmailValid && (
                            <p>Please enter a valid email address.</p>
                        )}
                    </div>
                </div>

                <div className='control no-margin'>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        ref={passwordRef}
                    />
                </div>
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
