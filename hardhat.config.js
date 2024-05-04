require("@nomicfoundation/hardhat-toolbox");
require("@chainsafe/hardhat-ts-artifact-plugin");
require("@nomicfoundation/hardhat-web3-v4");
require("@chainsafe/hardhat-plugin-multichain-deploy");
const { Environment } = require("@buildwithsygma/sygma-sdk-core");
require('dotenv').config();

const config = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://ethereum-sepolia.publicnode.com",
      accounts: process.env.PK ? [process.env.PK] : [],
    },
    cronos: {
      chainId: 338,
      url: "https://evm-t3.cronos.org",
      accounts: process.env.PK ? [process.env.PK] : [],
    },
    holesky: {
      chainId: 17000,
      url: "https://ethereum-holesky-rpc.publicnode.com",
      accounts: process.env.PK ? [process.env.PK] : [],
    }
  },
  multichain: {
    environment: Environment.TESTNET,
  }
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = config;