/// <reference types="../types/truffle-contracts/index" />
/// <reference types="../types/truffle-contracts/types" />

const SwapToken = artifacts.require("SwapToken");
const ZingToken = artifacts.require("ZingToken");

// staking tokens
const DogelonmarsToken = artifacts.require("DogelonmarsToken");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("SwapToken", ([owner, investor]) => {
  let zingToken, dogelonmarsToken, swapToken;

  before(async () => {
    // load contracts
    zingToken = await ZingToken.new();

    dogelonmarsToken = await DogelonmarsToken.new();

    swapToken = await SwapToken.new(
      zingToken.address,
      dogelonmarsToken.address
    );

    // transfer all Zing Token to platform (1 million)
    await zingToken.transfer(swapToken.address, tokens("1000000"));

    // send token to investor
    await dogelonmarsToken.transfer(investor, tokens("100"), { from: owner });
  });

  describe("Zing Token deployment", async () => {
    it("has a name", async () => {
      const name = await zingToken.name();
      assert.equal(name, "Zing Token");
    });
  });

  describe("Dogelon Mars deployment", async () => {
    it("has a name", async () => {
      const name = await dogelonmarsToken.name();
      assert.equal(name, "Dogelon Mars Token");
    });
  });

  describe("Swap Token deployment", async () => {
    it("has a name", async () => {
      const name = await swapToken.name();
      assert.equal(name, "Swap Token");
    });
  });

  it("contract has token", async () => {
    let balance = await zingToken.balanceOf(swapToken.address);
    assert.equal(balance.toString(), tokens("1000000"));
  });

  describe("Swap tokens", async () => {

    it("rewards investors for staking Dogelonmars token", async () => {
      let result;
      // check balance before staking
      result = await dogelonmarsToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor's Dogelonmars wallet balance correct before staking"
      );

      // stake Dogelonmars tokens
      await dogelonmarsToken.approve(swapToken.address, tokens("100"), {
        from: investor,
      });
      await swapToken.stakeTokens(tokens("100"), { from: investor });

      // check staking result
      result = await dogelonmarsToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor's Dogelonmars wallet balance correct after staking"
      );

      result = await dogelonmarsToken.balanceOf(swapToken.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Swap Token's Dogelonmars balance correct after staking"
      );

      result = await swapToken.isStaking(investor);
      assert.equal(
        result.toString(),
        "true",
        "investor's staking status correct after staking"
      );

      // issue token
      await swapToken.issueTokens({ from: owner });

      // check balance
      result = await zingToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor's Reef Token wallet balance correct after issuance"
      );

      await swapToken.issueTokens({ from: investor }).should.be.rejected;

      // unstake token
      await swapToken.unstakeTokens({ from: investor });

      // check balance
      result = await dogelonmarsToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor's Dogelonmars Token wallet balance correct after staking"
      );

      result = await dogelonmarsToken.balanceOf(swapToken.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Swap Token's Dogelonmars balance correct after staking"
      );

      result = await swapToken.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor's staking balance correct after staking"
      );

      result = await swapToken.isStaking(investor);
      assert.equal(
        result.toString(),
        "false",
        "investor's staking status correct after staking"
      );
    });
  });
});
