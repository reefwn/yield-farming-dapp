/// <reference types="../../types/truffle-contracts/types" />

const Migrations = artifacts.require("Migrations");

module.exports = function (deployer: Truffle.Deployer) {
  deployer.deploy(Migrations);
};

export {};
