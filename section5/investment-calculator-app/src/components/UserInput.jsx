const UserInput = ({ input, onInputChange, errorMsg }) => {
    const [[, text], [inputKey, inputValue]] = Object.entries(input);

    const handleInputChange = (event) => {
        const { value: newValue } = event.target;
        onInputChange(inputKey, parseInt(newValue));
    };

    const handleFocus = (event) => {
        event.target.value = '';
    };

    const handleBlur = (event) => {
        event.target.value = inputValue;
    };

    return (
        <div className='user-input'>
            <label>{text}</label>
            <input
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type='number'
            />
            {errorMsg && <p className='error'>{errorMsg}</p>}
        </div>
    );
};

export default UserInput;
