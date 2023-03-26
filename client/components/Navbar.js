import styles from "../styles/Navbar.module.css";

import { useRouter } from "next/router";
import { useStateContext } from "../context";
import { ConnectWallet,useNetwork  } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { Image } from "@chakra-ui/react";

export default function Navbar() {
	const router = useRouter();
	const { address } = useStateContext();

	useEffect(()=>{
		if(address){
			router.push("/dashboard/myFiles")
		}
	},[address])

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<Image width="4rem" src="/favicon.ico" marginRight={2} />
				DocSafe
			</div>
			<div className={styles.wallet}>
				<ConnectWallet />
			</div>
		</div>
	);
}
