# An NEO Dapp demo

This is a repository for a petshop Dapp demo which is running on NEO blockchain. The project itself does not contain any business purpose and is only used for learning. The project is utilizing following things :

# Create a private NEO blockchain ops
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
`"SeedList": [
        "bops-t.morpheuslabs.io:21660" //using Internal P2P URL without http
],
"RPCList": [
    "http://bops-t.morpheuslabs.io:33362" //using Internal RPC URL with full link
]`

7. Open terminal and enter command `np-prompt -p -v` to connnect to private net
You should get something like this:

`Privatenet useragent '/Neo:2.10.1/', nonce: 977855951
[I 190616 15:25:54 LevelDBBlockchain:112] Created Blockchain DB at /home/user/.neopython/Chains/privnet
[I 190616 15:25:55 NotificationDB:73] Created Notification DB At /home/user/.neopython/Chains/privnet_notif
NEO cli. Type 'help' to get started


neo>`

It meant we connected to private net, wait little bit for neo-python node to sync, you can check syncing status by using command `show state`.

8. Enter `neo> wallet create ./mywallet` and fill in password to create new wallet. Or open wallet if you already have wallet `neo> wallet open {path to wallet file}`
9. Import new address to wallet `neo> wallet import wif KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr`
10. Rebuild wallet after import `neo> wallet rebuild`
11. Check NEO and GAS in wallet `neo> wallet` focus to check `percent_synced` and `synced_balances`
`
    "percent_synced": 100,
    "synced_balances": [
        "[NEO]: 100000000.0 ",
        "[NEOGas]: 30525.98755 "
    ],
`
Wallet need to have NEO and GAS to able deploy contract




1. Deploy contract on private net
---------------------------------


2. Configuration Front End dApp
---------------------------------
