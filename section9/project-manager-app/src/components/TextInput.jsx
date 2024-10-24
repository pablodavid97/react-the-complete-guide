import styles from './InputGroup.module.css';

const TextInput = ({ label, value, onChange, validation, required }) => {
    return (
        <div
            className={`${styles['input-group']} ${
                !validation.isValid ? styles['invalid'] : ''
            }`}
        >
            <label>{label}</label>
            <input
                type='text'
                value={value}
                onChange={onChange}
                required={required}
            />
            {!validation.isValid && <span>{validation.message}</span>}
        </div>
    );
};

export default TextInput;
