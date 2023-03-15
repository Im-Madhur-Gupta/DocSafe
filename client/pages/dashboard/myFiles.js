import { useState } from "react";
import Layout from "../../layout/layout";
import styles from "../../styles/MyFile.module.css";

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

export default function MyFiles() {
	const [fileList, setFileList] = useState(dummyFile);

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
					<div className={styles.myFilesHolder}>
						{fileList.map((item, index) => (
							<div key={index} className={styles.filebox}>
								<div className={styles.fileTextHolder}>
                                    <h1 className={item.filename}>{item.filename}</h1>
                                    <h3 className={item.filesize}>{item.size}</h3>
                                </div>

							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}
