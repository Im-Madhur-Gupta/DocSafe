import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Gnosis, ChiadoTestnet } from "@thirdweb-dev/chains";
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={ChiadoTestnet}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  )
}

export default MyApp
