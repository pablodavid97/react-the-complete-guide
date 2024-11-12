import { createContext, useRef, useState, useContext, useEffect } from 'react';
import { CartContext } from './cart-context';
import { isValidEmail } from '../util';

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

    useEffect(() => {
        setDisableModal(totalItems === 0);
    }, [totalItems]);

    const handleModalSubmit = (event) => {
        event.preventDefault();
        if (modalType === 'cart') {
            setModalType('checkout');
        }

        if (modalType === 'checkout') {
            if (formRef.current) {
                const formData = new FormData(formRef.current);
                const data = Object.fromEntries(formData.entries());

                console.log('cart: ', cart);
                console.log('data: ', data);

                setOrder({
                    customer: data,
                    items: cart,
                });
            }
            setModalType('cart');
            emptyCart();
            modalRef.current.close();
        }
    };

    const handleModalClose = () => {
        setModalType('cart');
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
    };

    return (
        <ModalContext.Provider value={ctxValue}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
