import { ethers, network, config } from 'hardhat';
import * as envfile from 'envfile';
import * as fs from 'fs';
import * as path from 'path';
import { deployContracts } from './utils';

export async function main() {
    if (network.name === 'hardhat') {
        console.warn(
            'You are trying to deploy a contract to the Hardhat Network, which' +
                'gets automatically created and destroyed every time. Use the Hardhat' +
                " option '--network localhost'" +
                '\n',
        );
    }
    const [deployer] = await ethers.getSigners();
    const contracts = await deployContracts(deployer);
    const pdtkAddr = contracts.pdtkContract.target
    if (network.name === 'arbsepolia') {
        console.log("PDTK has been deployed on arbitrum sepolia");
        console.log(`Please checkout https://sepolia.arbiscan.io/address/${pdtkAddr}.`);    
    }
    


    const configPath = path.join(__dirname, '../.env.be');
    // if file not exists, create it
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, '');
    }    

    // writing .env config file for backend
    fs.readFile(configPath, 'utf8', async (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        const config = envfile.parse(data)

        config.PDTK_ADDRESS = pdtkAddr;
        config.ETH_PROVIDER_URL = (network.config as any).url ?? '';
        config.PRIVATE_KEY = Array.isArray(network.config.accounts)
            ? `${(network.config as any).accounts[0]}`
            : `/**
              This contract was deployed using a mnemonic. The PRIVATE_KEY variable needs to be set manually
              **/`
        await fs.promises.writeFile(configPath, envfile.stringify(config))
    })

    console.log(`Config written to ${configPath}`);
}

// main function
main().catch(err => {
    console.log(`Uncaught error: ${err}`);
    process.exit(1);
});
