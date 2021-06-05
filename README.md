# Yield Farming Decentralized Application

## Migrate ABI
```
truffle migrate --reset
```

## Generate type interface for ABI
```
typechain --target=truffle-v5 "./src/abi/*.json"
```

## Test ABI
```
truffle test
```