import { ethers, network, upgrades } from "hardhat";

async function main() {
  const MyTokenV1 = await ethers.getContractFactory("MyTokenV1");
  console.log("Deploying MyTokenV1 to", network.name);

  const myTokenV1 = await upgrades.deployProxy(MyTokenV1, {
    initializer: "initialize",
  });

  await myTokenV1.waitForDeployment();

  console.log("MyTokenV1 deployed to:", await myTokenV1.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
