const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
	const { deployer } = await getNamedAccounts();

	const fileManager = await ethers.getContract("FileManager", deployer);
	console.log("----------------------------------------------------");
	console.log(`1) Whitelisting NFT...`);
	const tx1 = await fileManager.addAccessNFT(
		"IMP",
		"0x82a19bA235Bc0B76113Ae4519aF6dfBc87AE728C"
	);
	await tx1.wait(1);
	console.log("Successfully whitelisted NFT");
	console.log("----------------------------------------------------");
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
