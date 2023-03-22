import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Gnosis, ChiadoTestnet } from "@thirdweb-dev/chains";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { extendTheme } from "@chakra-ui/react";
import { PolybaseProvider, AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { usePolybase, useDocument } from "@polybase/react";
import { Auth } from "@polybase/auth";

const polybase = new Polybase({
  defaultNamespace:
    "pk/0x34d5564c5d359879ee5cad5e01f6094a4ca6f695fc9091296d8fbdf27c0d670bfffe2cd69af2fefe318cf22867c3e614dbee68caf71e3129d94a6b0f4459986b/poly-safe-app",
});
const auth = typeof window !== "undefined" ? new Auth() : null;

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
        <PolybaseProvider polybase={polybase}>
          <AuthProvider auth={auth} polybase={polybase}>
            <Component {...pageProps} />
          </AuthProvider>
        </PolybaseProvider>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
