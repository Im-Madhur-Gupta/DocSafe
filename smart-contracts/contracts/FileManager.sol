// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract FileManager {

    struct Safe {
        string name;
        string cid;
        address owner;
        string[] fileNames;
    }

    mapping (uint256 => Safe) safes;
    mapping (uint256 => mapping (address => bool)) allowed;
    uint256 private safeCount;

    function createSafe(string memory _name, string memory _cid,string[] memory fileNames) public {
        safeCount++;
        safes[safeCount] = Safe(_name, _cid, msg.sender,fileNames);
    }

    function addAllowed(string memory _name, address _allowed) public {
        
        for(uint256 i = 1; i <= safeCount; i++) {
            if (keccak256(abi.encodePacked(safes[i].name)) == keccak256(abi.encodePacked(_name))) {
                require(msg.sender == safes[i].owner, "Only owner can add allowed");
                allowed[i][_allowed] = true;
            }
        }

    }

    function removeAllowed(string memory _name, address _allowed) public {

        for(uint256 i = 1; i <= safeCount; i++) {
            if (keccak256(abi.encodePacked(safes[i].name)) == keccak256(abi.encodePacked(_name))) {
                require(msg.sender == safes[i].owner, "Only owner can remove allowed");
                allowed[i][_allowed] = false;
            }
        }

    }

    function getSafesSharedWith(address _user) public view returns (Safe[] memory) {
        Safe[] memory sharedSafes;
        uint256 count = 0;

        for(uint256 i = 1; i <= safeCount; i++) {
            if(allowed[i][_user]) {
                sharedSafes[count] = safes[i];
                count++;
            }
        }

        return sharedSafes;
    }

    function getUserSafes(address _user) public view returns(Safe[] memory) {
        Safe[] memory userSafes;
        uint256 count = 0;

        for(uint256 i = 1; i <= safeCount; i++) {
            if(safes[i].owner == _user) {
                userSafes[count] = safes[i];
                count++;
            }
        }

        return userSafes;
    }
}

