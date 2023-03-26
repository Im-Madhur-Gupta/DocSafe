
const { ethers, getNamedAccounts } = require("hardhat");


async function main() {
  const { deployer, } = await getNamedAccounts();

  const accessNFT = await ethers.getContract("AccessNFT", deployer);
  console.log("----------------------------------------------------");
	console.log(`1) Minting NFTs...`);
  const tx1 = await accessNFT.safeMint(deployer);
	await tx1.wait(1);
  console.log("Successfully minted NFT");
	console.log("----------------------------------------------------");
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
