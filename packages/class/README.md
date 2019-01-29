# `Endpass class library`

## Usage with web3 instance

Classes, with need web3 instance, must be created using special fabric methods
###

```sh
import {
  createERC20TokenClass,
  createENSClass,
  createWalletClass,
  createTransactionClass,
} from '@endpass/class';

const ERC20Token = createERC20TokenClass(web3);
const ENSResolver = createENSClass(web3);
const Wallet = createWalletClass(web3);
const Transaction = createTransactionClass(web3);

```
