// SPDX-License-Identifier: MIT

function convertXdcAddress(address) {
  const prefix = address.slice(0, 3).toLowerCase();
  return prefix === 'xdc' ? '0x' + address.slice(3) : address;
}

function getEthers(hre) {
  if (!hre?.ethers) {
    hre = require('hardhat');
  }

  return hre.ethers;
}

function getDeployer(RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY, hre) {
  const ethers = getEthers(hre);
  const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
  const deployer = new ethers.Wallet(`0x${DEPLOYER_PRIVATE_KEY}`, provider);

  return deployer;
}

// https://github.com/NomicFoundation/hardhat/blob/master/packages/hardhat-ethers/README.md#helpers
async function deployContract(signer, name, args = []) {
  const { ethers } = require('hardhat');

  const Implementation = await ethers.getContractFactory(name, signer);
  const contract = await Implementation.deploy(...args);

  return contract.deployed();
}

module.exports = {
  convertXdcAddress,
  getDeployer,
  deployContract,
};
