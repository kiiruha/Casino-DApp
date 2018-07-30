import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import getTokenContract from '../util/getTokenContract'
import getCasinoContract from '../util/getCasinoContract'
import { mapState } from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  getWeb3,
  mutations: {
    registerWeb3Instance(state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      console.log(result)
      web3Copy.tokenBalance = result.tokenBalance
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
      pollWeb3()
    },

    pollWeb3Instance(state, payload) {
      console.log('pollWeb3Instance mutation being executed', payload)
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
      state.web3.tokenBalance = payload.tokenBalance
    },

    registerCasinoContractInstance(state, payload) {
      console.log('Casino contract instance: ', payload)
      state.casinoContractInstance = () => payload
    },

    registerTokenContractInstance(state, payload) {
      console.log('Token contract instance: ', payload)
      state.tokenContractInstance = () => payload
    }
  },
  actions: {
    registerWeb3({ commit }) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },

    pollWeb3({ commit }, payload) {
      console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload)
    },

    getCasinoContractInstance({ commit }) {
      getCasinoContract.then(result => {
        commit('registerCasinoContractInstance', result)
      }).catch(e => console.log(e))
    },

    getTokenContractInstance({ commit }) {
      getTokenContract.then(result => {
        commit('registerTokenContractInstance', result)
      }).catch(e => console.log(e))
    }
  }
})
