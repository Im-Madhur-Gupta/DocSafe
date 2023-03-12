import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Gnosis,ChiadoTestnet } from "@thirdweb-dev/chains";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={ChiadoTestnet}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
