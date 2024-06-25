# zk-abe-contract

Smart Contract for zkabe system

## hardhat

This project uses hardhat as the framework to deploy the contracts and have some different configuration to local and different networks.

## Test Net

The testnet we are using is `arbitrum sepolia`, which is a Layer 2 using Optimism Rollup of Ethereum Sepolia testnet.

## How to deploy?

* deploying on local node on hardhat: `npm run deploy:local`
* deploying on arbitrum sepolia:
  * first, `cp .env.example .env`
  * fill in `ALCHEMY_API_KEY` and `METAMASK_PRIVATE_KEY`
  * `npm run deploy:arbsepolia`

## Running Test

```bash
npm run test
```

result woul be like:

```bash
> test
> hardhat test ./test/*.test.ts



  Deploy Contracts
    ✔ should deploy the contract with valid address (558ms)


  1 passing (559ms)
```

## Running format

```bash
npm run format
```
