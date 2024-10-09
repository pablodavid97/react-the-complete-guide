import { useState } from 'react';
import Header from './components/Header';
import InputGroup from './components/InputGroup';
import ResultsTable from './components/ResultsTable';
import {
    deriveInvestmentResults,
    deriveHasInputValueChanged,
} from './util/investment';

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
    const results = deriveInvestmentResults(userInput);

    const handleUserInputChange = (key, value) => {
        setUserInput((prev) => {
            const newUserInput = [...prev];

            newUserInput.forEach((input) => {
                if (key in input) {
                    input[key] = value;
                }
            });

            return newUserInput;
        });
    };
    const hasInputValueBeenChanged = deriveHasInputValueChanged(userInput);

    return (
        <>
            <Header />
            <InputGroup
                userInput={userInput}
                onInputChange={handleUserInputChange}
                hasInputValueBeenChanged={hasInputValueBeenChanged}
            />
            <ResultsTable
                results={results}
                initialInvestment={userInput[0].initialInvestment}
            />
        </>
    );
}

export default App;
