import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal(
    { children, onClose, submitBtnText, onSubmit, disableSubmit },
    ref
) {
    const dialog = useRef();

    console.log('disable submit: ', disableSubmit);

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
                <button className='text-button' onClick={onClose}>
                    Close
                </button>
                <button
                    type='button'
                    onClick={onSubmit}
                    className={`button ${disableSubmit ? 'disabled' : ''}`}
                    disabled={disableSubmit}
                >
                    {submitBtnText}
                </button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default Modal;
