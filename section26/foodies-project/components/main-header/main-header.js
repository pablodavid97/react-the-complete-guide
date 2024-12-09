import Link from 'next/link';
// allows you to do lazy loading
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';

import LogoImg from '@/assets/logo.png';
import styles from './main-header.module.css';

const MainHeader = () => {
    return (
        <>
            <MainHeaderBackground />
            <header className={styles.header}>
                <Link className={styles.logo} href='/'>
                    <Image
                        src={LogoImg}
                        alt='A plate with food on it'
                        priority
                    />
                    NextLevel Food
                </Link>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink href='/meals'>Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href='/community'>
                                Foodies Community
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default MainHeader;
