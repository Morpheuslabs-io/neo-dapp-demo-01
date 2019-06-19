# An NEO dApp demo

This is a petshop Dapp demo running on NEO blockchain. The project itself does not contain any business purpose and is only used for learning.

You will learn how to use the Morpheus Labs Blockchain Platform as a Service (ML BPaaS) for developing, deploying and testing a Neo DApp.

If you are not familiar with the ML BPaaS yet, you may refer to "https://docs.morpheuslabs.io/docs/overview" understand the basic concept and the operations required:

- create a new Neo private network in "Blockchain Ops - Neo" (or use existing)
- download apps using Application Library
- Manage workspace in CDE

If you want to study more about Neo blockchain, you may refer to https://docs.neo.org/en-us/index.html.

## Setup Env
------------------------------------------------------------------------
1. Create a Neo private network on "Blockchain Ops"
2. Download "Try Neo Python Smart Contract" from Application Library into My Repository
3. Create a new workspace using the newly downloaded application in My Repository
4. Start and open the newly created workspace in CDE
5. Connect neo-python client in CDE to the private network

In the terminal, use the command "np-config {internal P2P URL} {internal RPC URL}" to connect neo-python to the private network

For example:

    `np-config http://bops-t.morpheuslabs.io:21660 http://bops-t.morpheuslabs.io:33362`

Please note that if you restart the workspace, you have to run the command again. Or if you are using a new private blockchain, then you have to run the command with the internal P2P URL and the RPC URL of the new private network.

You can get the internal P2P URL and internal RPC URL from the information tab of of the private netowork in Blockchain Ops as seen in the example below:

- `Internal RPC URL: http://bops-t.morpheuslabs.io:33362`
- `Internal P2P URL: http://bops-t.morpheuslabs.io:21660`

For information, the command above will update "SeedList" and "RPCList" in the file

`/home/user/.local/lib/python3.6/site-packages/neo/data/protocol.privnet.json`

For example:

```
"SeedList": [
    "bops-t.morpheuslabs.io:21660" //using Internal P2P URL without http
],
"RPCList": [
    "http://bops-t.morpheuslabs.io:33362" //using Internal RPC URL with full link
]
```

6. Connect to the private network

In the terminal,  enter command `np-prompt -p` to connnect to the private network

You should see something like this:

```
Privatenet useragent '/Neo:2.10.1/', nonce: 977855951
[I 190616 15:25:54 LevelDBBlockchain:112] Created Blockchain DB at /home/user/.neopython/Chains/privnet
[I 190616 15:25:55 NotificationDB:73] Created Notification DB At /home/user/.neopython/Chains/privnet_notif
NEO cli. Type 'help' to get started


neo>
```

It means that we have connected to the private network. Wait for a while for the neo-python client in the terminal to sync the blocks from the private network. You can check synching status by using the command 

`show state`

You will see some info like this showing the status of syncing. In the example below, 100 blocks have been synched from the private network to the neo-python client node.
```
neo> show state
Progress: 100 / 4588
Block-cache length 1
Blocks since program start 100
Time elapsed 0.43487291666666666 mins
Blocks per min 229.9522370041056
TPS: 4.100814893239884
```

7. Create a new wallet or open an existing wallet

Enter `neo> wallet create ./mywallet` and fill in a password to create a new wallet. Or open an existing wallet `neo> wallet open {path to wallet file}`

8. Import the default account of the private network to the wallet 

`neo> wallet import wif KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr`

This default account has NEO and GAS tokens for you to perform various transactions on the private network.

9. Rebuild the wallet after import 

`neo> wallet rebuild`

10. Check NEO and GAS in the wallet 

`neo> wallet` 

Check `percent_synced` and `synced_balances` to confirm there are NEO and GAS tokens in the wallet.

```
    "percent_synced": 100,
    "synced_balances": [
        "[NEO]: 100000000.0 ",
        "[NEOGas]: 30525.98755 "
    ],
```
The wallet needs to have NEO and GAS to be able to deploy the smart contract.

Next, we will compile the smart contract, deploy and test the smart contract using the private network.

## Compile & Deploy contract on private net
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


