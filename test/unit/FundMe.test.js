const {ethers, deployments, getNamedAccounts} = require("hardhat")
const {assert, expect} = require("chai")

describe ("FundMe", function () {
    let fundMe
    let mockV3Aggregator
    let deployer

    beforeEach (async () => {
        deployer = (await getNamedAccounts).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
    })

    describe ("contructor", function () {
        it ("sets the aggregator addresses correctly", async () => {
            const response = await fundMe.getPriceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })
    describe ("fund", function () {
        it ("Fails if you don't send enough ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
        })
    })
})