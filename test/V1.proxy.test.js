const { expect } = require("chai");

describe("Cotnract V1 (Proxy)", function () {
  let ContractV1;
  let contractV1;

  beforeEach(async function () {
    ContractV1 = await ethers.getContractFactory("V1");
    contractV1 = await upgrades.deployProxy(ContractV1, [42], {
      initializer: "initialize",
    });
  });

  it("number is initialized", async function () {
    expect((await contractV1.number()).toString()).to.equal("42");
  });
});
