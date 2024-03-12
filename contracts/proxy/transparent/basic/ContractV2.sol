// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ContractV2 is Initializable {
    // V1 storage
    // This slot will be shared with next versions of the contract
    uint256 public number;

    // Important!
    // If you add new state variables, you should add them after the existing ones.
    // Otherwise, Solidity will overwrite the existing variables.

    // V2 storage
    // This slot will be shared with next versions of the contract
    string public text;

    function increase() external {
        number += 2;
    }

    function decrease() external {
        number -= 1;
    }

    function setText(string memory _text) external {
        text = _text;
    }
}
