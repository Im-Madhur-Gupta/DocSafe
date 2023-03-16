import { useState, useEffect, useRef } from "react";
import Layout from "../../layout/layout";
import styles from "../../styles/MyFile.module.css";
import { animate, motion, useMotionValue, useScroll } from "framer-motion";

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

export default function MyFiles() {
	const ref = useRef(null);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [trackMouse, setTrackMouse] = useState(false);
	const [animationComplete, setAnimationComplete] = useState(true);

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
			}
		});
		return controls.stop;
	};

	const handleMouseDown = (e) => {
		// if (!(e.target instanceof HTMLLIElement)) return;
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
						{dummyFile.map((item, index) => (
								<motion.div
									key={index}
									className={styles.filebox}
								style={{ userSelect: trackMouse ? "none" : "auto" }}
								>
									<div className={styles.fileTextHolder}>
										<h1 className={item.filename}>
											{item.filename}
										</h1>
										<h3 className={item.filesize}>
											{item.size}
										</h3>
									</div>
								</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</Layout>
	);
}
