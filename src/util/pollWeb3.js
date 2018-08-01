import Web3 from 'web3'
import { store } from '../store/'


let pollWeb3 = function (state) {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)


  setInterval(() => {
    if (web3 && store.state.web3.web3Instance) {
      if (web3.eth.coinbase !== store.state.web3.coinbase|| store.state.web3.nowIdGame !==Math.floor(Math.floor(Date.now() / 1000) / 1000)) {
        let newCoinbase = web3.eth.coinbase
        web3.eth.getBalance(web3.eth.coinbase, function (err, newBalance) {
          if (err) {
            console.log(err)
          } else {
            let newTokenBalance
            store.state.tokenContractInstance().balanceOf.call(newCoinbase, function (err, symbol) {
              if (err) { console.log(err) }
              newTokenBalance = symbol
              store.dispatch('pollWeb3', {
                coinbase: newCoinbase,
                balance: parseInt(newBalance, 10),
                tokenBalance: newTokenBalance,
                nowIdGame: Math.floor(Math.floor(Date.now() / 1000) / 1000)
              })
            })
          }
        })
      } else {
        web3.eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
          if (err) {
            console.log(err)
          } else if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
            let TokenBalance
            store.state.tokenContractInstance().balanceOf.call(store.state.web3.coinbase, function (err, symbol) {
              if (err) { console.log(err) }
              TokenBalance = symbol
              store.dispatch('pollWeb3', {
                coinbase: store.state.web3.coinbase,
                balance: polledBalance,
                tokenBalance: TokenBalance,
                nowIdGame: Math.floor(Math.floor(Date.now() / 1000) / 1000)
              })
            })
          }
        })
      }
    }
  }, 500)
}

export default pollWeb3