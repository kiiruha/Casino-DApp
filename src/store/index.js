import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
Vue.use(Vuex)
export const store = new Vuex.Store({
 strict: true,
 state,
 getWeb3,
 mutations: {},
 actions: {}
})