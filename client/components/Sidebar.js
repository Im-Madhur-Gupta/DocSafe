import styles from "../styles/Sidebar.module.css";
import Link from "next/link";

export default function Sidebar() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>FileShare.io</div>
			<div className={styles.linkContainer}>
				<div className={styles.dashboardTitleHolder}>
					<h1 className={styles.dashboardTitle}>Dashboard</h1>
				</div>
				<div className={styles.linksBox}>
					<div className={styles.bar}>.</div>
					<div className={styles.linkHolder}>
						<Link href="/dashboard/myFiles">
							<div className={styles.link}>My Files</div>
						</Link>
						<Link href="/dashboard/sharedFiles">
							<div className={styles.link}>Shared with me</div>
						</Link>
						<Link href="/dashboard/create">
							<div className={styles.link}>Add new files</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
