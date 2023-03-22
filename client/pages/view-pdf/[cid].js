import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

const CustomPDFViewer = dynamic(() => import("../../components/CustomPDFViewer"), {
    ssr: false
});

export default function PDF() {
    const router = useRouter()
    const { cid } = router.query

    return <CustomPDFViewer pdf={`https://${cid}.ipfs.w3s.link/Madhur%20Contract%20Extension%20Maya.pdf`} />;
}