import styles from "../styles/Sidebar.module.css";

export default function Sidebar(){
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                FileShare.io
            </div>
            <div className={styles.linkContainer}>
                <div className={styles.dashboardTitleHolder}>
                    <h1 className={styles.dashboardTitle}>Dashboard</h1>
                </div>
            </div>
        </div>
    )
}