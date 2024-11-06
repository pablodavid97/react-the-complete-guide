import { useState } from 'react';

const useInput = (defaultValue, validationFn) => {
    const [input, setInput] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const isInputValid = validationFn(input);

    const handleInputChange = (event) => {
        setInput(event.target.value);
        setDidEdit(false);
    };

    const handleInputBlur = () => {
        setDidEdit(true);
    };

    return {
        value: input,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !isInputValid,
    };
};

export default useInput;
