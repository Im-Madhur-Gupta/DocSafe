import { useContext, createContext } from "react";
import {
	useAddress,
	useContract,
	useMetamask,
	useContractWrite,
	useContractRead,
} from "@thirdweb-dev/react";


const StateContext = createContext();

export function StateContextProvider({ children }) {

    const address = useAddress();
    const connect = useMetamask();

    return (
        <StateContext.Provider
            value={{
                address,
                connect,
            }}
        >
            {children}
        </StateContext.Provider>
    )


}

export function useStateContext() {
	return useContext(StateContext);
}
