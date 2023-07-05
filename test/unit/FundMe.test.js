const { assert } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe" , async function(){
    let fundMe
    let deployer
    let mockV3Aggregator
    beforeEach(async ()=> {
        //deploy our fundMe contract using hardhat-deploy
        deployer = (await getNamedAccounts()).deployer
        console.log(0)
        // const accounts = await ethers.getSigners()
        // const accountZero = accounts[0]
        //above 2 are also ways of getting account or deployer
        await deployments.fixture(["fundMe"])
        console.log(1)
        fundMe = await ethers.getContract("FundMe")
        console.log(fundMe)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator")
        console.log(2.5)
    });
    describe("constructor" , async function() {
        console.log("3")
        it("sets the aggregator addresses correctly" , async ()=> {
            console.log(4)
            const response = await fundMe.getpriceFeed()
            assert.equal(response,mockV3Aggregator.address)
        })
    })
    // describe("fund" , function() {
    //     it("fails if you dont send enough eth" , async()=>{
    //         await fundMe.fund()
    //     })
    // })
})