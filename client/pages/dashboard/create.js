import Layout from "../../layout/layout";
import styles from "../../styles/Create.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
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

    useEffect(() => {
        console.log(fileList);
    }, [fileList]);

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.greetHolder}>
					<h1 className={styles.welcome}>Welcome Back!</h1>
					<h3 className={styles.username}>@username</h3>
				</div>
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
						<input className={styles.dndInput} type="file" value="" onChange={onFileDrop} />
					</div>
				</div>
			</div>
		</Layout>
	);
}
