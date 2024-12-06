import Nav from '../components/Nav';

function ErrorPage() {
    return (
        <>
            <Nav />
            <main>
                <h1>An error occurred!</h1>
                <p>Could not find this page!</p>
            </main>
        </>
    );
}

export default ErrorPage;
