// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ContractV1 is Initializable {
    // V1 storage
    // This slot will be shared with next versions of the contract
    uint256 public number;

    function initialize(uint256 _number) external initializer {
        number = _number;
    }

    function increase() external {
        number += 1;
    }
}
