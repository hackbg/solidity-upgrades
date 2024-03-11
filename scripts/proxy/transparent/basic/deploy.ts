import { ethers, network, upgrades } from "hardhat";

async function main() {
  const ContractV1 = await ethers.getContractFactory("V1");
  console.log("Deploying Contract V1 to", network.name);

  const deployArgs = [1];
  const contractV1 = await upgrades.deployProxy(ContractV1, deployArgs, {
    initializer: "initialize",
  });

  await contractV1.waitForDeployment();

  console.log("Contract V1 deployed to:", await contractV1.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
