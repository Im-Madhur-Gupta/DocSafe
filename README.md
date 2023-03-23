### Poly-Safe
Poly-Safe is a web application that allows users to create decentralized safes for storing and sharing files. The safes are secured with encryption and can only be accessed by authorized parties.

## Features
- Create a new safe
- Upload files to a safe
- Share safe with specific users
- Grant or revoke access to a safe for specific user
- Download files from a safe
- Delete files from a safe
- Delete a safe

## How it works
Poly-Safe uses **IPFS** to make sure that the files stored in the safes are always available and **Polybase** so files are encrypted, can only be accessed by authorized adresses. 

## Potential use cases

- Sharing wallet-to-wallet encrypted files: Users can create a safe and share it with other users to securely exchange wallet-to-wallet encrypted files.
- Token gated access: Users can create a safe and grant access to it only to users who hold a specific token. This can be useful for sharing sensitive information or resources within a community or a DAO.

## Getting started
- `yarn` to install dependencies.
- `npm run dev` to start project in development mode.

## Technologies used

- React
- Next
- Ethers
- IPFS
- Polybase

## License
Poly-Safe is released under the MIT License
