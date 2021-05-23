/// <reference types="../../types/truffle-contracts/types" />

const DogelonmarsToken = artifacts.require("DogelonmarsToken");
const ZingToken = artifacts.require("ZingToken");
const SwapToken = artifacts.require("SwapToken");

module.exports = async function (
  deployer: Truffle.Deployer,
  network: string,
  accounts: Truffle.Accounts
) {
  // Deploy Zing Token
  deployer.deploy(ZingToken);
  const zingToken = await ZingToken.deployed();

  // Deploy Dogelonmars Token
  deployer.deploy(DogelonmarsToken);
  const dogelonmarsToken = await DogelonmarsToken.deployed();

  // Deploy Shiba Token
  // await deployer.deploy(ShibaToken)
  // const shibaToken = await ShibaToken.deployed()

  // Deploy SwapToken
  // await deployer.deploy(SwapToken, zingToken.address, shibaToken.address)
  deployer.deploy(SwapToken, zingToken.address, dogelonmarsToken.address);
  const swapToken = await SwapToken.deployed();

  // Transfer all Zing Tokens to SwapToken (1 million)
  await zingToken.transfer(swapToken.address, "1000000000000000000000000");

  // Transfer 100 Dogelonmars Tokens to investor
  // await shibaToken.transfer(accounts[1], '100000000000000000000')
  await dogelonmarsToken.transfer(accounts[9], "100000000000000000000");
};

export {};
