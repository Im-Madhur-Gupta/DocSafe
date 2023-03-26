import { useContext, createContext } from "react";
import {
	useAddress,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { fileManagerAddress } from "../constants";
import ABI from "../artifacts/contracts/FileManager.sol/FileManager.json"


const StateContext = createContext();

export function StateContextProvider({ children }) {

    const address = useAddress();
    const contractAddress=fileManagerAddress;
    const contractABI=ABI.abi

    async function createSafe(name,cid,fileNames){
        if(typeof window.ethereum!=="undefined"){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try{
                const res = await contract.createSafe(name,cid,fileNames);
                await provider.waitForTransaction(res.hash);
                console.log("Res",res);
            }catch(err){
                console.log("Error",err);
            }
        }
    }

    return (
        <StateContext.Provider
            value={{
                address,
                createSafe
            }}
        >
            {children}
        </StateContext.Provider>
    )


}

export function useStateContext() {
	return useContext(StateContext);
}
