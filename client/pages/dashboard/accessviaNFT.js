import Layout from "../../layout/layout";
import styles from "../../styles/AccessViaNFT.module.css";
import { useStateContext } from "../../context";
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AccessViaNFT() {
	const { fetchSafesForNFT } = useStateContext();
	const [nft, setNFT] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [safes, setSafes] = useState([]);
    const router = useRouter();

	async function handleSubmit(nftAddress) {
		const safeA = await fetchSafesForNFT(nftAddress);
		setSafes(safeA);
	}

    const openPdfFileHandler = (cid, filename) => {
		router.push(`/view-pdf/${cid}?filename=${filename}`);
	};

	const openMediaFileHandler = (cid, filename) => {
		router.push(`/view-media/${cid}?filename=${filename}`);
	};

	const viewFileHandler = (cid, filename) => {
		const formattedCid = cid.split("/")[0];
		console.log("CID", formattedCid);

		const formattedFilename = encodeURIComponent(filename);
		console.log("Filename", formattedFilename);

		const filetype = formattedFilename.split(".")[1].toLocaleLowerCase();

		if (filetype === "pdf") {
			return openPdfFileHandler(formattedCid, formattedFilename);
		}

		const mediaFileTypes = [
			"mp4",
			"jpeg",
			"jpg",
			"png",
			"gif",
			"webp",
			"svg",
		];
		if (mediaFileTypes.includes(filetype)) {
			return openMediaFileHandler(formattedCid, formattedFilename);
		}
	};

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
						onClick={() => handleSubmit(nft)}
						isLoading={isLoading}
						_loading={{
							color: "white",
						}}
					>
						Submit
					</Button>
                    {
                   safes?.length > 0 && (
                    <TableContainer marginX="2rem">
						<Table color="white" variant="simple" fontSize={25}>
							<Thead>
								<Tr>
									<Th
										fontSize={30}
										textTransform={"capitalize"}
										fontFamily={"sans-serif"}
										color="white"
									>
										File Name
									</Th>
									<Th
										fontSize={30}
										textTransform={"capitalize"}
										color="white"
									>
										Shared By
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{safes?.length > 0 &&
									safes.map((item, index) => {
										for (
											let x = 0;
											x < item[3].length;
											x++
										) {
											return (
												<Tr
													key={index}
													onClick={() =>
														viewFileHandler(
															item[1],
															item[4][x]
														)
													}
													color="white"
												>
													<Td color="white">
														{item[4][x]}
													</Td>
													<Td color="white">
														{item[2]}
													</Td>
												</Tr>
											);
										}
										<Tr key={index} color="white">
											<Td color="white">
												{item.filename}
											</Td>
											<Td color="white">{item.sender}</Td>
										</Tr>;
									})}
							</Tbody>
						</Table>
					</TableContainer>
                   )
                }
				</div>
                
			</div>
		</Layout>
	);
}
