const axios = require('axios');
const { cli } = require('cli-ux');
const inquirer = require('inquirer');
const _connectAndSend = require('@trunx-io/ipc-client').connectAndSend;

const hdkey = require('hdkey')
const wif = require('wif')
const ecc = require('eosjs-ecc')
const bip39 = require('bip39')

async function connectAndSend(action, args) {
  try {
    return await _connectAndSend('trunxio1', action, args);
  } catch(e) { return {error: e}; }
}

function prompt(questions, opts={}) {
  const prompt = inquirer.createPromptModule({ output: process.stderr })
  return prompt(questions, opts);
}

function spinner(type, message, silent=false) {
  if( silent ) return;

  switch(type){
    case 'start':
      cli.action.start(message);
      break;
    case 'stop':
      cli.action.stop(message);
      break;
    default:
      console.error('spinner type not recognized. must be either start/stop.');
  }
}

const exec = require('child_process').exec;

function uniquify(arr, keyProps) {
 const kvArray = arr.map(entry => {
  const key = keyProps.map(k => entry[k]).join('|');
  return [key, entry];
 });
 const map = new Map(kvArray);
 return Array.from(map.values());
}

function fetchAccountData(account_name, chain) {
  function a2n(st){return st && st.includes(' ')? parseFloat(st.split(' ')[0]) : 0}
  function a2s(st){return st && st.includes(' ')? st.split(' ')[1] : ""}

  return new Promise( async (resolve) => {
    try{
      let userInfo = await axios.post( chain.server + '/v1/chain/get_account', JSON.stringify({account_name}), {timeout: 3000} );
      //handle accounts with missing core data
      let obj = {
          ...userInfo.data,
          chain_id: chain.chain_id
      }
      if (userInfo.data.total_resources){
          obj.symbol = a2s(userInfo.data.total_resources.net_weight),
          obj.cpu = a2n(userInfo.data.total_resources.cpu_weight); 
          obj.net = a2n(userInfo.data.total_resources.net_weight); 
          obj.ram = userInfo.data.total_resources.ram_bytes; 
      }
      //if unlimited system account
      else if (!userInfo.data.total_resources) {
          obj.symbol = a2s(userInfo.data.core_liquid_balance);
          obj.cpu = 0;
          obj.net = 0;
          obj.ram = 0;
      }

      let balances = [];
      let chainContracts = chain.tokenContracts || [];
      let contracts = [...chainContracts, 'eosio.token'];
      for (var code of contracts){
        let balancesRes = await axios.post( chain.server + '/v1/chain/get_currency_balance', JSON.stringify({account:account_name, code}), {timeout: 3000});
        if (balancesRes.data) balances.push(...balancesRes.data.map(r=> {return { symbol:a2s(r), balance:a2n(r), contract: code }}));
      }
      obj.balances = balances;
      if (obj.symbol){
        let coreBalance = obj.balances.find(r=>r.symbol===obj.symbol && r.contract === 'eosio.token');
        if (coreBalance) obj.balance = coreBalance.balance;
      }

      obj.updated = new Date();
      resolve(obj)
    } catch(error) { resolve({error}) }
  });
}

function generateMnemonic() {
  return bip39.generateMnemonic();
}

function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}

function deriveKeyFromMnemonic(mnemonic, path="0/0") {
  let roles = {
    0: 'owner',
    1: 'active',
  }
  let seed = bip39.mnemonicToSeed(mnemonic)
  let master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
  let node = master.derive(`m/44'/194'/0'/${path}`)

  let role;

  let result;

  if(bip39.validateMnemonic(mnemonic)) {
    result = {
      mnemonic,
      role: roles[path.split('/')[0]] || 'custom',
      index: path.split('/')[1],
      publicKey:ecc.PublicKey(node._publicKey).toString(),
      privateKey:wif.encode(128, node._privateKey, false)
    }
  } else{
    result = {
      error:"mnemonic is invalid"
    }
  }

  return result;
}

module.exports = {
  prompt,
  spinner,
  uniquify,
  fetchAccountData,
  connectAndSend,
  generateMnemonic,
  validateMnemonic,
  deriveKeyFromMnemonic
}
