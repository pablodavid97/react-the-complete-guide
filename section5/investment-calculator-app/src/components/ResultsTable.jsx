const ResultsTable = ({ results, initialInvestment }) => {
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
                        <tr>
                            <td>{year}</td>
                            <td>{valueEndOfYear}</td>
                            <td>{interest}</td>
                            <td>{totalInterest}</td>
                            <td>{investedCapital}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ResultsTable;
