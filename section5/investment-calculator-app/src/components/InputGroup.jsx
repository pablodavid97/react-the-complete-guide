import UserInput from './UserInput';

const InputGroup = ({ userInput, onChange }) => {
    return (
        <section id='inputGroup'>
            <div className='input-group'>
                {userInput.map((input) => {
                    const key = Object.keys(input)[1];

                    return (
                        <UserInput
                            key={`user-input-${key}`}
                            input={input}
                            onChange={onChange}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default InputGroup;
