// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Paper.sol";

/// @title PaperFactory
/// @notice This contract is a factory for creating instances of the Paper contract.
/// @dev This contract uses the Paper contract to create new papers and emits an event upon creation.
contract PaperFactory {
    /// @notice Emitted when a new Paper contract is created.
    /// @param paper The address of the newly created Paper contract.
    /// @param owner The address of the creator/owner of the Paper contract.
    event PaperCreated(address indexed paper, address indexed owner);

    /// @notice Creates a new instance of the Paper contract.
    /// @dev Deploys a new Paper contract and emits the PaperCreated event.
    /// @param _references An array of addresses representing references for the Paper contract.
    /// @param _initialuri A string representing the initial URI for the Paper metadata.
    /// @param _baseFundingPrice A uint256 representing the base funding price required for the Paper.
    /// @param _referenceRoyalty A uint256 representing the royalty percentage for references in basis points (1/100 of a percent).
    function createPaper(
        address[] memory _references,
        string memory _initialuri,
        uint256 _baseFundingPrice,
        uint256 _referenceRoyalty
    ) external {
        Paper paper = new Paper(
            _references,
            _initialuri,
            _baseFundingPrice,
            _referenceRoyalty
        );
        emit PaperCreated(address(paper), msg.sender);
    }
}
