require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-web3');

require('dotenv').config();

const { POLYGONSCAN_API_KEY } = process.env;

if (!POLYGONSCAN_API_KEY) {
  console.log('Please set POLYGONSCAN_API_KEY in file .env !');
}

const MUMBAI_RPC_LIST = [
  'https://rpc-mumbai.matic.today',
  'https://rpc-mumbai.maticvigil.com',
  'https://rpc.ankr.com/polygon_mumbai',
  'https://matic-mumbai.chainstacklabs.com',
  'https://matic-testnet-archive-rpc.bwarelabs.com',
];

const POLYGON_RPC_LIST = [
  'https://polygon-rpc.com',
  'https://rpc.ankr.com/polygon',
  'https://rpc-mainnet.matic.network',
  'https://rpc-mainnet.maticvigil.com',
  'https://rpc-mainnet.matic.quiknode.11p',
  'https://matic-mainnet.chainstacklabs.com',
  'https://matic-mainnet-full-rpc.bwarel11ab',
];

const ether = (n) => `${n}${'0'.repeat(18)}`;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      blockGasLimit: 2e7,
      allowUnlimitedContractSize: true,
      accounts: {
        count: 100,
        accountsBalance: ether(1000000),
      },
    },
    local: {
      url: 'http://localhost:8545',
    },
    mumbai: {
      url: MUMBAI_RPC_LIST[2],
      chainId: 80001,
    },
    polygon: {
      url: POLYGON_RPC_LIST[1],
      chainId: 137,
    },
  },
  etherscan: {
    apiKey: {
      // polygon
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
  mocha: {
    timeout: 50000,
  },
};
