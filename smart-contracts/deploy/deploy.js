const { network } = require("hardhat");
const fs = require("fs");

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    console.log(`------Deployer is ${deployer}------------`);
    const chainId = network.config.chainId;
    console.log(`------ChainId is ${chainId}------------`);
    log("----------------------------------------------------")
    log(`1) Deploying FileManager...`);
    const fileManager=await deploy("FileManager", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations:network.config.blokConfirmations || 1,
    });
    log("Successfully deployed FileManager");
    log("----------------------------------------------------");
    log("----------------------------------------------------")
    log(`1) Deploying AccessNFT...`);
    const accessNFT=await deploy("AccessNFT", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations:network.config.blokConfirmations || 1,
    });
    log("Successfully deployed AccessNFT");
    log("----------------------------------------------------");

    fs.writeFileSync(
        "../client/constants/index.js",
        `export const fileManagerAddress = "${fileManager.address}"`
    )
}


module.exports.tags = ["All"]