// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.5.0;

import "./ZingToken.sol";
import "./DogelonmarsToken.sol";

contract SwapToken {
    string public name = "Swap Token";
    ZingToken public zingToken;
    DogelonmarsToken public dogelonmarsToken;
    // ShibaToken public shibaToken;
    address public owner;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(ZingToken _zingToken, DogelonmarsToken _dogelonmarsToken) public {
        zingToken = _zingToken;
        dogelonmarsToken = _dogelonmarsToken;
        // shibaToken = _shibaToken;
        owner = msg.sender;
    }

    // deposit token
    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "amount cannot be 0");

        // transfer token for staking
        // shibaToken.transferFrom(msg.sender, address(this), _amount);
        dogelonmarsToken.transferFrom(msg.sender, address(this), _amount);

        // update staking blance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // add user to stakers array *only* if they haven't staked
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // update staking status
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    // withdraw token
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];

        require(balance > 0, "staking balance cannot be 0");

        // transfer back DAI token
        // shibaToken.transfer(msg.sender, balance);
        dogelonmarsToken.transfer(msg.sender, balance);

        // reset staking balance to 0
        stakingBalance[msg.sender] = 0;

        // update staking status
        isStaking[msg.sender] = false;
    }

    // issue tokens
    function issueTokens() public {
        require(msg.sender == owner, "caller must be the owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                zingToken.transfer(recipient, balance);
            }
        }
    }
}
