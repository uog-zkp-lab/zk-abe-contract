import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';

dotenv.config();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY || '';
const DEFAULT_PRIVATE_KEY =
    '0x7144b78064fb9f019d2bd6ba03ade21fa8545f84d63a3089b07ad4d2ee6d49ca';

const config: HardhatUserConfig = {
    solidity: '0.8.24',
    networks: {
        hardhat: {
            blockGasLimit: 12000000,
        },
        local: {
            url: 'http://127.0.0.1:8545/',
            blockGasLimit: 12000000,
            accounts: [DEFAULT_PRIVATE_KEY],
        },
        arbsepolia: {
            url: `https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [METAMASK_PRIVATE_KEY],
        },
    },
};

export default config;
