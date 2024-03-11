import { upgrades } from "hardhat";

const proxyAddress = "ADDRESS_OF_DEPLOYED_PROXY_CONTRACT";
const gnosisSafe = "YOUR_GNOSIS_SAFE_ADDRESS";

async function main() {
  console.log("Transferring ownership of ProxyAdmin...");
  await upgrades.admin.transferProxyAdminOwnership(proxyAddress, gnosisSafe);
  console.log("Transferred ownership of ProxyAdmin to:", gnosisSafe);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
