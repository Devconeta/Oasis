# Oasis: Decentralized Funding for Research

## Introduction

In the research world, securing funding is one of the greatest challenges. Researchers often face financial barriers to carrying out their projects, and financial support is often uncertain or limited. Our project aims to transform this reality by providing a completely decentralized, accessible, transparent and blockchain-based funding system. We are building a connected and queriable network of references of on-chain papers that get funded by science supporters.

## Problem

Currently, the research funding process faces several issues:

1. **Limited Access to Funds:** Researchers often rely on government grants or large organizations, which can be restrictive and competitive.
2. **Lack of Transparency:** The allocation of funds and how they are distributed often lack transparency.
3. **Insufficient Incentives:** Sponsors do not always have a tangible incentive to support research that may not have an immediate impact or that may not be of personal interest.
4. **Complexity of tracking references between digital papers**

## Solution

Our decentralized system for research funding leverages the following tech to address these issues:

- **Research/Paper ERC-1155 NFTs (Non-Fungible Tokens):** Each research project is represented by an NFT permanentely representing the corresponding research paper. These NFTs allow researchers to reward sponsors issuing a fixed number of copies. This way, researchers have full ownership of monetizing their research, and sponsors can trade the copies of the researchs.
- **Blockchain:** We use blockchain technology to ensure the transparency and secure distribution of funds. Each funding transaction is recorded on the blockchain, ensuring the process is auditable and transparent.
- **IPFS (InterPlanetary File System):** Research papers are stored on IPFS, a distributed file system that ensures the integrity and availability of documents over time.
- **The Graph:** We implement The Graph to efficiently index and query data on the blockchain. This enables seamless integration between the frontend and the smart contracts managing NFTs and transactions. The main goal is to index the on-chain references between papers, a common used index on science to indicate importance and influence. 

## Roadmap

### First Step:

1. **Frontend:**

   - Researchers can upload their papers to IPFS through an intuitive interface. They will set all the references for other on-chain papers to generate a connected network, and they can also set the minimun funding of their NFTs and define the number of copies available.
   - Other users can access a dashboard to view trending papers, filter by topics, sort by references, trading volume, and search by various keywords.

2. **Royalties System:** We implement a royalties system that ensures the original author of the research and relevant references receive fair compensation every time a transaction involving the associated NFT occurs. Also, we're implementing an additional and optional referenceRoyalty, where previous works refered on the paper will also get a small percentage of the funding.

3. **Indexation and trending papers**: Using [TheGraph](https://thegraph.com/) we create a subgraph that allow us to query the best papers now looking for funding, the most on-chain referenced ones or by higher trading volume.

4. **Transparency and Security:** Thanks to blockchain and the implementation of smart contracts, all aspects of funding and royalty distribution are fully transparent and secure.

### Next iterations:

- **Gallery Frontend:** Develop a user-friendly gallery interface where users can browse, search, and view research papers and associated NFTs with details.

- **Graph Viewer Frontend:** Create a frontend interface for visualizing and interacting with graph data, providing insights into research networks, references, and connections.

- **Funding Frontend:** Build an interface for users to contribute funds in many other ways to research projects, manage their investments, and track the progress of funded projects.

- **Marketplace integration:** Integrate the Papers into popular NFT Marketplaces to be openly traded and generate larger funding for the researcher.

## Technologies Used

- **EVM Smart Contracts:** To ensure the integrity and transparency of transactions.
- **IPFS:** For decentralized storage of research papers.
- **The Graph:** For indexing and querying data on the blockchain.
- **Smart Contracts:** To manage the issuance of NFTs, funding, and the royalties system.

## Paper.sol Contract

```solidity
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
```

## Contributing

We are looking for passionate collaborators to help bring this project to life. If you are interested in contributing, please visit our repository on [GitHub](https://github.com/Devconeta/Oasis).

## License

This project is licensed under the MIT License.
