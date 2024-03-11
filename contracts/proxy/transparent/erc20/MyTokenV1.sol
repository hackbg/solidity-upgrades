// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract MyTokenV1 is ERC20Upgradeable {
  function initialize() initializer public {
    __ERC20_init("MyToken", "MTK");
    _mint(msg.sender, 1000000 * 10 ** decimals());
  }
}
