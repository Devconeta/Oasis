# Oasis: Decentralized Funding for Research

## Introduction

In the research world, securing funding is one of the greatest challenges. Researchers often face financial barriers to carrying out their projects, and financial support is often uncertain or limited. Our project aims to transform this reality by providing a completely decentralized, accessible, and blockchain-based funding system.

## Problem

Currently, the research funding process faces several issues:

1. **Limited Access to Funds:** Researchers often rely on government grants or large organizations, which can be restrictive and competitive.
2. **Lack of Transparency:** The allocation of funds and how they are distributed often lack transparency.
3. **Insufficient Incentives:** Sponsors do not always have a tangible incentive to support research that may not have an immediate impact or that may not be of personal interest.

## Solution

Our decentralized system leverages cutting-edge technologies to address these issues:

- **NFTs (Non-Fungible Tokens):** Each research project is represented by an NFT linked to the corresponding research paper. These NFTs allow researchers to set prices and issue a fixed number of copies. This way, researchers have full ownership of monetizing their research.
- **Blockchain:** We use blockchain technology to ensure the transparency and security of transactions. Each funding transaction is recorded on the blockchain, ensuring the process is auditable and transparent.
- **IPFS (InterPlanetary File System):** Research papers are stored on IPFS, a distributed file system that ensures the integrity and availability of documents over time.
- **The Graph:** We implement The Graph to efficiently index and query data on the blockchain. This enables seamless integration between the frontend and the smart contracts managing NFTs and transactions.

## Roadmap

### First Step:

<!--

- Subida de archivos a IPFS
- Contrato NFT
- Sistema de Royalties
- Frontend para subida y busqueda
  paper
- Frontend Profile
- Creacion de Grafo
- Sistema de Referencias
 -->

1. **Frontend:**

   - Researchers can upload their papers to IPFS through an intuitive interface. They can also set the price of their NFTs and define the number of copies available.
   - Other users can access a dashboard to view trending papers, filter by topics, sort, and search by various keywords.

2. **Royalties System:** We implement a royalties system that ensures the original author of the research and relevant references receive fair compensation every time a transaction involving the associated NFT occurs.

3. **Indexation and trending papers**: Using [TheGraph](https://thegraph.com/) we create a subgraph that allow us to query the best papers now looking for investor or that just are having more views or moving bug funding volumes!

4. **Transparency and Security:** Thanks to blockchain and the implementation of smart contracts, all aspects of funding and royalty distribution are fully transparent and secure.

### Next iterations:

- **Airdrop System:** Launch a system to distribute free NFTs to early supporters and potential users to increase awareness and engagement with the platform.

- **Gallery Frontend:** Develop a user-friendly gallery interface where users can browse, search, and view research papers and associated NFTs with details.

- **KYC for Researchers:** Implement a Know Your Customer (KYC) process to verify the identity of researchers, ensuring authenticity and credibility on the platform.

- **Graph Viewer Frontend:** Create a frontend interface for visualizing and interacting with graph data, providing insights into research networks and connections.

- **Funding Frontend:** Build an interface for users to contribute funds in many other ways to research projects, manage their investments, and track the progress of funded projects.

## Technologies Used

- **Blockchain:** To ensure the integrity and transparency of transactions.
- **IPFS:** For decentralized storage of research papers.
- **The Graph:** For indexing and querying data on the blockchain.
- **Smart Contracts:** To manage the issuance of NFTs, funding, and the royalties system.

## How It Works

1. **Creating an NFT:** A researcher uploads their paper to IPFS and creates an NFT associated with their research using a smart contract.The researcher sets the price and number of copies of the NFT available.
2. **Minting NFT and Supporting:** Users purchase NFTs to support the research. The funds raised are allocated to the researcher.
3. **Royalties:** Every time an NFT is sold on the internal marketplace, royalties are distributed to the research author and relevant references.

## How to run this

TBD @gonzaotc

## Contributing

We are looking for passionate collaborators to help bring this project to life. If you are interested in contributing, please visit our repository on [GitHub](https://github.com/Devconeta/Oasis).

## License

This project is licensed under the MIT License.
