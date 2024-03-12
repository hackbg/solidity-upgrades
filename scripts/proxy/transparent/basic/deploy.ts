import { ethers, network, upgrades } from "hardhat";

async function main() {
  const ContractV1 = await ethers.getContractFactory("ContractV1");
  console.log("Deploying ContractV1 to", network.name);

  const deployArgs = [1];
  const contractV1 = await upgrades.deployProxy(ContractV1, deployArgs, {
    initializer: "initialize",
  });

  await contractV1.waitForDeployment();

  console.log("ContractV1 deployed to:", await contractV1.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
