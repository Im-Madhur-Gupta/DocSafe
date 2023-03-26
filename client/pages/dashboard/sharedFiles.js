import Layout from "../../layout/layout";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Text,
} from "@chakra-ui/react";
import styles from "../../styles/Shared.module.css";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context";
import { useRouter } from "next/router";


export default function SharedFiles() {
	const [fileList, setFileList] = useState([]);
	const { address, fetchSafesSharedWithUser } = useStateContext();
	const router = useRouter();

	useEffect(() => {
		if (address) {
			fetchSafesSharedWithUser(address)
				.then((res) => {
					console.log(res);
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
					<h1 className={styles.title}>Shared with me</h1>
					<Text
						color="white"
						paddingLeft="30px"
						fontSize={22}
						marginBottom={10}
					>
						This page displays the files that have been shared with
						you.
					</Text>
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
								{fileList?.length > 0 &&
									fileList.map((item, index) => {
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
				</div>
			</div>
		</Layout>
	);
}
