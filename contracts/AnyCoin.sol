// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// ==================== External Imports ====================

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title AnyCoin
/// @author Danile Liu
/// @notice Anybody can mint and burn
contract AnyCoin is ERC20 {
    // ==================== Variables ====================

    uint8 private immutable _decimals;

    // ==================== Constructor function ====================

    /// @param name_        Name of the AnyCoin
    /// @param symbol_      Symbol of the AnyCoin
    /// @param decimals_    Decimals of the AnyCoin
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) ERC20(name_, symbol_) {
        _decimals = decimals_;
    }

    // ==================== External functions ====================

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address to, uint256 amount) external {
        _burn(to, amount);
    }
}
