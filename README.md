@trunx-io/cli
==========

Trunx-IO command line wallet for EOSIO chains

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@trunx-io/cli.svg)](https://npmjs.org/package/@trunx-io/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@trunx-io/cli.svg)](https://npmjs.org/package/@trunx-io/cli)
[![License](https://img.shields.io/npm/l/@trunx-io/cli.svg)](https://github.com/Trunx-IO/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @trunx-io/cli
$ trunxcli COMMAND
running command...
$ trunxcli (-v|--version|version)
@trunx-io/cli/1.0.1 darwin-arm64 node-v18.4.0
$ trunxcli --help [COMMAND]
USAGE
  $ trunxcli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`trunxcli accounts:add ACCOUNT_NAME`](#trunxcli-accountsadd-account_name)
* [`trunxcli accounts:list`](#trunxcli-accountslist)
* [`trunxcli accounts:remove ACCOUNT_NAME`](#trunxcli-accountsremove-account_name)
* [`trunxcli accounts:update ACCOUNT_NAME`](#trunxcli-accountsupdate-account_name)
* [`trunxcli apps:add APP`](#trunxcli-appsadd-app)
* [`trunxcli apps:list`](#trunxcli-appslist)
* [`trunxcli apps:remove [APP URL]`](#trunxcli-appsremove-app-url)
* [`trunxcli autocomplete [SHELL]`](#trunxcli-autocomplete-shell)
* [`trunxcli backups:create`](#trunxcli-backupscreate)
* [`trunxcli backups:import FILE`](#trunxcli-backupsimport-file)
* [`trunxcli backups:import_anchor FILE`](#trunxcli-backupsimport_anchor-file)
* [`trunxcli backups:import_scatter FILE`](#trunxcli-backupsimport_scatter-file)
* [`trunxcli chains:add SERVER`](#trunxcli-chainsadd-server)
* [`trunxcli chains:list`](#trunxcli-chainslist)
* [`trunxcli chains:remove SERVER`](#trunxcli-chainsremove-server)
* [`trunxcli config:get [NAME]`](#trunxcli-configget-name)
* [`trunxcli config:init`](#trunxcli-configinit)
* [`trunxcli config:set [SETTING]`](#trunxcli-configset-setting)
* [`trunxcli config:unset [NAME]`](#trunxcli-configunset-name)
* [`trunxcli db:addobject DATA`](#trunxcli-dbaddobject-data)
* [`trunxcli db:list`](#trunxcli-dblist)
* [`trunxcli db:lock`](#trunxcli-dblock)
* [`trunxcli db:read TABLE`](#trunxcli-dbread-table)
* [`trunxcli db:removeobject ID`](#trunxcli-dbremoveobject-id)
* [`trunxcli db:setobject DATA`](#trunxcli-dbsetobject-data)
* [`trunxcli db:unlock`](#trunxcli-dbunlock)
* [`trunxcli eosio:buyram PAYER RECEIVER AMOUNT`](#trunxcli-eosiobuyram-payer-receiver-amount)
* [`trunxcli eosio:claimrewards OWNER`](#trunxcli-eosioclaimrewards-owner)
* [`trunxcli eosio:delegatebw FROM RECEIVER STAKE_NET_QUANTITY STAKE_CPU_QUANTITY`](#trunxcli-eosiodelegatebw-from-receiver-stake_net_quantity-stake_cpu_quantity)
* [`trunxcli eosio:fetch`](#trunxcli-eosiofetch)
* [`trunxcli eosio:listbw ACCOUNT`](#trunxcli-eosiolistbw-account)
* [`trunxcli eosio:listproducers`](#trunxcli-eosiolistproducers)
* [`trunxcli eosio:regproducer PRODUCER PRODUCER_KEY [URL] [LOCATION]`](#trunxcli-eosioregproducer-producer-producer_key-url-location)
* [`trunxcli eosio:regproxy PROXY`](#trunxcli-eosioregproxy-proxy)
* [`trunxcli eosio:sellram ACCOUNT BYTES`](#trunxcli-eosiosellram-account-bytes)
* [`trunxcli eosio:transfer FROM TO QUANTITY [MEMO]`](#trunxcli-eosiotransfer-from-to-quantity-memo)
* [`trunxcli eosio:undelegatebw FROM RECEIVER UNSTAKE_NET_QUANTITY UNSTAKE_CPU_QUANTITY`](#trunxcli-eosioundelegatebw-from-receiver-unstake_net_quantity-unstake_cpu_quantity)
* [`trunxcli eosio:unregproducer PRODUCER`](#trunxcli-eosiounregproducer-producer)
* [`trunxcli eosio:unregproxy PROXY`](#trunxcli-eosiounregproxy-proxy)
* [`trunxcli eosio:voteproducer SUBCOMMAND VOTER PRODUCER`](#trunxcli-eosiovoteproducer-subcommand-voter-producer)
* [`trunxcli esr:decode TX`](#trunxcli-esrdecode-tx)
* [`trunxcli esr:encode TX`](#trunxcli-esrencode-tx)
* [`trunxcli help [COMMAND]`](#trunxcli-help-command)
* [`trunxcli keys:add KEY`](#trunxcli-keysadd-key)
* [`trunxcli keys:derive [ROLE] [INDEX]`](#trunxcli-keysderive-role-index)
* [`trunxcli keys:list`](#trunxcli-keyslist)
* [`trunxcli keys:remove KEY`](#trunxcli-keysremove-key)
* [`trunxcli logs`](#trunxcli-logs)
* [`trunxcli plugins`](#trunxcli-plugins)
* [`trunxcli plugins:inspect PLUGIN...`](#trunxcli-pluginsinspect-plugin)
* [`trunxcli plugins:install PLUGIN...`](#trunxcli-pluginsinstall-plugin)
* [`trunxcli plugins:link PLUGIN`](#trunxcli-pluginslink-plugin)
* [`trunxcli plugins:uninstall PLUGIN...`](#trunxcli-pluginsuninstall-plugin)
* [`trunxcli plugins:update`](#trunxcli-pluginsupdate)
* [`trunxcli service:start`](#trunxcli-servicestart)
* [`trunxcli service:stop`](#trunxcli-servicestop)
* [`trunxcli status`](#trunxcli-status)

## `trunxcli accounts:add ACCOUNT_NAME`

Add accounts to the wallet database

```
USAGE
  $ trunxcli accounts:add ACCOUNT_NAME

ARGUMENTS
  ACCOUNT_NAME  account name to add to the wallet database

OPTIONS
  -c, --chain_id=chain_id  chain_id associated with the account

DESCRIPTION
  The accounts:add command is used to add new accounts to the current wallet database.
```

_See code: [src/commands/accounts/add.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/accounts/add.js)_

## `trunxcli accounts:list`

List accounts that are in the wallet database

```
USAGE
  $ trunxcli accounts:list

OPTIONS
  -a, --account_name=account_name  list accounts matching this name
  -c, --chain_id=chain_id          list accounts associated with this chain_id

DESCRIPTION
  The accounts:list command is used to list the existing accounts in the wallet database
```

_See code: [src/commands/accounts/list.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/accounts/list.js)_

## `trunxcli accounts:remove ACCOUNT_NAME`

Remove accounts from the wallet database

```
USAGE
  $ trunxcli accounts:remove ACCOUNT_NAME

ARGUMENTS
  ACCOUNT_NAME  account name to add to the wallet database

OPTIONS
  -c, --chain_id=chain_id  chain_id associated with the account

DESCRIPTION
  The accounts:remove command is used to remove new accounts to the current wallet database.
```

_See code: [src/commands/accounts/remove.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/accounts/remove.js)_

## `trunxcli accounts:update ACCOUNT_NAME`

Fetch account data from chain

```
USAGE
  $ trunxcli accounts:update ACCOUNT_NAME

ARGUMENTS
  ACCOUNT_NAME  account name to add to the wallet database

OPTIONS
  -c, --chain_id=chain_id  chain_id associated with the account

DESCRIPTION
  The accounts:update command updates the account object with on chain data

  Notes:
   - If --chain_id (-c) is not supplied the user will be prompted to select a known chain.
```

_See code: [src/commands/accounts/update.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/accounts/update.js)_

## `trunxcli apps:add APP`

Add apps to the wallet database

```
USAGE
  $ trunxcli apps:add APP

ARGUMENTS
  APP  json string of the app to add

DESCRIPTION
  The apps:add command is used to add new apps to the current wallet database.
```

_See code: [src/commands/apps/add.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/apps/add.js)_

## `trunxcli apps:list`

List apps that are in the wallet database

```
USAGE
  $ trunxcli apps:list

DESCRIPTION
  The apps:list command is used to list the existing apps in the wallet database
```

_See code: [src/commands/apps/list.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/apps/list.js)_

## `trunxcli apps:remove [APP URL]`

Remove apps from the wallet database

```
USAGE
  $ trunxcli apps:remove [APP URL]

ARGUMENTS
  APP URL  url of the app to remove

DESCRIPTION
  The apps:remove command is used to remove apps from the wallet database
```

_See code: [src/commands/apps/remove.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/apps/remove.js)_

## `trunxcli autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ trunxcli autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ trunxcli autocomplete
  $ trunxcli autocomplete bash
  $ trunxcli autocomplete zsh
  $ trunxcli autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.2.0/src/commands/autocomplete/index.ts)_

## `trunxcli backups:create`

Make a backup of the encrypted wallet database

```
USAGE
  $ trunxcli backups:create

OPTIONS
  -l, --location=location  directory to save the wallet backup archive. default: $HOME/trunxio/backups

DESCRIPTION
  The backups:create command is used to make a new backup of the encryoted wallet database.
  Current wallet password will be required to access or import the backup.
```

_See code: [src/commands/backups/create.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/backups/create.js)_

## `trunxcli backups:import FILE`

Create a new database from a TrunxIO wallet backup

```
USAGE
  $ trunxcli backups:import FILE

ARGUMENTS
  FILE  location to the wallet archive to import

OPTIONS
  -n, --name=name  (required) name of the new wallet

DESCRIPTION
  The backups:import command is used to create a new database from a TrunxIO wallet backup
```

_See code: [src/commands/backups/import.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/backups/import.js)_

## `trunxcli backups:import_anchor FILE`

Create a new database from an Anchor wallet backup

```
USAGE
  $ trunxcli backups:import_anchor FILE

ARGUMENTS
  FILE  location to the wallet archive to import

OPTIONS
  -p, --password=password  password to encrypt the backup files with

DESCRIPTION
  The backups:import command is used to create a new database from an Anchor wallet backup.
  User will be required to enter the password used to create the backup archive in
  order to import.
```

_See code: [src/commands/backups/import_anchor.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/backups/import_anchor.js)_

## `trunxcli backups:import_scatter FILE`

Create a new database from an Scatter wallet backup

```
USAGE
  $ trunxcli backups:import_scatter FILE

ARGUMENTS
  FILE  location to the wallet archive to import

OPTIONS
  -p, --password=password  password for decrypting the backup files with

DESCRIPTION
  The backups:import command is used to create a new database from an Scatter wallet backup.
  User will be required to enter the password used to create the backup archive in
  order to import.
```

_See code: [src/commands/backups/import_scatter.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/backups/import_scatter.js)_

## `trunxcli chains:add SERVER`

Add chains to the wallet database

```
USAGE
  $ trunxcli chains:add SERVER

ARGUMENTS
  SERVER  http(s) address for the api endpoint

DESCRIPTION
  The chains:add command is used to add new chains to the current wallet database.
```

_See code: [src/commands/chains/add.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/chains/add.js)_

## `trunxcli chains:list`

List chains that are in the wallet database

```
USAGE
  $ trunxcli chains:list

DESCRIPTION
  The chains:list command is used to list the existing chains in the wallet database
```

_See code: [src/commands/chains/list.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/chains/list.js)_

## `trunxcli chains:remove SERVER`

Remove chains from the wallet database

```
USAGE
  $ trunxcli chains:remove SERVER

ARGUMENTS
  SERVER  http(s) address for the api endpoint

DESCRIPTION
  The chains:remove command is used to remove chains from the wallet database
```

_See code: [src/commands/chains/remove.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/chains/remove.js)_

## `trunxcli config:get [NAME]`

Get TrunxIO wallet config values

```
USAGE
  $ trunxcli config:get [NAME]

ARGUMENTS
  NAME  (optional) name of settings to filter by

DESCRIPTION
  The settings:get command is used to get TrunxIO wallet config values.
```

_See code: [src/commands/config/get.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/config/get.js)_

## `trunxcli config:init`

Init configuration file for the TrunxIO wallet

```
USAGE
  $ trunxcli config:init

DESCRIPTION
  The config:init command is an interactive command used to create the initial
  configuration for the TrunxIO wallet.
```

_See code: [src/commands/config/init.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/config/init.js)_

## `trunxcli config:set [SETTING]`

Set TrunxIO wallet config values

```
USAGE
  $ trunxcli config:set [SETTING]

ARGUMENTS
  SETTING  JSON string of the setting object to add to the user config. required keys: name, value

DESCRIPTION
  The settings:set command is used to set TrunxIO wallet config values.
```

_See code: [src/commands/config/set.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/config/set.js)_

## `trunxcli config:unset [NAME]`

Unset TrunxIO wallet config values

```
USAGE
  $ trunxcli config:unset [NAME]

ARGUMENTS
  NAME  name of setting to unset in userConfig

DESCRIPTION
  The settings:unset command is used to unset TrunxIO wallet config values.
```

_See code: [src/commands/config/unset.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/config/unset.js)_

## `trunxcli db:addobject DATA`

Add new object to the TrunxIO wallet database

```
USAGE
  $ trunxcli db:addobject DATA

ARGUMENTS
  DATA  json string of the object to add

OPTIONS
  -t, --table=table  (required) name of the table to remove object from

DESCRIPTION
  Add new object to the TrunxIO wallet database.
```

_See code: [src/commands/db/addobject.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/db/addobject.js)_

## `trunxcli db:list`

List wallets in the TrunxIO wallet database

```
USAGE
  $ trunxcli db:list
```

_See code: [src/commands/db/list.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/db/list.js)_

## `trunxcli db:lock`

Lock wallet database

```
USAGE
  $ trunxcli db:lock

DESCRIPTION
  The db:lock command is used to lock a wallet file.
```

_See code: [src/commands/db/lock.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/db/lock.js)_

## `trunxcli db:read TABLE`

Read full tables from the TrunxIO wallet database

```
USAGE
  $ trunxcli db:read TABLE

ARGUMENTS
  TABLE  name of table to read from database

DESCRIPTION
  Read full tables from the TrunxIO wallet database.

  Use the --showPrivate flag if you wish to see sensitive data in output.
```

_See code: [src/commands/db/read.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/db/read.js)_

## `trunxcli db:removeobject ID`

Remove an existing object from the TrunxIO wallet database

```
USAGE
  $ trunxcli db:removeobject ID

ARGUMENTS
  ID  _id of the object to remove

OPTIONS
  -t, --table=table  (required) name of the table to remove object from

DESCRIPTION
  Remove an existing object from the TrunxIO wallet database.
```

_See code: [src/commands/db/removeobject.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/db/removeobject.js)_

## `trunxcli db:setobject DATA`

Add or update an object to the TrunxIO wallet database.

```
USAGE
  $ trunxcli db:setobject DATA

ARGUMENTS
  DATA  json string of the object to set

OPTIONS
  -t, --table=table  (required) name of the table to set object in

DESCRIPTION
  Add or update an object to the TrunxIO wallet database.

  Notes:
    - This command will update an existing object in the database if data contains '_id' field.
```

_See code: [src/commands/db/setobject.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/db/setobject.js)_

## `trunxcli db:unlock`

Unlock TrunxIO wallet database

```
USAGE
  $ trunxcli db:unlock

OPTIONS
  -m, --mnemonic=mnemonic      mnemonic used to initialize the wallet (if none, random mnemonic will be used)
  -p, --password=password      password to use to unlock the wallet file (if none, can be entered interactively)
  -w, --walletName=walletName  name of the wallet database to unlock

DESCRIPTION
  The unlock command is used to unlock the TrunxIO wallet database.

  Use the --showPrivate flag if you wish to see private keys in output.
```

_See code: [src/commands/db/unlock.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/db/unlock.js)_

## `trunxcli eosio:buyram PAYER RECEIVER AMOUNT`

Buy RAM.

```
USAGE
  $ trunxcli eosio:buyram PAYER RECEIVER AMOUNT

ARGUMENTS
  PAYER     account paying for the RAM
  RECEIVER  account receiving the bought resources
  AMOUNT    amount of tokens to pay for RAM

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Buy RAM.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/buyram.js)_

## `trunxcli eosio:claimrewards OWNER`

Claim producer rewards.

```
USAGE
  $ trunxcli eosio:claimrewards OWNER

ARGUMENTS
  OWNER  account to claim rewards for

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Claim producer rewards.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/claimrewards.js)_

## `trunxcli eosio:delegatebw FROM RECEIVER STAKE_NET_QUANTITY STAKE_CPU_QUANTITY`

Delegate bandwidth to a user account

```
USAGE
  $ trunxcli eosio:delegatebw FROM RECEIVER STAKE_NET_QUANTITY STAKE_CPU_QUANTITY

ARGUMENTS
  FROM                account to delegate from
  RECEIVER            account to delegate to
  STAKE_NET_QUANTITY  token amount to stake for NET
  STAKE_CPU_QUANTITY  token amount to stake for CPU

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

  -t, --transfer               transfer voting and staking rights to account

DESCRIPTION
  ...
  Delegate bandwidth to a user account
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/delegatebw.js)_

## `trunxcli eosio:fetch`

Fetch some data from an EOSIO/DFuse endpoint

```
USAGE
  $ trunxcli eosio:fetch

OPTIONS
  -d, --data=data          json formatted string of data to query
  -e, --endpoint=endpoint  (required) endpoint to query (do not include server; use -s flag to specify server)
  -s, --server=server      EOSIO node

DESCRIPTION
  Fetch some data from an EOSIO/DFuse endpoint.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/fetch.js)_

## `trunxcli eosio:listbw ACCOUNT`

List bandwidth for the user account

```
USAGE
  $ trunxcli eosio:listbw ACCOUNT

ARGUMENTS
  ACCOUNT  account to query

OPTIONS
  -s, --server=server  EOSIO node. Will use `selectedServer` from user config if defined.

DESCRIPTION
  ...
  List bandwidth for the user account
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/listbw.js)_

## `trunxcli eosio:listproducers`

List block producers

```
USAGE
  $ trunxcli eosio:listproducers

OPTIONS
  -l, --lower_bound=lower_bound  lower bound of query results; used for pagination
  -n, --limit=limit              [default: 10] number of producers to return
  -s, --server=server            EOSIO node

DESCRIPTION
  ...
  List block producers
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/listproducers.js)_

## `trunxcli eosio:regproducer PRODUCER PRODUCER_KEY [URL] [LOCATION]`

Register an existing user account as a block producer.

```
USAGE
  $ trunxcli eosio:regproducer PRODUCER PRODUCER_KEY [URL] [LOCATION]

ARGUMENTS
  PRODUCER      account to register as a producer
  PRODUCER_KEY  public key to use for signing
  URL           url with information about the producer
  LOCATION      relative location; for nearest neighbor scheduling

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Register an existing user account as a block producer.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/regproducer.js)_

## `trunxcli eosio:regproxy PROXY`

Register an existing user account as a proxy for voting.

```
USAGE
  $ trunxcli eosio:regproxy PROXY

ARGUMENTS
  PROXY  account to register as a proxy

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Register an existing user account as a proxy for voting.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/regproxy.js)_

## `trunxcli eosio:sellram ACCOUNT BYTES`

Buy RAM.

```
USAGE
  $ trunxcli eosio:sellram ACCOUNT BYTES

ARGUMENTS
  ACCOUNT  account receiving tokens for sold RAM
  BYTES    number of RAM bytes to sell (must be in increments of 1024 on UTX network)

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Buy RAM.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/sellram.js)_

## `trunxcli eosio:transfer FROM TO QUANTITY [MEMO]`

Transfer tokens from one account to another.

```
USAGE
  $ trunxcli eosio:transfer FROM TO QUANTITY [MEMO]

ARGUMENTS
  FROM      account sending tokens
  TO        account receiving tokens
  QUANTITY  amount of tokens to send
  MEMO      memo attached to the transfer

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Transfer tokens from one account to another.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/transfer.js)_

## `trunxcli eosio:undelegatebw FROM RECEIVER UNSTAKE_NET_QUANTITY UNSTAKE_CPU_QUANTITY`

Undelegate bandwidth for the user account

```
USAGE
  $ trunxcli eosio:undelegatebw FROM RECEIVER UNSTAKE_NET_QUANTITY UNSTAKE_CPU_QUANTITY

ARGUMENTS
  FROM                  account to undelegate from
  RECEIVER              account to undelegate to
  UNSTAKE_NET_QUANTITY  token amount to unstake for NET
  UNSTAKE_CPU_QUANTITY  token amount to unstake for CPU

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Undelegate bandwidth for the user account
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/undelegatebw.js)_

## `trunxcli eosio:unregproducer PRODUCER`

Unregister an account from being a block producer.

```
USAGE
  $ trunxcli eosio:unregproducer PRODUCER

ARGUMENTS
  PRODUCER  account to register as a producer

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Unregister an account from being a block producer.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/unregproducer.js)_

## `trunxcli eosio:unregproxy PROXY`

Register an existing user account as a proxy for voting.

```
USAGE
  $ trunxcli eosio:unregproxy PROXY

ARGUMENTS
  PROXY  account to unregister as a proxy

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Register an existing user account as a proxy for voting.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/unregproxy.js)_

## `trunxcli eosio:voteproducer SUBCOMMAND VOTER PRODUCER`

Vote to approve or unapprove a producer or proxy.

```
USAGE
  $ trunxcli eosio:voteproducer SUBCOMMAND VOTER PRODUCER

ARGUMENTS
  SUBCOMMAND  specify the subcommand to use: [prods, proxy, approve, unapprove]. see help for more info.
  VOTER       account used to vote for a producer
  PRODUCER    producer (or proxy) to vote for (existing votes will not be changed)

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Vote for producers or set a voting proxy.
  Subcommands: [prods, proxy, approve, unapprove]
  	- 'proxy': Vote your stake through a proxy
  	- 'prods': Vote for one or more producers
  	- 'approve': Add one producer to list of voted producers
  	- 'unapprove': Remove one producer from list of voted producers
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/eosio/voteproducer.js)_

## `trunxcli esr:decode TX`

Parse ESR transaction and print the raw result

```
USAGE
  $ trunxcli esr:decode TX

ARGUMENTS
  TX  Transaction in ESR format

OPTIONS
  -p, --permission=permission  [default: ............1,............2] account@permission used to sign transaction.
  -s, --server=server          [default: http://localhost:8888] EOSIO node used for fetching ABIs

DESCRIPTION
  Parse ESR transaction and print the raw result.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/esr/decode.js)_

## `trunxcli esr:encode TX`

Encode EOSIO transaction as Singing Request

```
USAGE
  $ trunxcli esr:encode TX

ARGUMENTS
  TX  EOSIO Transaction in JSON format

OPTIONS
  -s, --server=server  EOSIO node used for fetching ABIs and chain_id. Defaults to: http://localhost:8888

DESCRIPTION
  Encode EOSIO transaction as Singing Request.
```

_See code: [@trunx-io/plugin-eosio](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.0/src/commands/esr/encode.js)_

## `trunxcli help [COMMAND]`

display help for trunxcli

```
USAGE
  $ trunxcli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.3.1/src/commands/help.ts)_

## `trunxcli keys:add KEY`

Add keys to the TrunxIO wallet database

```
USAGE
  $ trunxcli keys:add KEY

ARGUMENTS
  KEY  pub/priv key to add to the TrunxIO wallet database

DESCRIPTION
  The keys:add command is used to add new keys to the current TrunxIO wallet database.
```

_See code: [src/commands/keys/add.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/keys/add.js)_

## `trunxcli keys:derive [ROLE] [INDEX]`

Create new public/private key pairs from the wallets mnemonic phrase

```
USAGE
  $ trunxcli keys:derive [ROLE] [INDEX]

ARGUMENTS
  ROLE   (owner|active|custom) [default: owner] the role of the key to derive
  INDEX  [default: 0] the derivation path of the first key

OPTIONS
  -c, --count=count  [default: 1] the number of keys to generate

DESCRIPTION
  The keys:derive command is used to derive key pairs from the wallets mnemonic phrase
```

_See code: [src/commands/keys/derive.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/keys/derive.js)_

## `trunxcli keys:list`

List keys that are in the TrunxIO wallet database

```
USAGE
  $ trunxcli keys:list

DESCRIPTION
  The keys:list command is used to list the existing keys in the TrunxIO wallet database
```

_See code: [src/commands/keys/list.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/keys/list.js)_

## `trunxcli keys:remove KEY`

Remove keys from the TrunxIO wallet database

```
USAGE
  $ trunxcli keys:remove KEY

ARGUMENTS
  KEY  pub/priv key to add to the TrunxIO wallet database

DESCRIPTION
  The keys:remove command is used to remove new keys to the current TrunxIO wallet database.
```

_See code: [src/commands/keys/remove.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/keys/remove.js)_

## `trunxcli logs`

View the TrunxIO wallet logs

```
USAGE
  $ trunxcli logs

OPTIONS
  -c, --clear        clear (delete) the log files after printing
  -n, --lines=lines  [default: 20] number of lines to output
  -t, --tail         tail logs (keep process running and watch logs file)

DESCRIPTION
  The logs command will allow you to view the TrunxIO wallet logs.
```

_See code: [src/commands/logs.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/logs.js)_

## `trunxcli plugins`

List installed plugins.

```
USAGE
  $ trunxcli plugins

OPTIONS
  --core  Show core plugins.

EXAMPLE
  $ trunxcli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `trunxcli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ trunxcli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

OPTIONS
  -h, --help     Show CLI help.
  -v, --verbose

EXAMPLE
  $ trunxcli plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/inspect.ts)_

## `trunxcli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ trunxcli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

OPTIONS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ trunxcli plugins:add

EXAMPLES
  $ trunxcli plugins:install myplugin 
  $ trunxcli plugins:install https://github.com/someuser/someplugin
  $ trunxcli plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/install.ts)_

## `trunxcli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ trunxcli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
   command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ trunxcli plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/link.ts)_

## `trunxcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ trunxcli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     Show CLI help.
  -v, --verbose

ALIASES
  $ trunxcli plugins:unlink
  $ trunxcli plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/uninstall.ts)_

## `trunxcli plugins:update`

Update installed plugins.

```
USAGE
  $ trunxcli plugins:update

OPTIONS
  -h, --help     Show CLI help.
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/update.ts)_

## `trunxcli service:start`

Start the TrunxIO Wallet database service

```
USAGE
  $ trunxcli service:start

OPTIONS
  -b, --background       background process (detached)
  -d, --dataDir=dataDir  TrunxIO database service data directory

DESCRIPTION
  The service:start command will start the TrunxIO Wallet service and return its PID.
```

_See code: [src/commands/service/start.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/service/start.js)_

## `trunxcli service:stop`

Stop the TrunxIO Wallet database service

```
USAGE
  $ trunxcli service:stop

DESCRIPTION
  The service:stop command will stop the detached TrunxIO Wallet database service.
```

_See code: [src/commands/service/stop.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/service/stop.js)_

## `trunxcli status`

Output useful status information related to the TrunxIO Wallet

```
USAGE
  $ trunxcli status

DESCRIPTION
  The status command will tell the user if the TrunxIO Wallet service is running,
  if the wallet is unlocked, and which wallet is currently set as active.
```

_See code: [src/commands/status.js](https://github.com/Trunx-IO/cli/blob/v1.0.1/src/commands/status.js)_
<!-- commandsstop -->
