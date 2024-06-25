import { ethers } from 'ethers';
import GlobalFactory from 'global-factory';
import PDTK from '../artifacts/contracts/PrivateDataToken.sol/PrivateDataToken.json';

export async function deploySingleContract(
    abi: ethers.InterfaceAbi,
    bytecode: string,
    deployer: ethers.Signer,
    constructorArgs: any[] = [], // default value is empty
): Promise<any> {
    try {
        // Create a new ContractFactory instance
        const factory = new ethers.ContractFactory(abi, bytecode, deployer);

        // Deploy the contract with constructor arguments
        const contract = await factory.deploy(...constructorArgs);

        // Wait for the contract to be deployed
        await contract.waitForDeployment();
        console.log('Deploy the contract successfully: ', contract.target);

        return contract;
    } catch (error) {
        console.error('Failed to deploy contract:', error);
        throw error;
    }
}

export async function deployContracts(deployer: ethers.Signer): Promise<any> {
    const abi = PDTK.abi;
    const bytecode = PDTK.bytecode;

    // Deploy the contract
    const pdtkContract = await deploySingleContract(abi, bytecode, deployer);
    return pdtkContract;
}
