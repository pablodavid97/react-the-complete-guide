import { createContext, useRef, useState, useContext, useEffect } from 'react';
import { CartContext } from './cart-context';

export const ModalContext = createContext({
    modalRef: null,
    formRef: null,
    openModal: () => {},
    handleModalSubmit: () => {},
    handleModalClose: () => {},
    modalType: 'cart',
    disableModal: false,
    setDisableModal: () => {},
    order: {},
});

const ModalContextProvider = ({ children }) => {
    const modalRef = useRef();
    const formRef = useRef();
    const [modalType, setModalType] = useState('cart');
    const { totalItems, cart, emptyCart } = useContext(CartContext);
    const [order, setOrder] = useState();
    const [disableModal, setDisableModal] = useState(false);
    const [modalError, setModalError] = useState();

    useEffect(() => {
        setDisableModal(totalItems === 0);
    }, [totalItems]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setModalError(null);
        }, [3000]);

        return () => {
            clearTimeout(timer);
        };
    }, [modalError]);

    const handleModalSubmit = (event) => {
        event.preventDefault();
        if (modalType === 'cart') {
            setModalType('checkout');
        }

        if (modalType === 'checkout') {
            if (formRef.current) {
                const formData = new FormData(formRef.current);
                const data = Object.fromEntries(formData.entries());
                let isValid = true;

                for (let [, value] of formData.entries()) {
                    if (value.trim() === '') {
                        isValid = false;
                        break;
                    }
                }
                if (!isValid) {
                    setModalError({
                        message:
                            'Invalid order. Please fill all required fields.',
                    });
                    return;
                }

                setOrder({
                    customer: data,
                    items: cart,
                });
                emptyCart();
                setModalType('cart');
                modalRef.current.close();
            }
        }
    };

    const handleModalClose = () => {
        setModalType('cart');
        modalRef.current.close();
    };

    const openModal = () => {
        modalRef.current.open();
    };

    const ctxValue = {
        modalRef,
        formRef,
        handleModalSubmit,
        handleModalClose,
        openModal,
        modalType,
        disableModal,
        setDisableModal,
        order,
        modalError,
    };

    return (
        <ModalContext.Provider value={ctxValue}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
