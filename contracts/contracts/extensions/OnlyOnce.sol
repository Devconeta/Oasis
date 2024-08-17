// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

abstract contract OnlyOnce {
    mapping(bytes32 => bool) private _done;

    modifier onlyOnce(bytes32 key) {
        require(!_done[key], "OnlyOnce: action already done");
        _done[key] = true;
        _;
    }
}
