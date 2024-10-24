import styles from './InputGroup.module.css';

const DatePicker = ({ label, value, onChange, validation }) => {
    return (
        <div className={styles['input-group']}>
            <label>{label}</label>
            <input type='date' value={value} onChange={onChange} />
            {!validation.isValid && <span>{validation.message}</span>}
        </div>
    );
};

export default DatePicker;
