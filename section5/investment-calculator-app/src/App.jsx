import { useState } from 'react';
import Header from './components/Header';
import InputGroup from './components/InputGroup';
import ResultsTable from './components/ResultsTable';

import { calculateInvestmentResults } from './util/investment';

const deriveInvestmentResults = (userInput) => {
    const inputValues = userInput.map(
        ({ text, ...rest }) => Object.values(rest)[0]
    );

    const investmentValues = {
        initialInvestment: inputValues[0],
        annualInvestment: inputValues[1],
        expectedReturn: inputValues[2],
        duration: inputValues[3],
    };

    return calculateInvestmentResults(investmentValues);
};

function App() {
    const [userInput, setUserInput] = useState([
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
    ]);

    const results = deriveInvestmentResults(userInput);

    console.log('results: ', results);

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
    return (
        <>
            <Header />
            <InputGroup
                userInput={userInput}
                onInputChange={handleUserInputChange}
            />
            <ResultsTable
                results={results}
                initialInvestment={userInput[0].initialInvestment}
            />
        </>
    );
}

export default App;
