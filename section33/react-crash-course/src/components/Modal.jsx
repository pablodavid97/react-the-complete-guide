import { useNavigate } from 'react-router-dom';

import styles from './Modal.module.css';

const Modal = ({ children }) => {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate('..');
    };

    return (
        <>
            <div className={styles.backdrop} onClick={handleClose}></div>
            <dialog open className={styles.modal}>
                {children}
            </dialog>
        </>
    );
};

export default Modal;