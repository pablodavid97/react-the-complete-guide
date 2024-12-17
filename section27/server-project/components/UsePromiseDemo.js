'use client';

import { useState, use } from 'react';

export default function UsePromiseDemo({ usersPromise }) {
    const users = use(usersPromise);
    const [count, setCount] = useState(0);

    const handleIncreaseCounter = () => {
        setCount((prev) => prev + 1);
    };

    const handleDecreaseCounter = () => {
        setCount((prev) => prev - 1);
    };

    return (
        <div className='rsc'>
            <h2>Use Promises Demo - Data Fetching</h2>
            <p>
                Uses <strong>async / await</strong> for data fetching.
            </p>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.title})
                    </li>
                ))}
            </ul>
            <button className='client-btn' onClick={handleDecreaseCounter}>
                Decrease
            </button>
            {count}

            <button className='client-btn' onClick={handleIncreaseCounter}>
                Increase
            </button>
        </div>
    );
}
