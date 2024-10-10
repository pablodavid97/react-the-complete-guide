import { useState } from 'react';
import Header from './components/Header';
import InputGroup from './components/InputGroup';
import ResultsTable from './components/ResultsTable';

const DEFAULT_USER_INPUT = [
    {
        text: 'Initial Investment',
        initialInvestment: 0,
    },
    {
        text: 'Annual Investment',
        annualInvestment: 0,
    },
    {
        text: 'Expected Return',
        expectedReturn: 0,
    },
    {
        text: 'Duration',
        duration: 0,
    },
];

function App() {
    const [userInput, setUserInput] = useState(DEFAULT_USER_INPUT);
    const handleUserInputChange = (inputIdentifier, value) => {
        setUserInput((prev) => {
            const newUserInput = [...prev];

            newUserInput.forEach((input) => {
                if (inputIdentifier in input) {
                    // plus sign casts value to an number
                    input[inputIdentifier] = +value;
                }
            });

            return newUserInput;
        });
    };

    let isInputValid = true;
    userInput.forEach((input) => {
        if (input.duration < 1) {
            isInputValid = false;
        }
    });

    return (
        <>
            <Header />
            <InputGroup
                userInput={userInput}
                onChange={handleUserInputChange}
            />
            {isInputValid ? (
                <ResultsTable userInput={userInput} />
            ) : (
                <p className='center'>
                    Please enter a duration greater than zero.
                </p>
            )}
        </>
    );
}

export default App;
