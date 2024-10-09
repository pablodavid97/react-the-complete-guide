const UserInput = ({ input, onInputChange }) => {
    const [[, text], [inputKey, inputValue]] = Object.entries(input);
    console.log('input: ', input);
    const handleInputChange = (event) => {
        const { value: newValue } = event.target;

        onInputChange(inputKey, parseInt(newValue));
    };
    return (
        <div className='user-input'>
            <label>{text}</label>
            <input
                value={inputValue}
                onChange={handleInputChange}
                type='number'
            />
        </div>
    );
};

export default UserInput;
