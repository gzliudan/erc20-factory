// SPDX-License-Identifier: MIT

const hre = require('hardhat');
const { convertXdcAddress } = require('./helpers');

const CHAIN_NAME = hre.network.name;
const CHAIN_ID = hre.network.config.chainId;
console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

const contracts = require(`./${CHAIN_NAME}.json`);

async function verifyContract(address, constructorArguments) {
  try {
    await hre.run('verify:verify', {
      network: CHAIN_NAME,
      address,
      constructorArguments,
    });
  } catch (e) {
    console.error(e);
  }

  console.log('\n'); // add space after each attempt
}

async function verifyAnyCoinFactory() {
  const originalAddress = contracts['anycoin_factory'].address;
  console.log(`Verify AnyCoinFactory at ${originalAddress}`);

  const normalAddress = convertXdcAddress(originalAddress);
  await verifyContract(normalAddress, []);
}

verifyAnyCoinFactory()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
