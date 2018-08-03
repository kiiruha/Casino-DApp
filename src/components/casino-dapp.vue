<template>
  <div>
 <hello-metamask/>
 <casino-component/>
</div>
</template>
<script>
import HelloMetamask from "@/components/hello-metamask";
import CasinoComponent from "@/components/casino-component";
export default {
  name: "casino-dapp",
  beforeCreate() {
    //get contract instance and data from web via action from store/index.js
    console.log("dispatching getCasinoContractInstance");
    this.$store.dispatch("getCasinoContractInstance");
    console.log("dispatching getTokenContractInstance");
    this.$store.dispatch("getTokenContractInstance");
    console.log("registerWeb3 Action dispatched from casino-dapp.vue");
    this.$store.dispatch("registerWeb3");
  },
  components: {
    "hello-metamask": HelloMetamask,
    "casino-component": CasinoComponent
  }
};
</script>
<style scoped>
</style>