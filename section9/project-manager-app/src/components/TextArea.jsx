import { forwardRef } from 'react';
import styles from './InputGroup.module.css';

const TextArea = forwardRef(({ label, ...props }, ref) => {
    return (
        <div className={styles['input-group']}>
            <label>{label}</label>
            <textarea ref={ref} {...props} />
        </div>
    );
});

export default TextArea;
