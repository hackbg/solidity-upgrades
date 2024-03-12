const { expect } = require("chai");

describe("Contract V2 (Proxy)", function () {
  let ContractV1;
  let contractV1;
  let ContractV2;
  let contractV2;

  beforeEach(async function () {
    ContractV1 = await ethers.getContractFactory("ContractV1");
    ContractV2 = await ethers.getContractFactory("ContractV2");

    contractV1 = await upgrades.deployProxy(ContractV1, [42], {
      initializer: "initialize",
    });
    contractV2 = await upgrades.upgradeProxy(await contractV1.getAddress(), ContractV2);
  });

  it("number is increased correctly", async function () {
    await contractV2.increase();

    expect((await contractV2.number()).toString()).to.equal("44");
  });
});
