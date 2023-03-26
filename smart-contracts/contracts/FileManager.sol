// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract FileManager {

    struct Folder {
        string name;
        string cid;
        address owner;
    }

    mapping (uint256 => Folder) folders;
    mapping (uint256 => mapping (address => bool)) allowed;
    uint256 private folderCount;

    function createFolder(string memory _name, string memory _cid) public {
        folderCount++;
        folders[folderCount] = Folder(_name, _cid, msg.sender);
    }

    function addAllowed(string memory _name, address _allowed) public {
        
        for(uint256 i = 1; i <= folderCount; i++) {
            if (keccak256(abi.encodePacked(folders[i].name)) == keccak256(abi.encodePacked(_name))) {
                require(msg.sender == folders[i].owner, "Only owner can add allowed");
                allowed[i][_allowed] = true;
            }
        }

    }

    function removeAllowed(string memory _name, address _allowed) public {

        for(uint256 i = 1; i <= folderCount; i++) {
            if (keccak256(abi.encodePacked(folders[i].name)) == keccak256(abi.encodePacked(_name))) {
                require(msg.sender == folders[i].owner, "Only owner can remove allowed");
                allowed[i][_allowed] = false;
            }
        }

    }

    function getFolderSharedWith(address _user) public view returns (Folder[] memory) {
        Folder[] memory sharedFolders;
        uint256 count = 0;

        for(uint256 i = 1; i <= folderCount; i++) {
            if(allowed[i][_user]) {
                sharedFolders[count] = folders[i];
                count++;
            }
        }

        return sharedFolders;
    }

    function getUserFolders(address _user) public view returns(Folder[] memory) {
        Folder[] memory userFolders;
        uint256 count = 0;

        for(uint256 i = 1; i <= folderCount; i++) {
            if(folders[i].owner == _user) {
                userFolders[count] = folders[i];
                count++;
            }
        }

        return userFolders;
    }
}

