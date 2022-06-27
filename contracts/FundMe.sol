// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConverter.sol";

error NotOwner();

contract FundMe {

    using PriceConverter for uint256;

    uint256 public constant MIN_USD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_owner;

    AggregatorV3Interface public priceFeed;

    constructor (address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund () public payable {
        // if required fund is not met, function reverts returning the gas used
        require(msg.value.getConversionRate(priceFeed) > MIN_USD, "Not enough!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw () public checkOwner {
        // set all funder's address value to 0 in dic
        for (uint256 index=0; index<funders.length; index++) {
            address funder = funders[index];
            addressToAmountFunded[funder] = 0;
        }
        // reset the funders list
        funders = new address[] (0);

        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "Failed");
    }

    modifier checkOwner {
        // require(msg.sender == i_owner);
        if (msg.sender != i_owner) {revert NotOwner();}
        _;
    }

    receive () external payable {
        fund();
    }

    fallback () external payable {
        fund();
    }
}