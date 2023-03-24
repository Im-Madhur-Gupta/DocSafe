import Layout from "../../layout/layout";
import styles from "../../styles/Create.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Button,
	Stack,
	Tag,
	TagLabel,
	TagCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import initializeNewUser from "../../utils/polybaseConnection";
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { Auth } from "@polybase/auth";
import {
	usePolybase,
	useDocument,
	useAuth,
	useIsAuthenticated,
	useCollection,
} from "@polybase/react";

export default function Create() {
	const wrapperRef = useRef(null);
	const [fileList, setFileList] = useState([]);
	const [shareWith, setShareWith] = useState([]);
	const { isOpen, onToggle } = useDisclosure();
	const [tabIndex, setTabIndex] = useState(0);
	const [fileName, setFileName] = useState("");

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

	function handleSubmit() {
		UploadFile();
		console.log("submit");
		handleNextTab();
	}

	function handleAddDetails() {}

	useEffect(() => {
		console.log(fileList);
	}, [fileList]);

	const polybase = usePolybase();

	const { auth, state, loading } = useAuth();

	const { data, error, dataLoading } = useCollection(
		polybase
			.collection("Safes")
			.where(
				"account",
				"==",
				`0x6e7F1a7d1Bac9c7784c7C7Cdb098A727F62E95c7`
			)
	);

	useEffect(() => {
		(async () => {
			//   polybaseTest();
		})();
	}, []);

	async function polybaseTest() {
		console.log("Polybase test");
		await auth.signIn();
	}

	async function UploadFile() {
		console.log(data.data);

		const res = await polybase
			.collection("Safes")
			.create([
				`${data.data.length}`,
				`0x6e7F1a7d1Bac9c7784c7C7Cdb098A727F62E95c7`,
				`${fileName}`,
				`bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`,
			]);

		console.log(res);
	}

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.tabHoldler}>
					<div>
						<button onClick={() => polybaseTest()}>Sign In</button>
						<button onClick={() => auth.signOut()}>Sign Out</button>
						<button onClick={() => UploadFile()}>Test btn</button>
					</div>
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
											<AiOutlineCloudUpload size={120} />
											<p>Drag & Drop your files here</p>
										</div>
										<input
											className={styles.dndInput}
											type="file"
											value=""
											onChange={onFileDrop}
										/>
									</div>
									{fileList.length > 0 && (
										<div className={styles.previewFiles}>
											{fileList.map((item, index) => (
												<div
													key={index}
													className={styles.filebox}
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
												>
													Share Files
												</Button>
											</div>
										</div>
									)}
								</div>
							</TabPanel>
							<TabPanel>
								<div className={styles.formHolder}>
									<FormControl isRequired color="white">
										<FormLabel>File Name</FormLabel>
										<Input
											placeholder="Enter the name of the file"
											size="lg"
											type="name"
											value={fileName}
											onChange={(e) =>
												setFileName(e.target.value)
											}
										/>
									</FormControl>
									<FormControl isRequired color="white">
										<FormLabel>Share with</FormLabel>
										<Input
											type="text"
											placeholder="Add username of the people to share with"
											size="lg"
											onKeyDown={handleKeyDown}
										/>
									</FormControl>
									{shareWith.length > 0 && (
										<div className={styles.emailsHolder}>
											{shareWith.map((email) => (
												<Tag
													key={email}
													size="lg"
													borderRadius="full"
													variant="solid"
													bg="brand.100"
												>
													<TagLabel>{email}</TagLabel>
													<TagCloseButton
														onClick={() => {
															removeTag(email);
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
									>
										Continue
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
