import Layout from "../../layout/layout";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
} from "@chakra-ui/react";
import styles from "../../styles/Shared.module.css";
import { useState } from "react";
import { useStateContext } from "../../context";

export default function SharedFiles() {
	const [fileList, setFileList] = useState([]);
	const { address, fetchSafesSharedWithUser } = useStateContext();

	useEffect(() => {
		if (address) {
			fetchSafesSharedWithUser(address)
				.then((res) => {
					setFileList(res);
				})
				.catch((err) => {
					console.log("Error", err);
				});
		}
	}, []);

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
				<div className={styles.tableHolder}>
					<h1 className={styles.title}>Shared Files</h1>
					<TableContainer>
						<Table variant="simple" fontSize={25}>
							<Thead>
								<Tr>
									<Th
										fontSize={30}
										textTransform={"capitalize"}
										fontFamily={"sans-serif"}
									>
										File Name
									</Th>
									<Th
										fontSize={30}
										textTransform={"capitalize"}
									>
										Shared By
									</Th>
									<Th
										fontSize={30}
										textTransform={"capitalize"}
									>
										Size
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{fileList.map((item, index) => {
									for (let x = 0; x < item[3].length; x++) {
										return (
											<Tr
												key={index}
												onClick={() =>
													viewFileHandler(
														item[1],
														item[3][x]
													)
												}
											>
												<Td>{item[3][x]}</Td>
												<Td>{item[2]}</Td>
											</Tr>
										);
									}
									<Tr key={index}>
										<Td>{item.filename}</Td>
										<Td>{item.sender}</Td>
									</Tr>;
								})}
							</Tbody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Layout>
	);
}
