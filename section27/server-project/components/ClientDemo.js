'use client';

import { useState } from 'react';

export default function ClientDemo({ children }) {
    const [count, setCount] = useState(0); // <- this is why it's a client component

    const handleIncreaseCounter = () => {
        setCount((prev) => prev + 1);
    };

    const handleDecreaseCounter = () => {
        setCount((prev) => prev - 1);
    };

    console.log('ClientDemo rendered');
    return (
        <div className='client-cmp'>
            <h2>A React Client Component</h2>
            <p>
                Will be rendered on the client <strong>AND</strong> the server.
            </p>

            <button className='client-btn' onClick={handleDecreaseCounter}>
                Decrease
            </button>
            {count}

            <button className='client-btn' onClick={handleIncreaseCounter}>
                Increase
            </button>
            {children}
        </div>
    );
}
