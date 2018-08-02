<template>

<div class="casino container col-12">
    <button type="button" data-toggle="modal" data-target="#betModal" v-on:click="getAllBets" class="btn  btn-lg btn-success float-left" >
      Get all bets
    </button>
    <button type="button" data-toggle="modal" data-target="#gamesModal"  v-on:click="getAllGames" class="btn  btn-lg btn-success float-right" >
      Get all games
    </button>


    <div class="modal fade" id="gamesModal" tabindex="-1" role="dialog" aria-labelledby="allGames" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="gamesModal">All games</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul id="game" class="list-group"></ul>
            <div v-for="(value, key) in allGamesEvent">
               {{ key }}: {{ value }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="betModal" tabindex="-1" role="dialog" aria-labelledby="allBet" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="allBet">All bets on this game</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul id="bets" class=" list-group"></ul>
            <div v-for="(value, key) in allBetsEvent">
               {{ key }}: {{ value }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
        
    Amount ether to exchange: <input v-model="amount" placeholder="0">
    <button v-on:click="exchangeEther" class="btn btn-light btn-lg  ">exchangeEther</button>
    <br>
    <br>
    <div v-if="TimeOutForPushBet" >
    Set number for bet: <input v-model="number" placeholder="0">
    <button  v-on:click="Bet" class="btn btn-lg  btn-primary">Take Bet</button>
    </div>
    <div v-else>
      <p>Left 2 minutes to end game with id {{this.$store.state.web3.nowIdGame}}. You can push bet only the next game</p>
    </div>
    <br>
    <button v-on:click="checkGameStatus" v-if="visibleCheckingButton" class="btn  btn-lg btn-success">Check previous game status</button>
    <br>
    <div v-if="!visibleCheckingButton">
        <button v-if="!statusCheckingWinner" v-on:click="checkWinner"  class="btn btn-lg  btn-warning">Check winner in game with id {{this.$store.state.web3.nowIdGame-1}}</button>
        <p v-if="statusCheckingWinner && !youWin">The drawing of prev game has already been completed, please try the next game</p>
        <p v-if="statusCheckingWinner && youWin"> Congratulations you win in previous game</p>
    </div>
    <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
  </div>
</template>

<script>
import BootstrapVue from "bootstrap-vue";
import Vue from "vue";

Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue.js";

export default {
  name: "casino",
  data() {
    return {
      approveEvent: null,
      allGamesEvent: null,
      allBetsEvent: null,
      prevBetsEvent: null,
      statusCheckingWinner: null,
      visibleCheckingButton: true,
      amount: null,
      nextGameId: null,
      pending: false,
      pushBetEvent: null,
      number: null,
      youWin: null,
      checkWinnerEvent: null,
      TimeOutForPushBet:
        Math.floor(Date.now() / 1000) + 120 <
        (this.$store.state.web3.nowIdGame + 1) * 1000
    };
  },

  mounted() {
    setInterval(() => {
      this.TimeOutForPushBet =
        Math.floor(Date.now() / 1000) + 120 <
        (this.$store.state.web3.nowIdGame + 1) * 1000;
      if (this.nextGameId === this.$store.state.web3.nowIdGame) {
        this.visibleCheckingButton = true;
        this.youWin = false;
    
      }
    }, 1000);
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
          this.$store.state.web3.balance &&
        this.$store.state.web3.balance > 0.0009
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
                parseInt(this.amount * 1000, 10); //change amounnt
              console.log(token);
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
                    let approveEvent = this.$store.state
                      .tokenContractInstance()
                      .Approval();
                    approveEvent.watch((err, result) => {
                      if (err) {
                        console.log(err);
                        this.pending = false;
                      } else {
                        this.approveEvent = result.args;
                        this.pending = false;
                        console.log(this.approveEvent);
                      }
                    });
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
      console.log(event.target.innerHTML, this.number);
      if (this.$store.state.web3.tokenBalance >= 100) {
        this.pending = true;
        console.log(this.number, "  ", this.$store.state.web3.nowIdGame);
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
              let TakedBet = this.$store.state
                .casinoContractInstance()
                .TakingBets();
              TakedBet.watch((err, result) => {
                if (err) {
                  console.log(err);
                  this.pending = false;
                } else {
                  this.pending = false;
                  this.pushBetEvent = result.args;
                  this.pushBetEvent.Game_id = parseInt(result.args.Game_id, 10);
                  console.log(this.pushBetEvent);
                  console.log(this.pushBetEvent.Game_id);
                }
              });
            }
          }
        );
      }
    },

    checkWinner(event) {
      console.log(event.target.innerHTML);
      this.pending = true;
      this.$store.state.casinoContractInstance().checkWinner(
        this.$store.state.web3.nowIdGame - 1,
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
            let checkWinnerEvent = this.$store.state
              .casinoContractInstance()
              .PlayedGames();
            checkWinnerEvent.watch((err, result) => {
              if (err) {
                console.log(err);
                this.pending = false;
              } else {
                if((result === true)&&(this.number === result.args._number.toNumber())) {
                this.youWin = true;
              }
                this.pending = false;
                this.statusCheckingWinner = true;
                this.checkWinnerEvent = result.args;
                console.log(this.checkWinnerEvent);
                this.checkWinnerEvent.number = result.args._number.toNumber();
                console.log(this.checkWinnerEvent.number);
              }
            });
          }
        }
      );
    },

    checkGameStatus(event) {
      console.log(event.target.innerHTML);
      this.visibleCheckingButton = false;
      this.nextGameId = this.$store.state.web3.nowIdGame + 1;
      this.$store.state
        .casinoContractInstance()
        .getStatusGame.call(
          this.$store.state.web3.nowIdGame - 1,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              this.statusCheckingWinner = result;
              if((result === true)&&(this.number === this.allGamesEvent._number.toNumber())) {
                this.youWin = true;
              }
              console.log(
                result,
                " status game with id ",
                this.$store.state.web3.nowIdGame - 1
              );
            }
          }
        );
    },

    getAllBets(event) {
      console.log(event.target.innerHTML);
      let AllBets = this.$store.state
        .casinoContractInstance()
        .TakingBets(
          { Game_id: this.$store.state.web3.nowIdGame },
          { fromBlock: 3756624 }
        );
      AllBets.watch((err, result) => {
        if (err) {
          console.log(err);
        } else {
          this.allBetsEvent = result.args;
          
          console.log(this.allBetsEvent);
        }
      });
    },

    getPrevBets() {
      console.log("get prev events");
      let AllBets = this.$store.state
        .casinoContractInstance()
        .TakingBets(
          { Game_id: this.$store.state.web3.nowIdGame-1 },
          { fromBlock: 3756624 }
        );
      AllBets.watch((err, result) => {
        if (err) {
          console.log(err);
        } else {
          this.prevBetsEvent = result.args;
          
          console.log(this.prevBetsEvent);
        }
      });
    },

    getAllGames(event) {
      console.log(event.target.innerHTML);
      let AllGames = this.$store.state
        .casinoContractInstance()
        .PlayedGames({}, { fromBlock: 3756624 });
      AllGames.watch((err, result) => {
        if (err) {
          console.log(err);
        } else {
          this.allGamesEvent = result.args;
          console.log(this.allGamesEvent);
        }
      });
    }
  }
};
</script>

<style scoped>
.casino {
  margin-top: 25px;
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