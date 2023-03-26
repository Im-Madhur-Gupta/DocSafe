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

const dummyFile = [
	{
		filename: "file1.xyz",
		size: "1mb",
		sender: "Jhon Doe",
	},
	{
		filename: "file1.xyz",
		size: "1mb",
		sender: "Jhon Doe",
	},
	{
		filename: "file1.xyz",
		size: "1mb",
		sender: "Jhon Doe",
	},
	{
		filename: "file1.xyz",
		size: "1mb",
		sender: "Jhon Doe",
	},
	{
		filename: "file1.xyz",
		size: "1mb",
		sender: "Jhon Doe",
	},
	{
		filename: "file1.xyz",
		size: "1mb",
		sender: "Jhon Doe",
	},
];

export default function SharedFiles() {
	const [fileList, setFileList] = useState(dummyFile);

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
								{fileList.map((item, index) => (
									<Tr key={index}>
										<Td>{item.filename}</Td>
										<Td>{item.sender}</Td>
										<Td>{item.size}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Layout>
	);
}
