import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <h1 style={{ color: 'white', textAlign: 'center' }}>
                Time to get started!
                <div>
                    <Link href='/meals'>Go to Meals</Link>
                </div>
                <div>
                    <Link href='/meals/share'>Share a Meal</Link>
                </div>
                <div>
                    <Link href='/community'>Go to Community</Link>
                </div>
            </h1>
        </main>
    );
}
