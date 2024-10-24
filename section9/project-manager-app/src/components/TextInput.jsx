import { forwardRef } from 'react';
import styles from './InputGroup.module.css';

const TextInput = forwardRef(({ label, validation, ...props }, ref) => {
    return (
        <div
            className={`${styles['input-group']} ${
                !validation.isValid ? styles['invalid'] : ''
            }`}
        >
            <label>{label}</label>
            <input ref={ref} type='text' {...props} />
            {!validation.isValid && <span>{validation.message}</span>}
        </div>
    );
});

export default TextInput;
