import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';
import { log } from './log.js';

function App() {
    log('<App /> rendered');

    const [chosenCount, setChosenCount] = useState(0);

    const handleSetCount = (newCount) => {
        setChosenCount(newCount);
    };

    return (
        <>
            <Header />
            <main>
                <ConfigureCounter onSetCount={handleSetCount} />
                <Counter key={chosenCount} initialCount={chosenCount} />
            </main>
        </>
    );
}

export default App;
