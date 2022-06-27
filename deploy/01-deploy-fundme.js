const {networkConfig} = require("../helper-hardhat-config")
const {network} = require("hardhat")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const {chainId} = network.config.chaindId

    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    const fundMe = await deploy("fundMe", {
        from: deployer,
        args: [],
        log: true
    })
}