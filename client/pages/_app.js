import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Gnosis, ChiadoTestnet } from "@thirdweb-dev/chains";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		brand: {
      100: "#4285F4",
    },
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider activeChain={ChiadoTestnet}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</ThirdwebProvider>
	);
}

export default MyApp;
