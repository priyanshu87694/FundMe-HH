require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy")


const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "0x00"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x00"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0x00"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "0x00"

module.exports = {
  // solidity: "0.8.8",
  solidity: {
    compilers: [
      {version: "0.8.8"},
      {version: "0.6.6"}
    ]
  },
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      // rinkeby chainId
      chainId: 4,
      blockConfirmation: 6,
    },
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "INR",
    coinmarketCap: COINMARKETCAP_API_KEY,
    // token: "MATIC",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  }
};
