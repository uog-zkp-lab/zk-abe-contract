import { expect } from 'chai';
import { ethers } from 'hardhat';
import PDTK from '../artifacts/contracts/PrivateDataToken.sol/PrivateDataToken.json';

describe('Deploy Contracts', function () {
    it('should deploy the contract with valid address', async () => {
        const abi = PDTK.abi;
        const bytecode = PDTK.bytecode;

        const [signer] = await ethers.getSigners();
        const factory = new ethers.ContractFactory(abi, bytecode, signer);

        const contract = await factory.deploy();
        await contract.waitForDeployment();
        const address = contract.target;

        expect(address).to.properAddress;
    });
});
