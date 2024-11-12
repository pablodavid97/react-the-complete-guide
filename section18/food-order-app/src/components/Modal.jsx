import { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../store/modal-context';

const Modal = forwardRef(function Modal({ children, submitBtnText }, ref) {
    const dialog = useRef();
    const { handleModalSubmit, handleModalClose, disableModal } =
        useContext(ModalContext);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            },
        };
    });

    return createPortal(
        <dialog className='modal' ref={dialog}>
            {children}
            <form method='dialog' className='modal-actions'>
                <button className='text-button' onClick={handleModalClose}>
                    Close
                </button>
                <button
                    type='button'
                    onClick={handleModalSubmit}
                    className={`button ${disableModal ? 'disabled' : ''}`}
                    disabled={disableModal}
                >
                    {submitBtnText}
                </button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default Modal;
