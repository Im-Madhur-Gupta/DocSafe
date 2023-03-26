import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../../layout/layout";
import styles from "../../styles/MyFile.module.css";
import { animate, motion, useMotionValue, useScroll } from "framer-motion";
import { BsThreeDots } from "react-icons/bs";
import {
	Tag,
	TagLabel,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Heading,
} from "@chakra-ui/react";
import { useStateContext } from "../../context";

export default function MyFiles() {
	const ref = useRef(null);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [trackMouse, setTrackMouse] = useState(false);
	const [animationComplete, setAnimationComplete] = useState(true);
	const [files, setFiles] = useState([]);
	const { address, addAllowed, fetchUserSafes } = useStateContext();

	useEffect(() => {
		if (address) {
			fetchUserSafes(address)
				.then((res) => {
					setFiles(res);
				})
				.catch((err) => {
					console.log("Error", err);
				});
		}
	}, []);


	const router = useRouter();
	const x = useMotionValue(0);

	const handleMouseMove = (e) => {
		if (!ref.current) return;
		if (!trackMouse) return;

		setAnimationComplete(false);

		const xVal = e.pageX - ref.current.offsetLeft;
		const walk = (xVal - startX) * 2; //scroll-fast

		const controls = animate(x, scrollLeft - walk, {
			type: "tween",
			ease: "easeOut",
			duration: 0,
			onUpdate: (val) => {
				if (!ref.current) return;
				ref.current.scrollLeft = val;
			},
			onComplete: () => {
				setAnimationComplete(true);
			},
			onStop: () => {
				setAnimationComplete(true);
			},
		});
		return controls.stop;
	};

	const handleMouseDown = (e) => {
		if (!ref.current) return;

		setTrackMouse(true);

		const startX = e.pageX - ref.current.offsetLeft;
		setStartX(startX);

		const scrollLeft = ref.current.scrollLeft;
		setScrollLeft(scrollLeft);
	};

	const handleMouseLeave = () => {
		setTrackMouse(false);
	};

	const handleMouseUp = () => {
		setTrackMouse(false);
	};

	const handleScroll = () => {
		if (!ref.current) return;

		if (animationComplete) {
			x.set(ref.current.scrollLeft);
		}
	};

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
				<div className={styles.greetHolder}>
					<h1 className={styles.welcome}>Welcome!</h1>
					<h3 className={styles.username}>@username</h3>
				</div>
				<div className={styles.myFilesContainer}>
					<div className={styles.myFilesTitleHolder}>
						<h1 className={styles.myFilesTitle}>My Files</h1>
					</div>
					<motion.div
						className={styles.myFileHolderParent}
						whileTap={{ cursor: "grabbing" }}
						ref={ref}
						onMouseMove={handleMouseMove}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseLeave}
						onScroll={handleScroll}
					>
						{files?.length > 0 ? (
							files.map((item, index) => {
								for (let x = 0; x < item[3].length; x++) {
									console.log("Item", item[3][x]);
									return (
										<motion.div
											key={index}
											className={styles.filebox}
											style={{
												userSelect: trackMouse
													? "none"
													: "auto",
											}}
										>
											<div
												className={
													styles.fileTextHolder
												}
											>
												<Tag
													size="lg"
													borderRadius="full"
													variant="solid"
													bg="transparent"
												>
													<TagLabel>
														{item[4][x]}
													</TagLabel>
												</Tag>
												<Menu>
													<MenuButton>
														<BsThreeDots />
													</MenuButton>
													<MenuList>
														<MenuItem
															onClick={() =>
																viewFileHandler(
																	item[1],
																	item[4][x]
																)
															}
														>
															View
														</MenuItem>
														<MenuItem>
															Share
														</MenuItem>
													</MenuList>
												</Menu>
											</div>
										</motion.div>
									);
								}
							})
						) : (
							<Heading>No files found</Heading>
						)}
					</motion.div>
				</div>
			</div>
		</Layout>
	);
}
