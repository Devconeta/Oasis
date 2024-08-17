import { expect } from "chai";
import { ethers, getNamedAccounts, deployments } from "hardhat";

describe("Papers tests", function () {
  let deployer: string;
  let receiver: string;

  before(async () => {
    ({ deployer, receiver } = await getNamedAccounts());
  });

  async function deployContracts() {
    await deployments.fixture(["all"]);
    return {};
  }

  it("", async function () {});
});
