import { useState, useEffect } from 'react';

const Snackbar = ({ type = 'success', message }) => {
    const [isOpen, setIsOpen] = useState(true);

    console.log('test is open: ', isOpen);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return isOpen && <p className={`snackbar ${type}`}>{message}</p>;
};

export default Snackbar;
