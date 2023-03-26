import { ThirdwebProvider } from "@thirdweb-dev/react";
import { MantleTestnet,Localhost } from "@thirdweb-dev/chains";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { extendTheme } from "@chakra-ui/react";
import { StateContextProvider } from "../context";


const theme = extendTheme({
	colors: {
		brand: {
			100: "#4285F4",
		},
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider activeChain={MantleTestnet}>
			<ChakraProvider theme={theme}>
				<StateContextProvider>
					<Component {...pageProps} />
				</StateContextProvider>
			</ChakraProvider>
		</ThirdwebProvider>
	);
}

export default MyApp;
