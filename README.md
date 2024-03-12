# Upgradable Solidity Smart Contracts

This repo is for educational purposes. It explores the concept of upgradable smart contracts in Solidity. The idea is to have a smart contract that can be upgraded without losing the state of the contract. This is achieved by separating the data and the logic of the contract.

There are different patterns to achieve upgradability:

- Transparent Proxy
- UUPS Proxy
- Beacon Proxy

Currently, transperent proxy is the most widely used pattern and the focus of this repo. In the future, other patterns will be explored.

## Transparent Proxy

The transparent proxy pattern is a simple and gas-efficient way to implement upgradable smart contracts. It is based on the [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967) standard. The idea is to have a proxy contract that delegates all calls to an implementation contract. The implementation contract is the one that holds the logic of the contract. The proxy contract is the one that holds the state of the contract. The proxy contract can be upgraded by changing the implementation contract.

### Examples

#### Basic Example

- [ContractV1.sol](contracts/proxy/transparent/basic/ContractV1.sol) - The implementation contract V1
- [ContractV2.sol](contracts/proxy/transparent/basic/ContractV2.sol) - The implementation contract V2 which modifies the logic of V1 and adds new functions and state variables

To deploy the contract V1, we deploy the implentation, the proxy and the proxy admin contracts. The proxy contract is also initialized with the implementation contract:

```bash
npx hardhat run scripts/proxy/transparent/basic/deploy.ts --network <network>
```

Upgrading the contract to V2 is done by deploying the new implementation contract and then calling the `upgradeTo` function of the proxy contract:

```bash
npx hardhat run scripts/proxy/transparent/basic/upgrade.ts --network <network>
```

Notes:

- New state variables can be added to the implementation contract, but they should be added after the existing state variables.

#### Token Example

The goal of this example is to demonstate how to use upgradable contracts with external libraries.

- [MyTokenV1.sol](contracts/proxy/transparent/erc20/MyTokenV1.sol) - The implementation contract V1 using OpenZeppelin's ERC20 contract
- [MyTokenV2.sol](contracts/proxy/transparent/erc20/MyTOkenV2.sol) - The implementation contract V2 which modifies the logic of V1 and adds OpenZeppelin's Ownable contract as an another external library

To deploy the V1 token contract, we deploy the implentation, the proxy and the proxy admin contracts. The proxy contract is also initialized with the implementation contract:

```bash
npx hardhat run scripts/proxy/transparent/erc20/deploy.ts --network <network>
```

Upgrading the token contract to V2 is done by deploying the new implementation contract and then calling the `upgradeTo` function of the proxy contract:

```bash
npx hardhat run scripts/proxy/transparent/erc20/upgrade.ts --network <network>
```

Notes:

- Contracts need to be initialized only once. If the contract is already initialized and we try to initialize it again, we need to use the `reinitialize` modifier with the version as an argument.

### Testing

There are demonstatations for how to test the proxy contracts and the upgrades before deploying them:

- [ContractV1.proxy.test.ts](test/ContractV1.proxy.test.js) - Tests for the V1 proxy contract
- [ContractV2.proxy.test.ts](test/ContractV2.proxy.test.js) - Tests for the upgrade from V1 to V2

To run the tests:

```bash
npx hardhat test
```

### Recipies

#### Using with Gnosis Safe

A common use case for upgradable contracts is to use them with Gnosis Safe. This increases the security of the contract by requiring multiple signatures to upgrade the contract.

1. To use the proxy contract with Gnosis Safe, we need first need to transfer the ownership of the proxy admin contract to the Gnosis Safe:

```bash
npx hardhat run scripts/proxy/transparent/basic/transfer_ownership.ts --network <network>
```

2. Then before upgrade, instead of running the upgrade script directly, we need to prepare an upgrade and then submit it to the Gnosis Safe:

```bash
npx hardhat run scripts/proxy/transparent/basic/prepare_upgrade.ts --network <network>
```

This will deploy a new implementation contract and output the address in the console.

3. To manage our upgrade in Gnosis Safe we use the OpenZeppelin app (look for the OpenZeppelin logo).

4. In the Apps tab, select the OpenZeppelin application and paste the address of the proxy in the Contract address field, and paste the address of the new implementation in the New implementation address field.

5. Double check the addresses, and then press the Upgrade button.

### Resources

- [ERC-7201: Namespaced Storage Layout](https://eips.ethereum.org/EIPS/eip-7201)
- [ERC-1967: Proxy Storage Slots](https://eips.ethereum.org/EIPS/eip-1967)
- [Proxy Upgrade Pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies)
- [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)
- [Hardhat Upgrades Plugin](https://github.com/OpenZeppelin/openzeppelin-upgrades/tree/master/packages/plugin-hardhat)
