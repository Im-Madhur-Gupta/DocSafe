import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Gnosis } from "@thirdweb-dev/chains";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={Gnosis}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
