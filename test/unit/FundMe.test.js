const {ethers, deployments, getNamedAccounts} = require("hardhat")
const {assert, expect} = require("chai")

describe ("FundMe", async function () {
    let fundMe
    let mockV3Aggregator
    let deployer
    const sendValue = ethers.utils.parseEther("1")

    beforeEach (async () => {
        // accounts = await ethers.getSigners()
        deployer = (await getNamedAccounts).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
    })

    describe ("contructor", async function () {
        it ("Sets the Aggregator address", async () => {
            const response = await fundMe.getPriceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe ("fund", async function () {
        it ("Fails if dosn't get enough ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
        })
        // it ("Updates addressToAmountFunded data-structure", async function () {
        //     await fundMe.fund({value: sendValue})
        //     const response = await fundMe.addressToAmountFunded(deployer)
        //     assert.equal(response.toString(), sendValue.toString())
        // })
    //     it ("Adds funders to the funders array", async function () {
    //         await fundMe.fund({value: sendValue})
    //         const funder = fundMe.funders(0)
    //         assert.equal(funder, deployer)
    //     })
    // })

    describe ("withdraw", async () => {
        beforeEach (async () => {
            await fundMe.fund({value: sendValue})
        })

    //     it ("Withdraw ETH from funder", async () => {
    //         // Arrange
    //         const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
    //         const startingDeployerBalance = await fundMe.provider.getBalance(deployer)
    //         // Act
    //         const transactionResponse = await fundMe.withdraw()
    //         const transactionReciept = await transactionResponse.wait(1)
    //         // gas
    //         const {gasUsed, effectiveGasPrice} = transactionReciept
    //         const gasCost = gasUsed.mul(effectiveGasPrice)

    //         const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
    //         const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
    //         // Assert
    //         assert.equal(endingDeployerBalance, 0)
    //         assert.equal(
    //             startingFundMeBalance.add(startingDeployerBalance).toString(), 
    //             endingDeployerBalance.add(gasCost).toString()
    //         )
            // it ("Allows multiple funders to send fund", async () => { 
            //     // Arrange
            //     const accounts = await ethers.getSigners()
            //     for (let i=1; i<6; i++) {
            //         const fundMeConnectedContract = await fundMe.connect(accounts[i])
            //         await fundMeConnectedContract.fund({value: sendValue})
            //     }
            //     const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
            //     const startingDeployerBalance = await fundMe.provider.getBalance(deployer)
                
            //     // Act
            //     const transactionResponse = await fundMe.withdraw()
            //     const transactionReciept = await transactionResponse.wait(1)
            //     // gas
            //     const {gasUsed, effectiveGasPrice} = transactionReciept
            //     const gasCost = gasUsed.mul(effectiveGasPrice)
            //     const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
            //     const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
            //     // Assert
            //     assert.equal(endingDeployerBalance, 0)
            //     assert.equal(
            //         startingFundMeBalance.add(startingDeployerBalance).toString(), 
            //         endingDeployerBalance.add(gasCost).toString()
            //     )

            //     await expect(fundMe.funders(0)).to.be.reverted

            //     for (let i=1; i<6; i++) {
            //         assert.equal(
            //             await fundMe.addressToAmountFunded(accounts[i].address),
            //             0
            //         )
            //     }
            // })
            it ("Allows only owner to withdraw", async () => {
                const accounts = await ethers.getSigners()
                const attacker = accounts[1]
                const attackerConnectedAccount = await fundMe.connect(attacker)
                await expect(attackerConnectedAccount.withdraw()).to.be.revertedWith("FundMe__NotOwner")
            })
        })
    })
})