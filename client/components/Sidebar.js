import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAddress,useDisconnect } from "@thirdweb-dev/react";

export default function Sidebar() {
	const router = useRouter();
	const path = router.asPath.split("/").pop();
    const address = useAddress();
    const disconnect = useDisconnect();

	async function handleLogout() {
        // Not working.
        if(address){
           await disconnect();
        }
		router.push("/");
	}

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.title}>FileShare.io</div>
				<div className={styles.linkContainer}>
					<div className={styles.dashboardTitleHolder}>
						<h1 className={styles.dashboardTitle}>Dashboard</h1>
					</div>
					<div className={styles.linksBox}>
						<div className={styles.bar}>.</div>
						<div className={styles.linkHolder}>
							<Link href="/dashboard/myFiles">
								<div
									className={
										path === "myFiles"
											? styles.selectedLink
											: styles.link
									}
								>
									My Files
								</div>
							</Link>
							<Link href="/dashboard/sharedFiles">
								<div
									className={
										path === "sharedFiles"
											? styles.selectedLink
											: styles.link
									}
								>
									Shared with me
								</div>
							</Link>
							<Link href="/dashboard/create">
								<div
									className={
										path === "create"
											? styles.selectedLink
											: styles.link
									}
								>
									Add new files
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.profileContainer}>
				<div className={styles.profile}>
					<div className={styles.profileIcon}></div>
					<div className={styles.profileName}>@username</div>
				</div>
				<button onClick={handleLogout} className={styles.logout}>
					Logout
				</button>
			</div>
		</div>
	);
}
