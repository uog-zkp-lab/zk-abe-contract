import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';

dotenv.config();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY || '';
const DEFAULT_PRIVATE_KEY_FROM_HH = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; // the default account from hardhat
 
const config: HardhatUserConfig = {
    solidity: '0.8.24',
    networks: {
        hardhat: {
            blockGasLimit: 12000000,
        },
        local: {
            url: 'http://127.0.0.1:8545/',
            blockGasLimit: 12000000,
            accounts: [DEFAULT_PRIVATE_KEY_FROM_HH],
        },
        arbsepolia: {
            url: `https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [METAMASK_PRIVATE_KEY],
        },
    },
};

export default config;
