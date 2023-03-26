// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract FileManager {
    struct Safe {
        string name;
        string cid;
        address owner;
        address accessNFT;
        string[] fileNames;
    }

    mapping(uint256 => Safe) private safes;
    mapping(uint256 => mapping(address => bool)) allowed;
    uint256 public safeCount;

    function createSafe(
        string memory _name,
        string memory _cid,
        string[] memory fileNames
    ) public {
        safeCount++;
        safes[safeCount] = Safe(_name, _cid, msg.sender, address(0), fileNames);
    }

    function addAllowed(string memory _name, address _allowed) public {
        for (uint256 i = 1; i <= safeCount; i++) {
            if (
                keccak256(abi.encodePacked(safes[i].name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                require(
                    msg.sender == safes[i].owner,
                    "Only owner can add allowed"
                );
                allowed[i][_allowed] = true;
            }
        }
    }

    function addAccessNFT(string memory _name, address _accessNFT) public {
        for (uint256 i = 1; i <= safeCount; i++) {
            if (
                keccak256(abi.encodePacked(safes[i].name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                require(
                    msg.sender == safes[i].owner,
                    "Only owner can add allowed"
                );
                safes[i].accessNFT = _accessNFT;
            }
        }
    }

    function removeAllowed(string memory _name, address _allowed) public {
        for (uint256 i = 1; i <= safeCount; i++) {
            if (
                keccak256(abi.encodePacked(safes[i].name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                require(
                    msg.sender == safes[i].owner,
                    "Only owner can remove allowed"
                );
                allowed[i][_allowed] = false;
            }
        }
    }

    function getSafesSharedWith(
        address _user
    ) public view returns (Safe[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= safeCount; i++) {
            if (allowed[i][_user]) {
                count++;
            }
        }

        Safe[] memory sharedSafes = new Safe[](count);
        count = 0;
        for (uint256 i = 1; i <= safeCount; i++) {
            if (allowed[i][_user]) {
                sharedSafes[count] = safes[i];
                count++;
            }
        }

        return sharedSafes;
    }

    function getUserSafes(address _user) public view returns (Safe[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= safeCount; i++) {
            if (safes[i].owner == _user) {
                count++;
            }
        }

        Safe[] memory userSafes = new Safe[](count);
        count = 0;
        for (uint256 i = 1; i <= safeCount; i++) {
            if (safes[i].owner == _user) {
                userSafes[count] = safes[i];
                count++;
            }
        }

        return userSafes;
    }

    function deleteSafe(string memory _name) public {
        for (uint256 i = 1; i <= safeCount; i++) {
            if (
                keccak256(abi.encodePacked(safes[i].name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                require(
                    msg.sender == safes[i].owner,
                    "Only owner can delete safe"
                );
                delete safes[i];
                safeCount--;
                return;
            }
        }
    }

    function getSafesForNFT(address NFT) public view returns(Safe[] memory) {
        require(
            IERC721(NFT).balanceOf(msg.sender) > 0,
            "You must own an acceptance NFT to vote for a proposal"
        );

        uint256 count = 0;
        for (uint256 i = 1; i <= safeCount; i++) {
            if (safes[i].accessNFT == NFT) {
                count++;
            }
        }

        Safe[] memory allowedSafes = new Safe[](count);
        count = 0;

        for (uint256 i = 1; i <= safeCount; i++) {
            if (safes[i].accessNFT == NFT) {
                allowedSafes[count]= safes[i];
                count++;
            }
        }

        return allowedSafes;
    }
}
