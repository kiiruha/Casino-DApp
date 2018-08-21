pragma solidity ^0.4.24;

import './CasinoToken.sol';
import './SafeMath.sol';

contract Casino is Owned {
    using SafeMath for uint;

    CasinoToken private _token;

    address public owner;
    
    uint gameDuration;

    struct Game{
        mapping (uint => address[]) playersByNumber;
        uint number;
        uint startGame;
        uint endGame;
        bool status; 
        bool transferMoney;
        uint256 players;
    }
    
    mapping(uint256 => Game) games; 
    
    event TakingBets(uint indexed Game_id, address _player_address, uint _number, uint256 _time);
    event PlayedGames(uint indexed Game_id, uint _number, uint _startGame, uint _endGame, uint256 _bank,  bool _status);


    constructor(address _tokenAddress) public {
        owner = msg.sender;
        _token = CasinoToken(_tokenAddress);
        gameDuration = 1000;
    }

    modifier timeIsOver(uint256 Game_id) { //check if the time of game is end
        require((games[Game_id].startGame + gameDuration) <= now);
        _;
    }
    
    function getStatusGame(uint256 Game_id) public view returns (bool success){
        return games[Game_id].status;
    }
    
    function getTimes(uint256 Game_id)public view returns(uint256, uint, uint, uint){
        return (now, games[Game_id].startGame,  games[Game_id].startGame+gameDuration, now/gameDuration);    
    }
    
    function getWinningNumber(uint256 Game_id) public view returns(uint _number){
        if(games[Game_id].status){
            return games[Game_id].number;
        }
    }
    
    function pushBet(uint _number, uint256 _Game_id ) public payable  returns (bool success){
        if ((_Game_id == now/gameDuration) && ((now + 1 minutes)/gameDuration == _Game_id)){ 
            // not access to push bet if the game end after 1 minute
            if(games[_Game_id].startGame != 0){  //check first bet or not
                games[_Game_id].playersByNumber[_number].push(msg.sender);
                require(_token.transferFrom(msg.sender, this, 100));
                games[_Game_id].players++;
            } else {
                games[_Game_id].startGame =  uint(uint(now)/uint(gameDuration))*1000;
                games[_Game_id].playersByNumber[_number].push(msg.sender);
                require(_token.transferFrom(msg.sender, this, 100));
                games[_Game_id].players = 1;
            }
            emit TakingBets(_Game_id, msg.sender, _number, now);
            return true;
        } else{
            return false;
        }
    }
    
    function payMoney(address _winner,uint256 _amount) private {
        _token.transfer(_winner,_amount);
    }
    
    function getNowBank(uint256 _Game_id) public view returns (uint256){
        return 100 * games[_Game_id].players-20;
    }

    function checkWinner( uint256 _Game_id) public  timeIsOver( _Game_id){
        if (games[_Game_id].status == false){ // check status this game 
            games[_Game_id].status = true;
            games[_Game_id].endGame = now;
            uint winningNumber = random();
            games[_Game_id].number = winningNumber;
            uint256 winnerCount = games[_Game_id].playersByNumber[winningNumber].length;
            uint256 bank = 100 * games[_Game_id].players-20;
            if (winnerCount > 0) { //if the winner consist
                uint256 winnerAmount = bank/winnerCount;
                for (uint i = 0; i<winnerCount; i++) {
                    payMoney(games[_Game_id].playersByNumber[winningNumber][i], winnerAmount);
                    //_token.transfer(games[_Game_id].playersByNumber[winningNumber][i],bank);
                }
                payMoney(owner, 20);
                games[_Game_id].transferMoney = true;
            } else {
                games[_Game_id].transferMoney = true;
                payMoney(owner, bank);
            }
            emit PlayedGames(_Game_id, winningNumber, games[_Game_id].startGame, games[_Game_id].endGame, bank, games[_Game_id].status);
        }
    }

    function random() public view returns (uint) {
        return uint8(uint256(keccak256(block.timestamp, block.difficulty))%10+1);
    }
}
