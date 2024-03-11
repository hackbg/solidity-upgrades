import { ethers, upgrades } from "hardhat";

const deployedProxyAddress = "ADDRESS_OF_DEPLOYED_PROXY_CONTRACT";

async function main() {
  const MyTokenV2 = await ethers.getContractFactory("MyTokenV2");
  console.log("Upgrading MyTokenV1...");

  const [owner] = await ethers.getSigners();

  const upgradeArgs = [owner.address];
  await upgrades.upgradeProxy(deployedProxyAddress, MyTokenV2, {
    call: { fn: "upgrade", args: upgradeArgs },
  });
  console.log("MyTokenV1 upgraded to MyTokenV2");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
