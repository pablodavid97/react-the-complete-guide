import styles from './InputGroup.module.css';

const DatePicker = ({ label, value, onChange, validation, required }) => {
    return (
        <div
            className={`${styles['input-group']} ${
                !validation.isValid ? styles['invalid'] : ''
            }`}
        >
            <label>{label}</label>
            <input
                type='date'
                value={value}
                onChange={onChange}
                required={required}
            />
            {!validation.isValid && <span>{validation.message}</span>}
        </div>
    );
};

export default DatePicker;
