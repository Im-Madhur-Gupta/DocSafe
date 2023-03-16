import styles from "../styles/Navbar.module.css";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import getUsernameFromAddress from "../utils/getUsernameFromAddress";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Navbar() {
	const address = useAddress();
	const router = useRouter();
	const [userName, setUserName] = useState(null);

	useEffect(() => {
		if (address) {
			getUsernameFromAddress(address)
				.then((name) => {
					setUserName(name);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [address]);

	if (!address) {
		return (
			<div className={styles.container}>
				<div className={styles.profile}></div>
				<div className={styles.wallet}>
					<ConnectWallet />
				</div>
			</div>
		);
	} else if (userName) {
		router.push("/dashboard/myFiles");
	} else {
		router.push("/register")
	}
}
