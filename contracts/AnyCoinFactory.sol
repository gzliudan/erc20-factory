// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// ==================== Internal Imports ====================

import { AnyCoin } from "./AnyCoin.sol";

error EmptyName();
error EmptySymbol();

/// @title AnyCoin
/// @author Danile Liu
/// @notice Anybody can create AnyCoin
contract AnyCoinFactory {
    // ==================== Events ====================

    event CreateAnyCoin(address indexed creater, address indexed token);

    // ==================== External functions ====================

    /// @param name_        Name of the AnyCoin
    /// @param symbol_      Symbol of the AnyCoin
    /// @param decimals_    Decimals of the AnyCoin
    /// @return             Address of the newly created AnyCoin
    function createAnyCoin(
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) external returns (address) {
        if (bytes(name_).length == 0) {
            revert EmptyName();
        }

        if (bytes(symbol_).length == 0) {
            revert EmptySymbol();
        }

        AnyCoin anyCoin = new AnyCoin(name_, symbol_, decimals_);

        emit CreateAnyCoin(msg.sender, address(anyCoin));

        return address(anyCoin);
    }
}
