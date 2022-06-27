# FUND ME

A smart contract where people can send fund and later the funds can be withdraw from the owner of the contract, the owner will be the one who will deploy the contract and the owner will only be able to withdraw the funds from the contract. It allows the sender to send `Ethereum` in terms of USD and minimum amount to be sent is set to $50.

### Getting Started
Contract implemented using `HardHat`, the actual solidity files can be found in the `contracts/FundMe.sol` and `contracts/PriceConverter.sol`, it implements the contract `FundMe` we set up some variables like a list of address `funders`, `MIN_USD`, a mapping `addressToAmountFunded` so that we can track from which address how much amount was sent, a global variable to grab the owner's address `i_owner`, AggregatorV3Interface `priceFeed` this interface object when compiled given and `ABI` and that `ABI` matched then with an address gived us a contract that gives price of `ETH` in terms of `USD`.
`fund()` handles logic for recieving  fund in our contract `require(msg.value.getConversionRate(priceFeed) > MIN_USD, "Not enough!");`, `withdraw()` to withdraw `ETH` from the contract address, all of the amount withdraws at once, it checks that the function being called from the address is the owners address.

`checkOwner()` checks for the owner of the contract
`recieve()` & `fallback()` are special function offered by solidity for people who send amount but outside the scope of our contract.