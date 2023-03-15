import Layout from "../../layout/layout";
import styles from "../../styles/Create.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";

export default function create() {
	const wrapperRef = useRef(null);
	const [fileList, setFileList] = useState([]);

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
		console.log("submit");
	}

	useEffect(() => {
		console.log(fileList);
	}, [fileList]);

	return (
		<Layout>
			<div className={styles.container}>
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
								<div key={index} className={styles.filebox}>
									<p>{item.name}</p>
									<p>{item.size}B</p>
									<div className={styles.cancelHolder}>
										<RxCross1
											onClick={() => fileRemove(item)}
											size={20}
										/>
									</div>
								</div>
							))}
							<div className={styles.buttonContainer}>
								<button
									onClick={handleSubmit}
									className={styles.uploadBtn}
								>
									Add Files
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}
