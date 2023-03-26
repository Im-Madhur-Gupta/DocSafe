import Layout from "../../layout/layout";
import styles from "../../styles/Create.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	FormControl,
	FormLabel,
	Input,
	Button,
	Tag,
	TagLabel,
	TagCloseButton,
	Spinner,
} from "@chakra-ui/react";
import { useStorageUpload, Web3Button } from "@thirdweb-dev/react";
import { useStateContext } from "../../context";

export default function Create() {
	const wrapperRef = useRef(null);
	const [fileList, setFileList] = useState([]);
	const [shareWith, setShareWith] = useState([]);
	const [safeName, setSafeName] = useState("");
	const [tabIndex, setTabIndex] = useState(0);
	const [cid, setCid] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { createSafe, addAllowed } = useStateContext();
	const { mutateAsync: upload } = useStorageUpload();
	const router = useRouter();

	function handleNextTab() {
		setTabIndex(1);
	}

	function handleKeyDown(e) {
		const inputValue = e.target.value;
		if (e.key === "Enter" && inputValue) {
			setShareWith([...shareWith, inputValue]);
			e.target.value = "";
		}
	}

	function removeTag(tagToRemove) {
		setShareWith(shareWith.filter((email) => email !== tagToRemove));
	}

	function onDragEnter() {
		return wrapperRef.current.classList.add("dragover");
	}

	function onDragLeave() {
		return wrapperRef.current.classList.remove("dragover");
	}

	function onDrop() {
		return wrapperRef.current.classList.remove("dragover");
	}

	function onFileDrop(e) {
		const newFile = e.target.files[0];
		if (newFile) {
			const updatedList = [...fileList, newFile];
			setFileList(updatedList);
		}
	}

	function fileRemove(item) {
		const updatedList = [...fileList];
		updatedList.splice(fileList.indexOf(item), 1);
		setFileList(updatedList);
	}

	async function handleSubmit() {
		setIsLoading(true);
		const uris = await upload({ data: fileList });
		// console.log(uris);
		const cid = uris[0].slice(7).split("/")[0];
		setCid(cid);
		const fList = [];
		for (let x = 0; x < uris.length; x++) {
			fList.push(uris[x].slice(7).split("/")[1]);
		}
		setFileList(fList);
		setIsLoading(false);
		handleNextTab();
	}

	async function handleAddDetails() {
		setIsLoading(true);
		await createSafe(safeName, cid, fileList);
		await addAllowed(safeName, shareWith[0]);
		setIsLoading(false);
		router.push("/dashboard/myFiles");
	}


	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.tabHoldler}>
					<Tabs
						index={tabIndex}
						onChange={setTabIndex}
						variant="soft-rounded"
						colorScheme="brand"
						size="lg"
						align="center"
						isFitted
					>
						<TabList>
							<Tab>Upload Files</Tab>
							<Tab>Enter Details</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<div className={styles.dndBox}>
									<div
										ref={wrapperRef}
										className={styles.dndContainer}
										onDragEnter={onDragEnter}
										onDragLeave={onDragLeave}
										onDrop={onDrop}
									>
										<div className={styles.dndLabel}>
											<AiOutlineCloudUpload
												size={120}
											/>
											<p>
												Drag & Drop your files here
											</p>
										</div>
										<input
											className={styles.dndInput}
											type="file"
											value=""
											onChange={onFileDrop}
										/>
									</div>
									{fileList.length > 0 && (
										<div
											className={styles.previewFiles}
										>
											{fileList.map((item, index) => (
												<div
													key={index}
													className={
														styles.filebox
													}
												>
													<Tag
														size="lg"
														borderRadius="full"
														variant="solid"
														bg="transparent"
													>
														<TagLabel>
															{item.name}
														</TagLabel>
														<TagCloseButton
															onClick={() => {
																fileRemove(
																	item
																);
															}}
														/>
													</Tag>
												</div>
											))}
											<div
												className={
													styles.buttonContainer
												}
											>
												<Button
													color="white"
													bg="brand.100"
													size="lg"
													onClick={handleSubmit}
													isLoading={isLoading}
												>
													Upload Files
												</Button>
											</div>
										</div>
									)}
								</div>
							</TabPanel>
							<TabPanel>
								<div className={styles.formHolder}>
									<FormControl isRequired color="white">
										<FormLabel>Safe Name</FormLabel>
										<Input
											placeholder="Enter the safe name"
											size="lg"
											type="name"
											value={safeName}
											onChange={(e) =>
												setSafeName(e.target.value)
											}
										/>
									</FormControl>
									<FormControl isRequired color="white">
										<FormLabel>Share with</FormLabel>
										<Input
											type="text"
											placeholder="Add address of the user you want to share the file with..."
											size="lg"
											onKeyDown={handleKeyDown}
										/>
									</FormControl>
									{shareWith.length > 0 && (
										<div
											className={styles.emailsHolder}
										>
											{shareWith.map((address) => (
												<Tag
													key={address}
													size="lg"
													borderRadius="full"
													variant="solid"
													bg="brand.100"
												>
													<TagLabel>
														{address}
													</TagLabel>
													<TagCloseButton
														onClick={() => {
															removeTag(
																address
															);
														}}
													/>
												</Tag>
											))}
										</div>
									)}
									<Button
										color="white"
										bg="brand.100"
										size="lg"
										onClick={handleAddDetails}
										isLoading={isLoading}
										_loading={{
											color: "white",
										}}
									>
										Create Safe
									</Button>
								</div>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
			</div>
		</Layout>
	);

}
