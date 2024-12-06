import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

function RootLayout() {
    return (
        <>
            <Nav />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
