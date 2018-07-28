import Web3 from 'web3'
import {address, ABI} from './constants/tokenContract'
let getContract = new Promise(function (resolve, reject) {
 let web3 = new Web3(window.web3.currentProvider)
 let tasinoContract = web3.eth.contract(ABI)
 let tasinoContractInstance = tasinoContract.at(address)
 // casinoContractInstance = () => casinoContractInstance
 resolve(tasinoContractInstance)
})
export default getContract