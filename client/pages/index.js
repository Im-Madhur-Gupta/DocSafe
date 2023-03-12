import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
			<div className={styles.container}>
				<Head>
					<title>FileShare</title>
					<meta
						name="FileShare"
						content="File Sharing Protocol Powered by Web3"
					/>
				</Head>
        <Navbar/>
        <h1>File Share</h1>
			</div>
	);
}
