import Sidebar from "../components/Sidebar";
import styles from "../styles/Layout.module.css";

export default function Layout({children}){
    return (
        <div className={styles.container}>
            <Sidebar/>
            {children}
        </div>
    )   
}