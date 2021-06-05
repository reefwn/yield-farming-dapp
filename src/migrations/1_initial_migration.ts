/// <reference types="../../types/truffle-contracts/types" />

const Migrations = artifacts.require("Migrations");

module.exports = (deployer: Truffle.Deployer) => {
  deployer.deploy(Migrations);
};

export {};
