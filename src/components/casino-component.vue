<template>

<div class="casino container">

    Amount ether to exchange: <input v-model="amount" placeholder="0">
    <button v-on:click="exchangeEther" class="btn btn-info btn-lg ">exchangeEther</button>
    <!--<ul>
      <li v-on:click="clickNumber">1</li>
      <li v-on:click="clickNumber">2</li>
      <li v-on:click="clickNumber">3</li>
      <li v-on:click="clickNumber">4</li>
      <li v-on:click="clickNumber">5</li>
      <li v-on:click="clickNumber">6</li>
      <li v-on:click="clickNumber">7</li>
      <li v-on:click="clickNumber">8</li>
      <li v-on:click="clickNumber">9</li>
      <li v-on:click="clickNumber">10</li>
    </ul>
    
    <div class="event" v-if="winEvent">
      <p v-if="winEvent._status" id="has-won"><i aria-hidden="true" class="fa fa-check"></i> Congragulations, you have won {{winEvent._amount}} wei</p>
      <p v-else id="has-lost"><i aria-hidden="true" class="fa fa-times"></i> Sorry you lost, try again.</p>
    </div>-->
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
      winEvent: null,
      number
    };
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
        this.$store.state.web3.balance
      ) {
        this.pending = true;
        this.$store.state.tokenContractInstance().exchangeEther(
          {
            gas: 300000,
            value: this.$store.state.web3
              .web3Instance()
              .toWei(this.amount, "ether"),
            from: this.$store.state.web3.coinbase,
            gasPrice: web3.toWei(2, "gwei")
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
                parseInt(this.amount * 1000, 10);
              this.$store.state.tokenContractInstance().approve(
                this.$store.state.casinoContractInstance().address,
                token,
                {
                  gas: 300000,
                  gasPrice: web3.toWei(2, "gwei"),
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
      console.log(
        "Tak Bet",
        event.target.innerHTML,
        this.number
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