import { useContext, createContext } from "react";
import {
	useAddress,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";


const StateContext = createContext();

export function StateContextProvider({ children }) {

    const address = useAddress();
    const contractAddress=""

    return (
        <StateContext.Provider
            value={{
                address,
            }}
        >
            {children}
        </StateContext.Provider>
    )


}

export function useStateContext() {
	return useContext(StateContext);
}
