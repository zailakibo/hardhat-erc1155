//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract GameNFT is ERC1155, Ownable {
    uint256 public nftCount;

    constructor() ERC1155("") {
        nftCount = 0;
    }

    function mint(uint256 amount) public onlyOwner {
        for (uint256 i = 0; i < amount; i++) {
            _mint(msg.sender, nftCount, 1, "");
            nftCount++;
        }
    }

    function uri(uint256 id) public view override returns (string memory) {
        require(id >= nftCount, "NotFound");
        return string(
            abi.encodePacked(
                "https://nft-domain.com/",
                Strings.toString(id),
                ".json"
            )
        );
    }
}
