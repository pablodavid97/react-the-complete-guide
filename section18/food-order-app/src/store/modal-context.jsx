import { createContext } from 'react';

export const ModalContext = createContext({
    modalRef: null,
    formRef: null,
    handleModalSubmit: () => {},
    handleModalClose: () => {},
    modalType: 'cart',
});

const ModalContextProvider = ({ children }) => {
    const ctxValue = {
        modalRef: null,
        formRef: null,
        handleModalSubmit: () => {},
        handleModalClose: () => {},
        modalType: 'cart',
    };

    return (
        <ModalContext.Provider value={ctxValue}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
