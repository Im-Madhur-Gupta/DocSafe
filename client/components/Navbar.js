import styles from "../styles/Navbar.module.css";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import getUsernameFromAddress from "../utils/getUsernameFromAddress";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Navbar() {
	const address = useAddress();
	const router = useRouter();

	if (!address) {
		return (
			<div className={styles.container}>
				<div className={styles.profile}></div>
				<div className={styles.wallet}>
					<ConnectWallet />
				</div>
			</div>
		);
	} else {
		const user = getUsernameFromAddress(address);
		if (user) {
			router.push("/dashboard/myFiles");
		}
		router.push("/register");
	}
}
