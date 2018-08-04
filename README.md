
# Lottery on the blockchain of ether!

   <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"> ![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)
  
#### MetaMask is required
## Table of Contents
 - [Build](#build)
 - [Work principle](#work-principle)
   * [Preparation to the game](#preparation-to-the-game)
   * [Making a bet](#making-a-bet)
   * [Information about bets and games](#information-about-bets-and-games)
   * [Check the winner](#check-the-winner)

   
## Build 
To install an app on a local machine, you need to follow the next steps
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
#### But for not-dev use, you do not need to perform all the previous actions, you can just go to the site kiiruha.github.io/Casino-DApp


## Work principle
Firstly, you do not need to refresh the page, all information on it is updated dynamically.
#### So we have 2 roles:

 - Casino
 - Player
 
#### Preparation to the game
To start a game, the user must connect to the site from the local host or kiiruha.github.io/Casino-DApp.  To start the game you need MCT (casino tokens). To receive the tokens, the user must exchange the ether (1 ether === 1000 tokens). So enter the amount of the ether in the **Amount ether to exchange** field and press the **Exchange ether** button, after that Metamask will ask you to confirm the transfer as well as confirm the permission to use the tokens in a casino contract.
If everything is successful, you will see tokens in your account.
#### Making a bet
To make a bet you need to enter your number and click the button **Make a bet**.
After that you have to confirm your action in the Metamask.

> *If there is less than 2 minutes remaining till the end of the game, you will not be able to make a bet in this game, and you will be notified about this. Please wait for the next one.*

### Information about bets and games
You can get all the information about the previous games by clicking the button **Get all games**.
You can also get all the information about all bets in a current game by clicking the button **Get all bets**.

### Check the winner
In each game you have the opportunity to start the draw of the previous game.
It is very simple. First, you need to press the button **Check previous game status**, if someone has already checked the past game, you will see a message about that, otherwise you will be prompted to click the button **Check winner in game with id *previous game id*** , if you click the check button, metamask will suggest confirming your actions.
If you win, you will increase the token balance automatically.

>### P.S. A new game happens every 1000 seconds, if you do not win in this game, you can try your luck in the next one.


