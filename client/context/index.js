import { useContext, createContext } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { fileManagerAddress } from "../constants";
import ABI from "../artifacts/contracts/FileManager.sol/FileManager.json";

const StateContext = createContext();

export function StateContextProvider({ children }) {
	const address = useAddress();
	const contractAddress = fileManagerAddress;
	const contractABI = ABI.abi;

	async function createSafe(name, cid, fileNames) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				contractAddress,
				contractABI,
				signer
			);
			try {
				const res = await contract.createSafe(name, cid, fileNames);
				await provider.waitForTransaction(res.hash);
				console.log("Res", res);
			} catch (err) {
				console.log("Error", err);
			}
		}
	}

	async function addAllowed(safeName, userAddress) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				contractAddress,
				contractABI,
				signer
			);
			try {
				const res = await contract.addAllowed(fileName, userAddress);
				await provider.waitForTransaction(res.hash);
				console.log("Res", res);
			} catch (err) {
				console.log("Error", err);
			}
		}
	}

	async function removeAllowed(safeName, userAddress) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				contractAddress,
				contractABI,
				signer
			);
			try {
				const res = await contract.removeAllowed(fileName, userAddress);
				await provider.waitForTransaction(res.hash);
				console.log("Res", res);
			} catch (err) {
				console.log("Error", err);
			}
		}
	}

    async function deleteSafe(safeName){
        if(typeof window.ethereum!=="undefined"){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer,
            );
            try{
                const res = await contract.deleteSafe(safeName);
                await provider.waitForTransaction(res.hash);
				console.log("Res", res);
            }catch(err){
                console.log("Error",err);
            }
        }
    }

	async function fetchUserSafes(userAddress) {
		let provider;
		if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {
			provider = new ethers.providers.JsonRpcProvider();
		} else if (process.env.NEXT_PUBLIC_ENVIRONMENT === "testnet") {
			provider = new ethers.providers.JsonRpcProvider(
				process.env.NEXT_PUBLIC_MANTLE_RPC_URL
			);
		}
		const contract = new ethers.Contract(
			contractAddress,
			contractABI,
			provider
		);
		try {
			const res = await contract.getUserSafes(userAddress);
			return res;
		} catch (err) {
			console.log("Error", err);
		}
	}

	async function fetchSafesSharedWithUser(userAddress) {
		let provider;
		if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {
			provider = new ethers.providers.JsonRpcProvider();
		} else if (process.env.NEXT_PUBLIC_ENVIRONMENT === "testnet") {
			provider = new ethers.providers.JsonRpcProvider(
				process.env.NEXT_PUBLIC_MANTLE_RPC_URL
			);
		}
		try {
			const res = await contract.getSafesSharedWith(userAddress);
			return res;
		} catch (err) {
			console.log("Error", err);
		}
	}

	return (
		<StateContext.Provider
			value={{
				address,
				createSafe,
				addAllowed,
				removeAllowed,
                deleteSafe,
				fetchUserSafes,
				fetchSafesSharedWithUser,
			}}
		>
			{children}
		</StateContext.Provider>
	);
}

export function useStateContext() {
	return useContext(StateContext);
}
