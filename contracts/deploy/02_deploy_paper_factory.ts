import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying PaperFactory with the following constructor args: ");
  await deploy("PaperFactory", {
    from: deployer,
    log: true,
  });
  const paperFactoryDeployment = await deployments.get("PaperFactory");
  const paperFactoryAddress = paperFactoryDeployment.address;
  console.log("PaperFactory deployed at: ", paperFactoryAddress, "\n");
};

export default func;
func.tags = ["all", "02", "paper-factory"];
