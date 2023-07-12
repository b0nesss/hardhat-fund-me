//hardhat deploy is lil diff
//we not gonna have main fn here

const { network } = require("hardhat");

// function deployFunc (hre) {

// }
// module.exports.default = deployFunc //here no deployFunc()

// module.exports = async (hre) => {
//     const { getNamedAccounts , deployments} = hre
// }
//can also be written as

const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  //we are using the deployment obj to get two functions
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //in that case we use mock contracts : cif the contract doesnt exit we create a minimal version of it for testing

  //when working on localhost or other local blockchains we want to use
  //seomthing known as mocks bcoz the chainlink pricefeed we have hard coded is for sepolia testnet only
  //but when deploying and playing around with our contracts we dont want to wait that much
  //so we dont always do it on sepolia or any testnet or mainnet so we will parametrize that feed address

  // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]; //this is great and will work for testnet and mainnet but what about those blockchain which doesnt even have a ethUsdPriceAddress??
  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  const args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, //arguments for constructor so we will send pricefeed address here
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    //verify
    await verify(fundMe.address, args);
  }
  log("--------------------");
};

module.exports.tags = ["fundMe", "all"];
