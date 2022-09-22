/* global task */

require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-web3');

require('dotenv').config();

const { verifyAnyCoin } = require('./deploy/verifyAnyCoin');

const { ETHERSCAN_API_KEY, POLYGONSCAN_API_KEY } = process.env;

if (!ETHERSCAN_API_KEY) {
  console.log('Please set ETHERSCAN_API_KEY in file .env !');
}

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

task('verifyToken', 'veify AnyCoin')
  .addParam('index', 'The index of AnyCoin in deploy/<network>.json')
  .setAction(async (taskArgs, hre) => {
    await verifyAnyCoin(taskArgs.index, hre);
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: false,
            runs: 200,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: false,
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
    apothem: {
      url: 'https://erpc.apothem.network',
      chainId: 51,
    },
    xinfin: {
      url: 'https://erpc.xinfin.network',
      chainId: 50,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      apothem: ETHERSCAN_API_KEY,
      xinfin: ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'apothem',
        chainId: 51,
        urls: {
          apiURL: 'https://apothem.blocksscan.io/api',
          browserURL: 'https://explorer.apothem.network',
        },
      },
      {
        network: 'xinfin',
        chainId: 50,
        urls: {
          apiURL: 'https://xdc.blocksscan.io/api',
          browserURL: 'https://explorer.xinfin.network',
        },
      },
    ],
  },
  mocha: {
    timeout: 50000,
  },
};
