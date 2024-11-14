import { useState } from 'react';

const Input = ({
    id,
    label,
    name,
    type = 'text',
    validationFn,
    validationMsg,
    ...props
}) => {
    const [isValid, setIsValid] = useState(true);
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setValue(value);
        setIsValid(true);
    };

    const handleBlur = () => {
        if (validationFn) {
            if (!validationFn(value)) {
                setIsValid(false);
            } else {
                setIsValid(true);
            }
        }
    };

    return (
        <div className='control'>
            <label htmlFor={id} className={`${!isValid ? 'invalid-text' : ''}`}>
                {label} {props.required && '(required)'}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                className={`${!isValid ? 'invalid' : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                {...props}
            />
            {!isValid && <p className='invalid-text'>{validationMsg}</p>}
        </div>
    );
};

export default Input;
