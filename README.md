# An NEO dApp demo

This is a repository for a petshop Dapp demo which is running on NEO blockchain. The project itself does not contain any business purpose and is only used for learning. The project is utilizing following things :

## Setup Env
---------------------------------
1. Create private net on blockchain ops
2. Create NEO stack workspace
3. Open NEO stack workspace
4. Get code from github `git clone https://github.com/Morpheuslabs-io/neo-dapp-demo-01`
5. Next we need to config `neo-python` wallet to point to private net 
Open information tab of blockchain ops and get two links:
- `Internal RPC URL: http://bops-t.morpheuslabs.io:33362 (example)`
- `Internal P2P URL: http://bops-t.morpheuslabs.io:21660 (example)`
6. Using editor like vim open and change file: `/home/user/.local/lib/python3.6/site-packages/neo/data/protocol.privnet.json`
Update 2 parameters SeedList and RPCList (example): 
```
"SeedList": [
        "bops-t.morpheuslabs.io:21660" //using Internal P2P URL without http
],
"RPCList": [
    "http://bops-t.morpheuslabs.io:33362" //using Internal RPC URL with full link
]
```

7. Open terminal and enter command `np-prompt -p -v` to connnect to private net
You should get something like this:

```
Privatenet useragent '/Neo:2.10.1/', nonce: 977855951
[I 190616 15:25:54 LevelDBBlockchain:112] Created Blockchain DB at /home/user/.neopython/Chains/privnet
[I 190616 15:25:55 NotificationDB:73] Created Notification DB At /home/user/.neopython/Chains/privnet_notif
NEO cli. Type 'help' to get started


neo>
```

It meant we connected to private net, wait little bit for neo-python node to sync, you can check syncing status by using command `show state`.

8. Enter `neo> wallet create ./mywallet` and fill in password to create new wallet. Or open wallet if you already have wallet `neo> wallet open {path to wallet file}`
9. Import new address to wallet `neo> wallet import wif KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr`
10. Rebuild wallet after import `neo> wallet rebuild`
11. Check NEO and GAS in wallet `neo> wallet` focus to check `percent_synced` and `synced_balances`
```
    "percent_synced": 100,
    "synced_balances": [
        "[NEO]: 100000000.0 ",
        "[NEOGas]: 30525.98755 "
    ],
```
Wallet need to have NEO and GAS to able deploy contract. Next we start to compile and deploy NEP contract to private network.

## Deploy contract on private net
---------------------------------

1. To build contract use command `neo> sc build {path to python file}` example:
`neo> sc build /projects/neo-dapp-demo-01/smart-contract/NEP.py`
2. To deploy contract use command `neo>sc deploy {path to .avm file} True False False 0701 05 --fee={fee}`
And Enter Contract Information detail to deploy.
example: `neo> sc deploy /projects/neo-dapp-demo-01/smart-contract/NEP.avm True False False 0701 05 --fee=550`
3. When finish to deploy wait little and view detail contract to get contract address to config on FrontEnd
Example:
```
Creating smart contract....
                 Name: PETToken
              Version: V1
               Author: Neo
                Email: neo@test.com
          Description: NEO PET Token dApp Demo
        Needs Storage: True
 Needs Dynamic Invoke: False
           Is Payable: False
{
    "hash": "0xb6730fd741b632401f89020409c6c0415d97dcee", //script hash of contract 
    "script": "011ac56b6a00527ac46a51527ac4586a52527ac4074e4744205045546a53527ac4034e50546a54527ac46a00c30b746f74616c537570706c79876406006c7566616a00c3046e616d65876409006a53c36c7566616a00c30673796d626f6c8764...
```

## Config Front End dApp
---------------------------------
1. Get address of contract `neo> show contract {contract script hash}`
Example: `neo> show contract 0xb6730fd741b632401f89020409c6c0415d97dcee`
Output: 
```
{
    "version": 0,
    "hash": "0xb6730fd741b632401f89020409c6c0415d97dcee",
    "script": "011ac56b6a00527ac46a51527ac4586a52527ac4074e4744205045546a535...",
    "parameters": [
        "String",
        "Boolean"
    ],
    "returntype": "ByteArray",
    "name": "NeoToken",
    "code_version": "V1",
    "author": "Neo",
    "email": "test",
    "description": "Neo Demo Token",
    "properties": {
        "storage": true,
        "dynamic_invoke": false,
        "payable": false
    },
    "token": {
        "name": "NGD PET",
        "symbol": "NPT",
        "decimals": 8,
        "script_hash": "0xb6730fd741b632401f89020409c6c0415d97dcee",
        "contract_address": "AdYrj6yhqL8EWPKmK5hgcJydthchFTpGsf" //--> smart contract address
    }
}
`
```
2. Update config file, open neon.js file in src folder and update contract address, contract hash, scan url, RPC url
Example: 
```javascript
const NEO_SCAN_URL = "https://neoscan-testnet.io/api/main_net";
const PRIV_RPC_NODE = "http://192.168.99.100:30333";
const CONTRACT_ADDRESS = 'AdYrj6yhqL8EWPKmK5hgcJydthchFTpGsf';
const CONTRACT_SCRIPTHASH = 'b6730fd741b632401f89020409c6c0415d97dcee';
const AMOUNT_OF_NEO_TO_BUY_ONE_VOUCHER = 0.1;
```

3. Run `npm install` to install client node modules
4. Run `node index.js` to start dev server


