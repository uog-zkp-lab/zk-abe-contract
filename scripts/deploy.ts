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
    const contract = await deployContracts(deployer);

    const configPath = path.join(__dirname, '../.env');
    // if file not exists, create it
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, '');
    }

    // fs.readFile(configPath, 'utf8', async (err, data) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     const config = envfile.parse(data)

    //     config.UNIREP_ADDRESS = unirep.address
    //     config.APP_ADDRESS = app.address
    //     config.ETH_PROVIDER_URL = hardhat.network.config.url ?? ''
    //     config.PRIVATE_KEY = Array.isArray(hardhat.network.config.accounts)
    //         ? `${hardhat.network.config.accounts[0]}`
    //         : `/**
    //           This contract was deployed using a mnemonic. The PRIVATE_KEY variable needs to be set manually
    //           **/`

    //     // get forked block number
    //     const blockNum = await ethers.provider.getBlockNumber()
    //     config.GENESIS_BLOCK = (blockNum - 999).toString()
    //     await fs.promises.writeFile(configPath, envfile.stringify(config))
    // })

    // console.log(`Config written to ${configPath}`);
}

// main function
main().catch(err => {
    console.log(`Uncaught error: ${err}`);
    process.exit(1);
});
