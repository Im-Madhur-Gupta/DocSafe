import { useState } from "react";

// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "../pdf-worker";
import { Flex, Text } from "@chakra-ui/react";

import { RiAddFill, RiSubtractFill } from "react-icons/ri";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function CustomPDFViewer({ pdf }) {
  const [scale, setScale] = useState(100);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const increaseScale = () => {
    setScale(scale + 10);
  };

  const decreaseScale = () => {
    setScale(scale - 10);
  };

  return (
    <Flex direction="column" background="#2B2C30" height="100vh">
      <Flex
        justify="center"
        align="center"
        paddingY={3}
        background="#222326"
        marginBottom={2}
      >
        <RiSubtractFill
          color="white"
          size={35}
          cursor="pointer"
          onClick={decreaseScale}
        />
        <Text color="white" fontSize={24} marginX={10}>
          {scale}%
        </Text>
        <RiAddFill
          color="white"
          size={35}
          cursor="pointer"
          onClick={increaseScale}
        />
      </Flex>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            scale={scale / 100}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </Flex>
  );
}
