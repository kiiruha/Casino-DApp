webpackJsonp([1],{0:function(e,t){},1:function(e,t){},"1/oy":function(e,t){},"9M+g":function(e,t){},"AO+X":function(e,t){},EEbw:function(e,t){e.exports={version:"0.20.7"}},GfHa:function(e,t){},Id91:function(e,t){},Jmt5:function(e,t){},KkjP:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var o=n("VU/8")({name:"App"},s,!1,function(e){n("vGjf")},null,null).exports,i=n("/ocq"),r=n("e6fC"),c=(n("9M+g"),{1:"Main Net",3:"Ropsten",4:"Rinkeby",42:"Kovan",5777:"Ganache Blockchain"}),u=n("NYxO"),l={name:"hello-metamask",computed:Object(u.b)({isInjected:function(e){return e.web3.isInjected},network:function(e){return c[e.web3.networkId]},coinbase:function(e){return e.web3.coinbase},ethBalance:function(e){if(null!==e.web3.web3Instance)return e.web3.web3Instance().fromWei(e.web3.balance,"ether")},tokenBalance:function(e){return e.web3.tokenBalance},gameId:function(e){return e.web3.nowIdGame}})},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"metamask-info"},[e.isInjected?n("p",{attrs:{id:"has-metamask"}},[n("i",{staticClass:"fa fa-check ",attrs:{"aria-hidden":"true"}}),e._v(" Metamask installed")]):n("p",{attrs:{id:"no-metamask"}},[n("i",{staticClass:"fa fa-times",attrs:{"aria-hidden":"true"}}),e._v(" Metamask not found")]),e._v(" "),n("p",[e._v("Network: "+e._s(e.network))]),e._v(" "),n("p",[e._v("Account: "+e._s(e.coinbase))]),e._v(" "),n("p",[e._v("Balance: "+e._s(e.ethBalance)+" Eth")]),e._v(" "),n("p",[e._v("Token balance: "+e._s(e.tokenBalance)+" ")]),e._v(" "),n("p",[e._v("Now Gameid: "+e._s(e.gameId)+" ")])])},staticRenderFns:[]};var m=n("VU/8")(l,p,!1,function(e){n("AO+X")},"data-v-9528e158",null).exports,d=n("7t+N"),b=n.n(d);n("Jmt5"),n("K3J8"),n("TwJj");a.a.use(r.a);var y={name:"casino",data:function(){return{approveEvent:null,allGamesEvent:null,allBetsEvent:null,prevBetsEvent:null,statusCheckingWinner:null,visibleCheckingButton:!0,amount:null,nextGameId:null,pending:!1,pushBetEvent:null,number:null,youWin:null,checkWinnerEvent:null,TimeOutForPushBet:Math.floor(Date.now()/1e3)+120<1e3*(this.$store.state.web3.nowIdGame+1)}},mounted:function(){var e=this;setInterval(function(){e.TimeOutForPushBet=Math.floor(Date.now()/1e3)+120<1e3*(e.$store.state.web3.nowIdGame+1),e.nextGameId===e.$store.state.web3.nowIdGame&&(e.visibleCheckingButton=!0,e.youWin=!1)},1e3),setTimeout(function(){e.getAllGames()},5e3)},methods:{exchangeEther:function(e){var t=this;console.log("Change Ether to Token and approve it to casino",e.target.innerHTML,this.amount),this.$store.state.web3.web3Instance().toWei(this.amount,"ether")<this.$store.state.web3.balance&&this.$store.state.web3.balance>9e-4?(this.pending=!0,this.$store.state.tokenContractInstance().exchangeEther({gas:3e5,value:this.$store.state.web3.web3Instance().toWei(this.amount,"ether"),from:this.$store.state.web3.coinbase,gasPrice:web3.toWei(20,"gwei")},function(e,n){if(e)console.log(e),t.pending=!1;else{console.log(n);var a=parseInt(t.$store.state.web3.tokenBalance,10)+parseInt(1e3*t.amount,10);console.log(a),t.$store.state.tokenContractInstance().approve(t.$store.state.casinoContractInstance().address,a,{gas:3e5,gasPrice:web3.toWei(20,"gwei"),from:t.$store.state.web3.coinbase},function(e,n){e?(console.log(e),t.pending=!1):t.$store.state.tokenContractInstance().Approval().watch(function(e,n){e?(console.log(e),t.pending=!1):(t.approveEvent=n.args,t.pending=!1,console.log(t.approveEvent))})})}})):alert("You dont have enough ether")},Bet:function(e){var t=this;console.log(e.target.innerHTML,this.number),this.$store.state.web3.tokenBalance>=100&&(this.pending=!0,console.log(this.number,"  ",this.$store.state.web3.nowIdGame),this.$store.state.casinoContractInstance().pushBet(this.number,this.$store.state.web3.nowIdGame,{gas:3e5,from:this.$store.state.web3.coinbase,gasPrice:web3.toWei(20,"gwei")},function(e,n){e?(console.log(e),t.pending=!1):(console.log(n),t.$store.state.casinoContractInstance().TakingBets().watch(function(e,n){e?(console.log(e),t.pending=!1):(t.pending=!1,t.pushBetEvent=n.args,t.pushBetEvent.Game_id=parseInt(n.args.Game_id,10),console.log(t.pushBetEvent),console.log(t.pushBetEvent.Game_id))}))}))},checkWinner:function(e){var t=this;console.log(e.target.innerHTML),this.pending=!0,this.$store.state.casinoContractInstance().checkWinner(this.$store.state.web3.nowIdGame-1,{gas:3e5,from:this.$store.state.web3.coinbase,gasPrice:web3.toWei(20,"gwei")},function(e,n){e?(console.log(e),t.pending=!1):(console.log(n),t.$store.state.casinoContractInstance().PlayedGames().watch(function(e,n){e?(console.log(e),t.pending=!1):(!0===n&&t.number===n.args._number.toNumber()&&(t.youWin=!0),t.pending=!1,t.statusCheckingWinner=!0,t.checkWinnerEvent=n.args,console.log(t.checkWinnerEvent),t.checkWinnerEvent.number=n.args._number.toNumber(),console.log(t.checkWinnerEvent.number))}))})},checkGameStatus:function(e){var t=this;console.log(e.target.innerHTML),this.visibleCheckingButton=!1,this.nextGameId=this.$store.state.web3.nowIdGame+1,this.$store.state.casinoContractInstance().getStatusGame.call(this.$store.state.web3.nowIdGame-1,function(e,n){e?console.log(e):(t.statusCheckingWinner=n,!0===n&&t.number===t.allGamesEvent._number.toNumber()&&(t.youWin=!0),console.log(n," status game with id ",t.$store.state.web3.nowIdGame-1))})},getAllBets:function(e){var t=this;b()("bets").empty(),console.log(e.target.innerHTML),this.$store.state.casinoContractInstance().TakingBets({Game_id:this.$store.state.web3.nowIdGame},{fromBlock:3756624}).watch(function(e,n){e?console.log(e):(t.allBetsEvent=n.args,b()("#bets").append('<li class="list-group-item">'+n.args.player_address+" push bet to number "+n.args._number+"</li>"),console.log(t.allBetsEvent))})},getPrevBets:function(){var e=this;console.log("get prev events"),this.$store.state.casinoContractInstance().TakingBets({Game_id:this.$store.state.web3.nowIdGame-1},{fromBlock:3756624}).watch(function(t,n){t?console.log(t):(e.prevBetsEvent=n.args,console.log(e.prevBetsEvent))})},getAllGames:function(){var e=this;b()("ul").empty(),this.$store.state.casinoContractInstance().PlayedGames({},{fromBlock:3756624}).watch(function(t,n){t?console.log(t):(e.allGamesEvent=n.args,b()("#game").append('<li class="list-group-item">'+n.args.Game_id+" have winner number "+n.args._number+" and bank "+n.args._bank+"</li>"),console.log(e.allGamesEvent))})}}},f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"casino container col-12"},[n("button",{staticClass:"btn  btn-lg btn-success float-left",attrs:{type:"button","data-toggle":"modal","data-target":"#betModal"},on:{click:e.getAllBets}},[e._v("\r\n      Get all bets\r\n    ")]),e._v(" "),n("button",{staticClass:"btn  btn-lg btn-success float-right",attrs:{type:"button","data-toggle":"modal","data-target":"#gamesModal"}},[e._v("\r\n      Get all games\r\n    ")]),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v("\r\n        \r\n    Amount ether to exchange: "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.amount,expression:"amount"}],attrs:{placeholder:"0"},domProps:{value:e.amount},on:{input:function(t){t.target.composing||(e.amount=t.target.value)}}}),e._v(" "),n("button",{staticClass:"btn btn-light btn-lg  ",on:{click:e.exchangeEther}},[e._v("exchangeEther")]),e._v(" "),n("br"),e._v(" "),n("br"),e._v(" "),e.TimeOutForPushBet?n("div",[e._v("\r\n    Set number for bet: "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.number,expression:"number"}],attrs:{placeholder:"0"},domProps:{value:e.number},on:{input:function(t){t.target.composing||(e.number=t.target.value)}}}),e._v(" "),n("button",{staticClass:"btn btn-lg  btn-primary",on:{click:e.Bet}},[e._v("Take Bet")])]):n("div",[n("p",[e._v("Left 2 minutes to end game with id "+e._s(this.$store.state.web3.nowIdGame)+". You can push bet only the next game")])]),e._v(" "),n("br"),e._v(" "),e.visibleCheckingButton?n("button",{staticClass:"btn  btn-lg btn-success",on:{click:e.checkGameStatus}},[e._v("Check previous game status")]):e._e(),e._v(" "),n("br"),e._v(" "),e.visibleCheckingButton?e._e():n("div",[e.statusCheckingWinner?e._e():n("button",{staticClass:"btn btn-lg  btn-warning",on:{click:e.checkWinner}},[e._v("Check winner in game with id "+e._s(this.$store.state.web3.nowIdGame-1))]),e._v(" "),e.statusCheckingWinner&&!e.youWin?n("p",[e._v("The drawing of prev game has already been completed, please try the next game")]):e._e(),e._v(" "),e.statusCheckingWinner&&e.youWin?n("p",[e._v(" Congratulations you win in previous game")]):e._e()]),e._v(" "),e.pending?n("img",{attrs:{id:"loader",src:"https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif"}}):e._e()])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal fade",attrs:{id:"gamesModal",role:"dialog","aria-labelledby":"allGames","aria-hidden":"true"}},[t("div",{staticClass:"modal-dialog modal-lg"},[t("div",{staticClass:"modal-content "},[t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title",attrs:{id:"gamesModal"}},[this._v("All games")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])]),this._v(" "),t("div",{staticClass:"modal-body "},[t("ul",{staticClass:"list-group game",attrs:{id:"game"}})]),this._v(" "),t("div",{staticClass:"modal-footer"},[t("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[this._v("Close")])])])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal fade",attrs:{id:"betModal",tabindex:"-1",role:"dialog","aria-labelledby":"allBet","aria-hidden":"true"}},[t("div",{staticClass:"modal-dialog s",attrs:{role:"document"}},[t("div",{staticClass:"modal-content "},[t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title",attrs:{id:"allBet"}},[this._v("All bets on this game")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])]),this._v(" "),t("div",{staticClass:"modal-body"},[t("ul",{staticClass:" list-group",attrs:{id:"bets"}})]),this._v(" "),t("div",{staticClass:"modal-footer"},[t("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[this._v("Close")])])])])])}]};var g={name:"casino-dapp",beforeCreate:function(){console.log("dispatching getCasinoContractInstance"),this.$store.dispatch("getCasinoContractInstance"),console.log("dispatching getTokenContractInstance"),this.$store.dispatch("getTokenContractInstance"),console.log("registerWeb3 Action dispatched from casino-dapp.vue"),this.$store.dispatch("registerWeb3")},components:{"hello-metamask":m,"casino-component":n("VU/8")(y,f,!1,function(e){n("KkjP")},"data-v-e0369dc4",null).exports}},v={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("hello-metamask"),this._v(" "),t("casino-component")],1)},staticRenderFns:[]};var h=n("VU/8")(g,v,!1,function(e){n("W8LD")},"data-v-7005b078",null).exports;a.a.use(i.a);var w=new i.a({routes:[{path:"/",name:"casino-dapp",component:h}]}),_={web3:{isInjected:!1,web3Instance:null,networkId:null,coinbase:null,balance:null,tokenBalance:null,error:null,nowIdGame:null},tokenContractInstance:null,casinoContractInstance:null},k=n("woOf"),I=n.n(k),C=n("//Fk"),x=n.n(C),G=n("8k0n"),B=n.n(G),M=new x.a(function(e,t){var n=window.web3;if(void 0!==n){var a=new B.a(n.currentProvider);e({injectedWeb3:a.isConnected(),web3:function(){return a}})}else t(new Error("Unable to connect to Metamask"))}).then(function(e){return new x.a(function(t,n){e.web3().version.getNetwork(function(a,s){a?n(new Error("Unable to retrieve network ID")):(e=I()({},e,{networkId:s}),t(e))})})}).then(function(e){return new x.a(function(t,n){e.web3().eth.getCoinbase(function(a,s){a?n(new Error("Unable to retrieve coinbase")):(e=I()({},e,{coinbase:s}),t(e))})})}).then(function(e){return new x.a(function(t,n){e.web3().eth.getBalance(e.coinbase,function(a,s){a?n(new Error("Unable to retrieve balance for address: "+e.coinbase)):(e=I()({},e,{balance:s}),t(e))})})}).then(function(e){return new x.a(function(t,n){A.state.tokenContractInstance().balanceOf.call(e.coinbase,function(n,a){n&&console.log(n),e=I()({},e,{tokenBalance:a}),console.log(e),t(e)})})}),W=function(e){var t=window.web3;t=new B.a(t.currentProvider),setInterval(function(){if(t&&A.state.web3.web3Instance)if(t.eth.coinbase!==A.state.web3.coinbase||A.state.web3.nowIdGame!==Math.floor(Math.floor(Date.now()/1e3)/1e3)){var e=t.eth.coinbase;t.eth.getBalance(t.eth.coinbase,function(t,n){if(t)console.log(t);else{var a=void 0;A.state.tokenContractInstance().balanceOf.call(e,function(t,s){t&&console.log(t),a=s,A.dispatch("pollWeb3",{coinbase:e,balance:parseInt(n,10),tokenBalance:a.toNumber(),nowIdGame:Math.floor(Math.floor(Date.now()/1e3)/1e3)})})}})}else t.eth.getBalance(A.state.web3.coinbase,function(e,t){if(e)console.log(e);else if(parseInt(t,10)!==A.state.web3.balance){var n=void 0;A.state.tokenContractInstance().balanceOf.call(A.state.web3.coinbase,function(e,a){e&&console.log(e),n=a,A.dispatch("pollWeb3",{coinbase:A.state.web3.coinbase,balance:t,tokenBalance:n.toNumber(),nowIdGame:Math.floor(Math.floor(Date.now()/1e3)/1e3)})})}})},500)},$=[{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"spender",type:"address"},{name:"tokens",type:"uint256"}],name:"approve",outputs:[{name:"success",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"tokens",type:"uint256"}],name:"transferFrom",outputs:[{name:"success",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"decimals",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"platform",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"tokenOwner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"platformAddress",type:"address"}],name:"changePlatform",outputs:[{name:"success",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[],name:"acceptOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"to",type:"address"},{name:"tokens",type:"uint256"}],name:"transfer",outputs:[{name:"success",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[],name:"exchangeEther",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"newOwner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"tokenOwner",type:"address"},{name:"spender",type:"address"}],name:"allowance",outputs:[{name:"remaining",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[{name:"platformAddress",type:"address"},{name:"name_",type:"string"},{name:"symbol_",type:"string"},{name:"totalSupply_",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{payable:!0,stateMutability:"payable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"_from",type:"address"},{indexed:!0,name:"_to",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"tokens",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"tokenOwner",type:"address"},{indexed:!0,name:"spender",type:"address"},{indexed:!1,name:"tokens",type:"uint256"}],name:"Approval",type:"event"}],E=new x.a(function(e,t){e(new B.a(window.web3.currentProvider).eth.contract($).at("0xdfd6e7b51f1e92823ee6ce74cb006d894c7771aa"))}),T=[{constant:!1,inputs:[],name:"acceptOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_Game_id",type:"uint256"}],name:"checkWinner",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"Game_id",type:"uint256"},{indexed:!1,name:"_number",type:"uint256"},{indexed:!1,name:"_startGame",type:"uint256"},{indexed:!1,name:"_endGame",type:"uint256"},{indexed:!1,name:"_bank",type:"uint256"},{indexed:!1,name:"_status",type:"bool"}],name:"PlayedGames",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"Game_id",type:"uint256"},{indexed:!1,name:"player_address",type:"address"},{indexed:!1,name:"_number",type:"uint256"},{indexed:!1,name:"time",type:"uint256"}],name:"TakingBets",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_from",type:"address"},{indexed:!0,name:"_to",type:"address"}],name:"OwnershipTransferred",type:"event"},{constant:!1,inputs:[{name:"_number",type:"uint256"},{name:"Game_id",type:"uint256"}],name:"pushBet",outputs:[{name:"success",type:"bool"}],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"_newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[{name:"_tokenAddress",type:"address"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{constant:!0,inputs:[{name:"_Game_id",type:"uint256"}],name:"getNowBank",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"Game_id",type:"uint256"}],name:"getStatusGame",outputs:[{name:"success",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"Game_id",type:"uint256"}],name:"getTimes",outputs:[{name:"",type:"uint256"},{name:"",type:"uint256"},{name:"",type:"uint256"},{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"Game_id",type:"uint256"}],name:"getWinningNumber",outputs:[{name:"_number",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"newOwner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"random",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"}],O=new x.a(function(e,t){e(new B.a(window.web3.currentProvider).eth.contract(T).at("0x4928d8a3d5d6c9012a88deb93cffd319a219a3d9"))});a.a.use(u.a);var A=new u.a.Store({strict:!0,state:_,getWeb3:M,mutations:{registerWeb3Instance:function(e,t){console.log("registerWeb3instance Mutation being executed",t);var n=t,a=e.web3;a.coinbase=n.coinbase,console.log(n),a.tokenBalance=n.tokenBalance.toNumber(),a.networkId=n.networkId,a.balance=parseInt(n.balance,10),a.isInjected=n.injectedWeb3,a.web3Instance=n.web3,a.nowIdGame=Math.floor(Math.floor(Date.now()/1e3)/1e3),e.web3=a,W()},pollWeb3Instance:function(e,t){console.log("pollWeb3Instance mutation being executed",t),e.web3.coinbase=t.coinbase,e.web3.balance=parseInt(t.balance,10),e.web3.tokenBalance=t.tokenBalance,e.web3.nowIdGame=t.nowIdGame},registerCasinoContractInstance:function(e,t){console.log("Casino contract instance: ",t),e.casinoContractInstance=function(){return t}},registerTokenContractInstance:function(e,t){console.log("Token contract instance: ",t),e.tokenContractInstance=function(){return t}}},actions:{registerWeb3:function(e){var t=e.commit;console.log("registerWeb3 Action being executed"),M.then(function(e){console.log("committing result to registerWeb3Instance mutation"),t("registerWeb3Instance",e)}).catch(function(e){console.log("error in action registerWeb3",e)})},pollWeb3:function(e,t){var n=e.commit;console.log("pollWeb3 action being executed"),n("pollWeb3Instance",t)},getCasinoContractInstance:function(e){var t=e.commit;O.then(function(e){t("registerCasinoContractInstance",e)}).catch(function(e){return console.log(e)})},getTokenContractInstance:function(e){var t=e.commit;E.then(function(e){t("registerTokenContractInstance",e)}).catch(function(e){return console.log(e)})}}});a.a.config.productionTip=!1,new a.a({el:"#app",router:w,store:A,components:{App:o},template:"<App/>"})},"R/pS":function(e,t){e.exports=[{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"name",outputs:[{name:"o_name",type:"bytes32"}],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"owner",outputs:[{name:"",type:"address"}],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"content",outputs:[{name:"",type:"bytes32"}],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"addr",outputs:[{name:"",type:"address"}],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"}],name:"reserve",outputs:[],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"subRegistrar",outputs:[{name:"",type:"address"}],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_newOwner",type:"address"}],name:"transfer",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_registrar",type:"address"}],name:"setSubRegistrar",outputs:[],type:"function"},{constant:!1,inputs:[],name:"Registrar",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_a",type:"address"},{name:"_primary",type:"bool"}],name:"setAddress",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_content",type:"bytes32"}],name:"setContent",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"}],name:"disown",outputs:[],type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"_name",type:"bytes32"},{indexed:!1,name:"_winner",type:"address"}],name:"AuctionEnded",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_name",type:"bytes32"},{indexed:!1,name:"_bidder",type:"address"},{indexed:!1,name:"_value",type:"uint256"}],name:"NewBid",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"name",type:"bytes32"}],name:"Changed",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"name",type:"bytes32"},{indexed:!0,name:"addr",type:"address"}],name:"PrimaryChanged",type:"event"}]},UIsv:function(e,t){e.exports=[{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"owner",outputs:[{name:"",type:"address"}],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_refund",type:"address"}],name:"disown",outputs:[],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"addr",outputs:[{name:"",type:"address"}],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"}],name:"reserve",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_newOwner",type:"address"}],name:"transfer",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_a",type:"address"}],name:"setAddr",outputs:[],type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"name",type:"bytes32"}],name:"Changed",type:"event"}]},W8LD:function(e,t){},oPsS:function(e,t){e.exports=[{constant:!1,inputs:[{name:"from",type:"bytes32"},{name:"to",type:"address"},{name:"value",type:"uint256"}],name:"transfer",outputs:[],type:"function"},{constant:!1,inputs:[{name:"from",type:"bytes32"},{name:"to",type:"address"},{name:"indirectId",type:"bytes32"},{name:"value",type:"uint256"}],name:"icapTransfer",outputs:[],type:"function"},{constant:!1,inputs:[{name:"to",type:"bytes32"}],name:"deposit",outputs:[],payable:!0,type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"AnonymousDeposit",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"bytes32"},{indexed:!1,name:"value",type:"uint256"}],name:"Deposit",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"bytes32"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"bytes32"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"indirectId",type:"bytes32"},{indexed:!1,name:"value",type:"uint256"}],name:"IcapTransfer",type:"event"}]},vGjf:function(e,t){},zj2Q:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.e5295be6604b0721e88f.js.map