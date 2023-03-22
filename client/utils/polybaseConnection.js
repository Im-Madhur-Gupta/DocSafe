import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { Auth } from "@polybase/auth";
// const { Polybase } = require("@polybase/client");
// const { ethPersonalSign } = require("@polybase/eth");

// const db = new Polybase({
//   defaultNamespace:
//     "pk/0x34d5564c5d359879ee5cad5e01f6094a4ca6f695fc9091296d8fbdf27c0d670bfffe2cd69af2fefe318cf22867c3e614dbee68caf71e3129d94a6b0f4459986b/poly-safe-app",
// });

// const db = new Polybase({
//   signer: (data) => {
//     return {
//       h: "pk/0x34d5564c5d359879ee5cad5e01f6094a4ca6f695fc9091296d8fbdf27c0d670bfffe2cd69af2fefe318cf22867c3e614dbee68caf71e3129d94a6b0f4459986b/poly-safe-app",
//       sig: ethPersonalSign(wallet.privateKey(), data),
//     };
//   },
// });

// const auth = typeof window !== "undefined" ? new Auth() : null;

// const auth = new Auth();

export default async function initializeNewUser() {
  console.log("Auth for new user");
  //   console.log(await auth?.signIn());
  //   const authState = await auth.signIn();
  //   console.log(authState);
  //   console.log(db);
  //   await db.collection("User").create(["0"]);
  // await db.collection("User").call("setName", ["USA"]);
}

// intializeNewUser();
