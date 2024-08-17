/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    sources: "./src",
    tests: "./tests",
    cache: "./cache",
    artifactSSSs: "./artifacts",
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
  },
  mocha: {
    timeout: 40000,
  },
};
