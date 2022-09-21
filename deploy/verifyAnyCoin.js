// SPDX-License-Identifier: MIT

async function verifyAnyCoin(index) {
  const hre = require('hardhat');

  const CHAIN_NAME = hre.network.name;
  const CHAIN_ID = hre.network.config.chainId;
  const contracts = require(`./${CHAIN_NAME}.json`);
  console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

  if (index >= contracts.tokens.length || index < 0) {
    throw new Error(`invalid index: ${index}, value is between 0 and ${contracts.tokens.length - 1} !`);
  }

  const token = contracts.tokens[index];
  console.log(`Verify AnyCoin: ${JSON.stringify(token, null, 4)}\n`);

  await hre.run('verify:verify', {
    network: CHAIN_NAME,
    address: token.address,
    constructorArguments: [token.name, token.symbol, token.decimals],
  });
}

module.exports = { verifyAnyCoin };
