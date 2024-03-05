// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract V2 is Initializable {
   uint256 public number;

   function initialize(uint256 _number) external initializer {
       number = _number;
   }

   function increase() external {
       number += 2;
   }

   function decrease() external {
       number -= 1;
   }
}
