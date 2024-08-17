// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "./extensions/OnlyOnce.sol";

/**
 * @title Paper
 * @dev ERC1155 token contract designed for research papers funding and distribution.
 *      This contract allows researchers to receive funding in exchange for NFT units, 
 *      representing a stake in their research project.
 */
contract Paper is
    ERC1155,
    Ownable,
    ERC1155Burnable,
    ERC1155Supply,
    ERC1155URIStorage,
    ReentrancyGuard,
    OnlyOnce
{
    /**
     * @dev Emitted when a reference to another paper is created.
     * @param from The address of this contract.
     * @param to The address of the referenced paper.
     */
    event ReferencePaper(address indexed from, address indexed to);

    /**
     * @dev Emitted when the paper receives funding.
     * @param from The address of the funder.
     * @param amount The amount of ETH received.
     * @param mintedUnits The number of NFT units minted in exchange for the funding.
     */
    event Funded(address indexed from, uint256 amount, uint256 mintedUnits);

    /// @notice The base funding price in wei required to mint one NFT unit.
    uint256 public baseFundingPrice;

    /// @notice The percentage of the funding to be distributed as royalties to referenced papers.
    uint256 public referenceRoyalty;

    /// @notice List of addresses representing referenced papers.
    address[] public references;

    /// @notice Maps referenced paper addresses to their accumulated royalty balances.
    mapping(address => uint256) public referenceBalances;

    /**
     * @dev Constructor to initialize the Paper contract.
     * @param _references List of addresses representing referenced papers.
     * @param _initialuri Initial URI for the token metadata.
     * @param _baseFundingPrice The base funding price in wei required to mint one NFT unit.
     * @param _referenceRoyalty The percentage of the funding to be distributed as royalties.
     */
    constructor(
        address[] memory _references,
        string memory _initialuri,
        uint256 _baseFundingPrice,
        uint256 _referenceRoyalty
    ) ERC1155(_initialuri) Ownable(msg.sender) {
        references = _references;
        baseFundingPrice = _baseFundingPrice;
        referenceRoyalty = _referenceRoyalty;

        _setURI(_initialuri);
        emit URI(_initialuri, 1); // Emitting event for the initial URI
        for (uint256 i = 0; i < _references.length; i++) {
            emit ReferencePaper(address(this), _references[i]);
        }
    }

    /**
     * @notice Updates the URI for the token metadata.
     * @dev This function can only be called once by the owner.
     * @param _newuri The new URI to set for the token metadata.
     */
    function publishPaper(
        string memory _newuri
    ) public onlyOwner onlyOnce(keccak256("setURI")) {
        _setURI(_newuri);
        emit URI(_newuri, 1);
    }

    /**
     * @notice Allows users to fund the research project in exchange for NFT units.
     * @dev The number of NFT units minted is based on the amount of ETH sent. 
     *      A portion of the funding is distributed as royalties to referenced papers.
     */
    function fund() external payable nonReentrant {
        require(msg.value >= baseFundingPrice, "Funding amount too low");

        uint256 unitsToMint = msg.value / baseFundingPrice;

        /* Distribute royalties to references */
        uint256 totalRoyalties = (msg.value * referenceRoyalty) / 100;
        for (uint256 i = 0; i < references.length; i++) {
            uint256 royaltyShare = totalRoyalties / references.length;
            referenceBalances[references[i]] += royaltyShare;
            payable(references[i]).transfer(royaltyShare);
        }

        /* Transfer the remaining amount to the contract owner */
        uint256 remaining = msg.value - totalRoyalties;
        payable(owner()).transfer(remaining);

        _mint(msg.sender, 1, unitsToMint, "");
        emit Funded(msg.sender, msg.value, unitsToMint);
    }

    /**
     * @notice Safe transfer function overridden to include author royalty distribution.
     * @dev Calls the internal _distributeAuthorRoyalty function after transfer.
     * @param from The address of the sender.
     * @param to The address of the recipient.
     * @param id The token ID.
     * @param amount The amount of tokens being transferred.
     * @param data Additional data with no specified format.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override nonReentrant {
        super.safeTransferFrom(from, to, id, amount, data);
        /* Distribute royalties to the author */
        _distributeAuthorRoyalty(amount);
    }

    /**
     * @notice Batch transfer function overridden to include author royalty distribution.
     * @dev Calls the internal _distributeAuthorRoyalty function after transfer.
     * @param from The address of the sender.
     * @param to The address of the recipient.
     * @param ids An array containing the IDs of each token being transferred.
     * @param amounts An array containing the amount of each token being transferred.
     * @param data Additional data with no specified format.
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public override nonReentrant {
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
        uint256 totalAmount;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        /* Distribute royalties to the author */
        _distributeAuthorRoyalty(totalAmount);
    }

    /**
     * @dev Internal function to distribute royalties to the author on transfers.
     * @param amount The amount of tokens being transferred.
     */
    function _distributeAuthorRoyalty(uint256 amount) internal {
        uint256 authorRoyalty = (amount * referenceRoyalty) / 100;
        payable(owner()).transfer(authorRoyalty);
    }

    /**
     * @dev Internal function override to include custom logic for updating balances.
     * @param from The address from which tokens will be transferred.
     * @param to The address to which tokens will be transferred.
     * @param ids An array containing the IDs of each token being transferred.
     * @param values An array containing the amount of each token being transferred.
     */
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }

    /**
     * @notice Returns the URI for the token metadata.
     * @dev This function is overridden to retrieve the URI from the ERC1155URIStorage extension.
     * @param id The token ID for which the URI is being requested.
     * @return The URI string for the token metadata.
     */
    function uri(
        uint256 id
    ) public view override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return super.uri(id);
    }
}
