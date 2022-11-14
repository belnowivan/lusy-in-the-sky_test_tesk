import { ReactElement } from "react";
import Header from "../Header/Header";
import styles from './styles.module.scss';

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <>
            <header className={styles.header}>
                <Header />
            </header>
            <div className={styles.page}>
                {children}
            </div>
        </>
    );
}

export default Layout;