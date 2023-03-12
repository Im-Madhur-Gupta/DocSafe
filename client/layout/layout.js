import Sidebar from "../components/Sidebar";

export default function Layout({children}){
    return (
        <div>
            <Sidebar/>
            {children}
        </div>
    )   
}