import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { Flex, Image } from "@chakra-ui/react";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>DocSafe</title>
				<meta
					name="DocSafe"
					content="File Sharing Protocol Powered by Web3"
				/>
			</Head>
			<Navbar />
			<Flex width="100vw" bgColor="#2b2c30" justify="center" align="center">
				<Image height="89.1vh" src="landing.png" />
			</Flex>
		</div>
	);
}
