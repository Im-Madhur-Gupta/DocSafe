import styles from "../styles/Navbar.module.css";
import {
	ChainId,
	ConnectWallet,
	useAddress,
	useNetwork,
	useNetworkMismatch,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

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
		router.push('/dashboard');
	}
}
