import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ZeroAddress } from "ethers";
import { ethers } from "hardhat";

interface ConstructorArgs {
  _references: string[];
  _initialuri: string;
  _baseFundingPrice: bigint;
  _referenceRoyalty: number;
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  /* 2. Deploy Paper */
  const constructorArgs: ConstructorArgs = {
    _references: [ZeroAddress, ZeroAddress],
    _initialuri: "ipfs://0x",
    _baseFundingPrice: ethers.parseEther("0.001"),
    _referenceRoyalty: 2, // 2%
  };
  await deploy("Paper", {
    from: deployer,
    log: true,

    args: [
      constructorArgs._references,
      constructorArgs._initialuri,
      constructorArgs._baseFundingPrice,
      constructorArgs._referenceRoyalty,
    ],
  });
  const paperDeployment = await deployments.get("Paper");
  const paperAddress = paperDeployment.address;
  console.log("Paper deployed at: ", paperAddress, "\n");
};

export default func;
func.tags = ["all", "paper"];
