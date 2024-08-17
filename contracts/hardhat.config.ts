import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
require("dotenv").config();

const baseConfig: HardhatUserConfig = {
  solidity: "0.8.24",
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    receiver: {
      default: 1,
    },
    zeroAddress: {
      default: "0x0000000000000000000000000000000000000000",
    },
    oneAddress: {
      default: "0x0000000000000000000000000000000000000001",
    },
    twoAddress: {
      default: "0x0000000000000000000000000000000000000002",
    },
  },
  networks: {
    localhost: {
      saveDeployments: true,
    },
    hardhat: {
      saveDeployments: true,
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      chainId: 534351,
      accounts: [process.env.PRIVATE_KEY || ""],
      saveDeployments: true,
    },
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: {
      scrollSepolia: process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
};

export default baseConfig;
