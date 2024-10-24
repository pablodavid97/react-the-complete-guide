import styles from './InputGroup.module.css';

const TextArea = ({ label, value, onChange }) => {
    return (
        <div className={styles['input-group']}>
            <label>{label}</label>
            <textarea value={value} onChange={onChange} />
        </div>
    );
};

export default TextArea;
