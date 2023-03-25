import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

const CustomPDFViewer = dynamic(() => import("../../components/CustomPDFViewer"), {
    ssr: false
});

export default function PDF() {
    const router = useRouter()
    const { cid, filename } = router.query

    return <CustomPDFViewer pdf={`https://w3s.link/ipfs/${cid}/${filename}`} />;
}