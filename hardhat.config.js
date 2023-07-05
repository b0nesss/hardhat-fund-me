require("dotenv").config();
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const PVT_KEY = process.env.PRIVATE_KEY || "0xc24af90cc12f2283bc8877334bf00162b78066bfa1935341be491de770cbd6aa"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "HF3QTBYJHTZ5VAI5ASJZUMGXW7275R8P5S"
const COINMARKET_API_KEY = process.env.COINMARKETCAP_API_KEY || "48c53d3e-3283-4e06-8082-a9a5c06ad1f3"

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/YAy8on9yCv3Mk2e1kl0uRQ4kecA5_VLu",
      accounts: [PVT_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
  },
  gasReporter: {
    // enabled : true, we dont want it rn
    enabled : false,
    outputFile : "gas-report.txt",
    noColors : true ,
    currency :"USD",
    coinmarketcap : COINMARKET_API_KEY
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 1,
    },
    // users: {
    //   default:1,
    // }
  },
};
