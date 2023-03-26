<h1 align="center">DocSafe</h1>
<p align="center">
  <img width="400" alt="docsafe-logo" src="https://user-images.githubusercontent.com/76112446/227755336-93c8706e-01bd-4bb8-ae48-2a750958195d.png">
</p>
DocSafe is a platform that allows users to create decentralized safes for storing and sharing files. The safes are secured with encryption and can only be accessed by authorized parties.

## Features
- Create a new safe
- Upload encrypted files to a safe
- Share safe with specific users
- Grant or revoke access to a safe for specific user
- Download files from a safe
- Delete files from a safe
- Delete a safe

## How it works
DocSafe ensures that the encrypted files stored in the safes are easily accessible by utilizing the **IPFS**. Additionally, it employs a smart contract to store the safe's information, thereby ensuring that the safes can only be accessed by authorized addresses.

## Potential use cases

- Sharing wallet-to-wallet encrypted files: Users can create a safe and share it with other users to securely exchange wallet-to-wallet encrypted files.
- Token gated access: Users can create a safe and grant access to it only to users who hold a specific token. This can be useful for sharing sensitive information or resources within a community or a DAO.

## Getting started
- `yarn` to install dependencies.
- `npm run dev` to start project in development mode.

## Technologies used

- Next.js
- Ethers.js
- IPFS
- Mantle
