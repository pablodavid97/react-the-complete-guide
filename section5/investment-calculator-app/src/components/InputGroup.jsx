import UserInput from './UserInput';

const InputGroup = ({ userInput, onInputChange }) => {
    return (
        <div id='inputGroup' className='input-group'>
            {userInput.map((input) => {
                const key = Object.keys(input)[1];
                console.log('key: ', key);
                return (
                    <UserInput
                        key={`user-input-${key}`}
                        input={input}
                        onInputChange={onInputChange}
                    />
                );
            })}
        </div>
    );
};

export default InputGroup;
