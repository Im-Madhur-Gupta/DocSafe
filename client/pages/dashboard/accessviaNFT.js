import Layout from "../../layout/layout";
import styles from "../../styles/AccessViaNFT.module.css";
import { useStateContext } from "../../context";

export default function AccessViaNFT() {
	const { fetchSafesForNFT } = useStateContext();

	return (
		<Layout>
			<div className={styles.container}>Access Via NFT</div>
		</Layout>
	);
}
