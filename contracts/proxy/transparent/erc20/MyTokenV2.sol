// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyTokenV2 is ERC20Upgradeable, OwnableUpgradeable {
  function upgrade(address initialOwner) reinitializer(2) public {
      __Ownable_init(initialOwner);
  }

  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
  }
}
