import {NavLink, Outlet} from "react-router-dom";
import styles from "./styles.module.css";

export const Layout = () => {
    const setActive = ({isActive}) => isActive ? `${styles.active} ${styles.link}` : styles.link;
    return (
        <>
            <header className={styles.root}>
                <NavLink className={setActive} to="/">Todos</NavLink>
                <NavLink className={setActive} to="/posts">Posts</NavLink>
                <NavLink className={setActive} to="/albums">Albums</NavLink>
            </header>
                <Outlet/>
            <footer>
               2022
            </footer>
        </>
    )
}