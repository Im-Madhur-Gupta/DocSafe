import { useRouter } from 'next/router'
import { MediaRenderer } from "@thirdweb-dev/react";
import { Flex } from '@chakra-ui/react';

export default function PDF() {
    const router = useRouter()
    const { cid, filename } = router.query

    return (
        <Flex align="center" justify="center" height="100vh" width="100vw" backgroundColor="#2B2C30">
            <MediaRenderer
                requireInteraction={true}
                controls={true}
                height="75vh"
                width='fit-content'
                style={{ backgroundColor: "#2B2C30" }}
                src={`https://${cid}.ipfs.w3s.link/${filename}.pdf`}
            />
        </Flex>
    );
}