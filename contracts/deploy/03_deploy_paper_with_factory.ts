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
  const { deployments } = hre;

  /* 2. Deploy Paper */
  const constructorArgs: ConstructorArgs = {
    _references: [ZeroAddress, ZeroAddress],
    _initialuri: "ipfs://0x",
    _baseFundingPrice: ethers.parseEther("0.001"),
    _referenceRoyalty: 2, // 2%
  };

  const paperFactoryDeployment = await deployments.get("PaperFactory");
  const paperFactory = await ethers.getContractAt("PaperFactory", paperFactoryDeployment.address);

  const creationTx = await paperFactory.createPaper(
    constructorArgs._references,
    constructorArgs._initialuri,
    constructorArgs._baseFundingPrice,
    constructorArgs._referenceRoyalty
  );
  await creationTx.wait();

  console.log("Paper deployed");
};

export default func;
func.tags = ["all", "03", "paper"];
func.dependencies = ["paper-factory"];
