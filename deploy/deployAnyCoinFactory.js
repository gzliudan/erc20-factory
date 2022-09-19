/* global web3 */

const hre = require('hardhat');

const { getDeployer, deployContract } = require('./helpers');

require('dotenv').config();

const { DEPLOYER_PRIVATE_KEY } = process.env;
if (!DEPLOYER_PRIVATE_KEY) {
  throw new Error(`DEPLOYER_PRIVATE_KEY is not set in file .env !}`);
}

const CHAIN_NAME = hre.network.name;
const CHAIN_ID = hre.network.config.chainId;
const RPC_ENDPOINT = hre.network.config.url;
const deployer = getDeployer(RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY);
console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

async function deployAnyCoinFactory() {
  console.log(`DO: Deploy AnyCoinFactory to ${CHAIN_NAME}`);
  const instance = await deployContract(deployer, 'AnyCoinFactory', []);
  const address = instance.address;
  const hash = instance.deployTransaction.hash;
  const trx = await web3.eth.getTransaction(instance.deployTransaction.hash);
  const block = trx.blockNumber;
  console.log(`OK: AnyCoinFactory is deployed at ${address}, block = ${block}, hash = ${hash}`);
}

async function deployAll() {
  await deployAnyCoinFactory();
}

deployAll()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
