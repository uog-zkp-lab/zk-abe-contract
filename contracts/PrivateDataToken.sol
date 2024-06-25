// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol';

contract PrivateDataToken is ERC1155, AccessControl, ERC1155Burnable {
    mapping(address dataProcessor => bytes32 idTreeRoot)
        public dataProcessorRegistry;

    error DPHasRegistered(address dataProcessor, bytes32 idTreeRoot);
    error DPNotRegistered(address dataProcessor);
    constructor() ERC1155('PDTK') {}

    /**
     * @dev storing the idTreeRoot into register mapping
     * @param idTreeRoot the id tree root of data processor (using keccak256)
     */
    function dpRegister(bytes32 idTreeRoot) public {
        if (dataProcessorRegistry[msg.sender] != bytes32(0)) {
            revert DPHasRegistered(
                msg.sender,
                dataProcessorRegistry[msg.sender]
            );
        }
        dataProcessorRegistry[msg.sender] = idTreeRoot;
    }

    /**
     * @dev set cid of data owner's data
     * @param cid the content identifier of ciphertext stored in ipfs
     */
    function setURI(string memory cid) public {
        _setURI(cid);
    }

    /**
     * @dev mint function for data processor
     * @param account the token mints would to this address
     * @param id the identifier of data owner
     * @param data 123
     */
    function mint(address account, uint256 id, bytes memory data) public {
        _mint(account, id, 1, data);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
