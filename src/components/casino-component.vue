<template>

<div class="casino container">

    Amount ether to exchange: <input v-model="amount" placeholder="0">
    <button v-on:click="exchangeEther" class="btn btn-info btn-lg ">exchangeEther</button>
    <br>
    <br>
    Set number for bet: <input v-model="number" placeholder="0">
    <button v-if="TimeOutForPushBet" v-on:click="Bet" class="btn btn-lg  btn-danger">Take Bet</button>
    <br>
    <br>
    <button  v-on:click="checkWinner" class="btn btn-lg  btn-warning">Check winner in game with id {{this.$store.state.web3.nowIdGame-1}}</button>
    <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "casino",
  data() {
    return {
      amount: null,
      pending: false,
      pushBetEvent: null,
      number: null,
      checkWinnerEvent: null
    };
  },

  computed: {
    TimeOutForPushBet: function () {
      return Math.floor(Date.now() / 1000) + 500 <=(this.$store.state.web3.nowIdGame+1)*1000
    }
  },

  methods: {
    exchangeEther(event) {
      console.log(
        "Change Ether to Token and approve it to casino",
        event.target.innerHTML,
        this.amount
      );
      if (
        this.$store.state.web3.web3Instance().toWei(this.amount, "ether") <
        this.$store.state.web3.balance && this.$store.state.web3.balance>0.0009
      ) {
        this.pending = true;
        this.$store.state.tokenContractInstance().exchangeEther(
          {
            gas: 300000,
            value: this.$store.state.web3
              .web3Instance()
              .toWei(this.amount, "ether"),
            from: this.$store.state.web3.coinbase,
            gasPrice: web3.toWei(20, "gwei")
          },
          (err, result) => {
            if (err) {
              console.log(err);
              this.pending = false;
            } else {
              console.log(result);
              //call aprove
              let token =
                parseInt(this.$store.state.web3.tokenBalance, 10) +
                parseInt(this.amount * 1000, 10)//change amounnt
              console.log(token)
              this.$store.state.tokenContractInstance().approve(
                this.$store.state.casinoContractInstance().address,
                token,
                {
                  gas: 300000,
                  gasPrice: web3.toWei(20, "gwei"),
                  from: this.$store.state.web3.coinbase
                },
                (err, result) => {
                  if (err) {
                    console.log(err);
                    this.pending = false;
                  } else {
                    this.pending = false;
                    console.log(result);
                  }
                }
              );
            }
          }
        );
      } else {
        alert("You dont have enough ether");
      }
    },

    Bet(event) {
      console.log( event.target.innerHTML, this.number);
      if (this.$store.state.web3.tokenBalance >= 100) {
        this.pending = true;
        console.log(this.number, "  ", this.$store.state.web3.nowIdGame)
        this.$store.state.casinoContractInstance().pushBet(
          this.number,
          this.$store.state.web3.nowIdGame,
          {
            gas: 300000,
            from: this.$store.state.web3.coinbase,
            gasPrice: web3.toWei(20, "gwei")
          },
          (err, result) => {
            if (err) {
              console.log(err);
              this.pending = false;
            } else {
              console.log(result);
              let TakedBet = this.$store.state.casinoContractInstance().TakingBets();
              TakedBet.watch((err, result) => {
                if (err) {
                  console.log(err);
                  this.pending = false;
                } else {
                  this.pushBetEvent = result.args;
                  this.pushBetEvent.Game_id = parseInt(result.args.Game_id, 10)
                  this.pending = false;
                  console.log(this.pushBetEvent.Game_id)
                }
              });
            }
          }
        );
      }
    },

    checkWinner(event) {
       console.log( event.target.innerHTML);
        this.pending = true;
       this.$store.state.casinoContractInstance().checkWinner(
          this.$store.state.web3.nowIdGame-1,
          {
            gas: 300000,
            from: this.$store.state.web3.coinbase,
            gasPrice: web3.toWei(20, "gwei")
          },
          (err, result) => {
            if (err) {
              console.log(err);
              this.pending = false;
            } else {
              console.log(result);
              let checkWinnerEvent = this.$store.state.casinoContractInstance().PlayedGames();
              checkWinnerEvent.watch((err, result) => {
                if (err) {
                  console.log(err);
                  this.pending = false;
                } else {
                  this.checkWinnerEvent = result.args;
                  this.checkWinnerEvent.number = parseInt(result.args.number, 10)
                  this.pending = false;
                  console.log(this.checkWinnerEvent.number)
                }
              });
            }
          }
        );
    }
  }
};
</script>

<style scoped>
.casino {
  margin-top: 50px;
  text-align: center;
}
#loader {
  width: 150px;
}
ul {
  margin: 25px;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 25px;
}
li {
  padding: 20px;
  margin-right: 5px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fff;
  border: -2px solid #bf0d9b;
  color: #bf0d9b;
  box-shadow: 3px 5px #bf0d9b;
}
li:hover {
  background-color: #bf0d9b;
  color: white;
  box-shadow: 0px 0px #bf0d9b;
}
li:active {
  opacity: 0.7;
}
* {
  color: #444444;
}
#has-won {
  color: green;
}
#has-lost {
  color: red;
}
</style>