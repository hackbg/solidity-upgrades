import { ethers, upgrades } from "hardhat";

const deployedProxyAddress = "ADDRESS_OF_DEPLOYED_PROXY_CONTRACT";

async function main() {
  const ContractV2 = await ethers.getContractFactory("ContractV2");
  console.log("Upgrading Contract...");

  await upgrades.upgradeProxy(deployedProxyAddress, ContractV2);
  console.log("ContractV1 upgraded to ContractV2");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
