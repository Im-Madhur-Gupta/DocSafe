import Layout from "../../layout/layout";
import styles from "../../styles/Create.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {  useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { usePolybase, useAuth, useCollection } from "@polybase/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { v4 as uuidv4 } from 'uuid';


export default function Create() {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  const [shareWith, setShareWith] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [fileName, setFileName] = useState("");
  const { mutateAsync: upload } = useStorageUpload();
  const { state } = useAuth();
  const polybase = usePolybase();

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

    const uris = await upload({ data: fileList });
    
    console.log(uris);
    for (let i = 0; i < uris.length; i++) {
      console.log(uris[i]?.slice(7).split('/')[1]);
      console.log(uris[i]?.slice(7).split('/')[0]);
      const res = await polybase
        .collection('Safes')
        .create([
          uuidv4(),
          polybase.collection('User').record(state.publicKey),
          uris[i]?.slice(7).split('/')[1],
          uris[i]?.slice(7).split('/')[0]
        ]);
      console.log(res);
    }
  }

  function handleAddDetails() {}


 

  async function UploadFile() {
    console.log(data.data);
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
                          <Tag
                            size="lg"
                            borderRadius="full"
                            variant="solid"
                            bg="transparent"
                          >
                            <TagLabel>{item.name}</TagLabel>
                            <TagCloseButton
                              onClick={() => {
                                fileRemove(item);
                              }}
                            />
                          </Tag>
                        </div>
                      ))}
                      <div className={styles.buttonContainer}>
                        <Button
                          color="white"
                          bg="brand.100"
                          size="lg"
                          onClick={handleSubmit}
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
                    <FormLabel>File Name</FormLabel>
                    <Input
                      placeholder="Enter the name of the file"
                      size="lg"
                      type="name"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
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
