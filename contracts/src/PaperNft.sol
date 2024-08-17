// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaperNft is Ownable, ERC1155 {

    constructor(string memory url) ERC1155(url) Ownable(msg.sender) {}
    
}