require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    "mantle-testnet": {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [process.env.PRIVATE_KEY]
    },
    hardhat: {
			chainId: 1337,
			blockConfirmations:1,
		},
    localhost: {
			chainId: 1337,
			blockConfirmations:1,
		},
  },
  namedAccounts: {
		deployer: {
			default: 0,
		},
  },
  paths: {
		artifacts: "../client/artifacts",
	},
};
