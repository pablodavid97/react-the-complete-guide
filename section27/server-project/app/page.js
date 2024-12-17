import ClientDemo from '@/components/ClientDemo';
import RSCDemo from '@/components/RSCDemo';
import DataFetchingDemo from '@/components/DataFetchingDemo';
import ServerActionsDemo from '@/components/ServerActionsDemo';
import UsePromiseDemo from '@/components/UsePromiseDemo';
import { Suspense } from 'react';
import fs from 'node:fs/promises';
import ErrorBoundary from '@/components/ErrorBoundary';

export default async function Home() {
    const fetchUsersPromise = new Promise((resolve, reject) =>
        setTimeout(async () => {
            const data = await fs.readFile('dummy-db.json', 'utf-8');
            const users = JSON.parse(data);
            // resolve(users);
            reject(new Error('Error!'));
        }, 2000)
    );
    return (
        <main>
            <ErrorBoundary fallback={<p>Something went wrong!</p>}>
                <Suspense fallback={<p>Loading users...</p>}>
                    <UsePromiseDemo usersPromise={fetchUsersPromise} />
                </Suspense>
            </ErrorBoundary>
            <ServerActionsDemo />
            <DataFetchingDemo />
            <ClientDemo>
                <RSCDemo />
            </ClientDemo>
            <RSCDemo />
        </main>
    );
}
