import Layout from "../../layout/layout";
import styles from "../../styles/AccessViaNFT.module.css";
import { useStateContext } from "../../context";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function AccessViaNFT() {
	const { fetchSafesForNFT } = useStateContext();
	const [nft, setNFT] = useState();
    const [isLoading,setIsLoading]=useState(false);
    const [safes,setSafes]=useState([])

    async function handleSubmit(nftAddress){
        const safes = fetchSafesForNFT(nftAddress);
        console.log(safes);
    }

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.formHolder}>
					<FormControl isRequired color="white">
						<FormLabel>NFT Address</FormLabel>
						<Input
							placeholder="Enter the NFT address here..."
							size="lg"
							type="name"
							value={nft}
							onChange={(e) => setNFT(e.target.value)}
						/>
					</FormControl>
					<Button
						color="white"
						bg="brand.100"
						size="lg"
                        onClick={()=>(handleSubmit(nft))}
						isLoading={isLoading}
						_loading={{
							color: "white",
						}}
					>
						Submit
					</Button>
				</div>
			</div>
		</Layout>
	);
}
