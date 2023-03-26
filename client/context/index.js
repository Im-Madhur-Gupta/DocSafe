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

    async function addAllowed(fileName,userAddress){
        if(typeof window.ethereum!=="undefined"){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,contractABI,
                signer
            );
            try{
                const res = await contract.addAllowed(fileName,userAddress);
                await provider.waitForTransaction(res.hash);
                console.log("Res",res);
            }catch(err){
                console.log("Error",err);
            }
        }
    }

    async function removeAllowed(fileName,userAddress){
        if(typeof window.ethereum!=="undefined"){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try{
                const res = await contract.removeAllowed(fileName,userAddress);
                await provider.waitForTransaction(res.hash);
                console.log("Res",res);
            }catch(err){
                console.log("Error",err);
            }
        }
    }

    async function fetchUserSafes(userAddress){
        if(typeof window.ethereum!=="undefined"){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
        }
    }

    return (
        <StateContext.Provider
            value={{
                address,
                createSafe,
                addAllowed,
                removeAllowed
            }}
        >
            {children}
        </StateContext.Provider>
    )


}

export function useStateContext() {
	return useContext(StateContext);
}
