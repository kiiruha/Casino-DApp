import Web3 from 'web3'
import { address, ABI } from './constants/casinoContract'
let getCasinoContract = new Promise(function (resolve, reject) {
    let web3 = new Web3(window.web3.currentProvider)
    //let web3 = new Web3(new Web3.providers.HttpProvider('http://ropsten.infura.io')) 
    let casinoContract = web3.eth.contract(ABI)
    let casinoContractInstance = casinoContract.at(address)
    // casinoContractInstance = () => casinoContractInstance
    //console.log(casinoContract)
    //console.log(casinoContractInstance)
    resolve(casinoContractInstance)
})
export default getCasinoContract