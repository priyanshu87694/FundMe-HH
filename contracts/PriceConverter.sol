// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice (AggregatorV3Interface priceFeed) public view returns(uint256) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    function getConversionRate (uint256 amount, AggregatorV3Interface priceFeed) public view returns (uint256) {
        uint256 price = getPrice(priceFeed);
        return (amount * price) / 1e18;
    }
}