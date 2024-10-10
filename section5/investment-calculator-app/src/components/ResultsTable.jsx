import { formatter, deriveInvestmentResults } from '../util/investment';

const ResultsTable = ({ userInput }) => {
    const initialInvestment = userInput[0].initialInvestment;
    const results = deriveInvestmentResults(userInput);
    let investedCapital = initialInvestment;
    let totalInterest = 0;
    return (
        <table id='result'>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result) => {
                    const { year, annualInvestment, interest, valueEndOfYear } =
                        result;

                    investedCapital += annualInvestment;
                    totalInterest += interest;
                    return (
                        <tr key={`result-year-${year}`}>
                            <td>{year}</td>
                            <td>{formatter.format(valueEndOfYear)}</td>
                            <td>{formatter.format(interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(investedCapital)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ResultsTable;
