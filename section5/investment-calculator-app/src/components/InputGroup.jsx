import UserInput from './UserInput';

const InputGroup = ({ userInput, onInputChange, hasInputValueBeenChanged }) => {
    return (
        <div id='inputGroup' className='input-group'>
            {userInput.map((input) => {
                const key = Object.keys(input)[1];
                let errorMsg;

                if (hasInputValueBeenChanged) {
                    if (key === 'duration' && input.duration < 1) {
                        errorMsg =
                            'Invalid duration. A value greater or equal than 1 must be entered.app';
                    }
                }

                return (
                    <UserInput
                        key={`user-input-${key}`}
                        input={input}
                        onInputChange={onInputChange}
                        errorMsg={errorMsg}
                    />
                );
            })}
        </div>
    );
};

export default InputGroup;
