pragma solidity ^0.4.24;

import './ERC20Interface.sol';
import './SafeMath.sol';
import './Owned.sol';

contract CasinoToken is ERC20Interface, Owned {
    using SafeMath for uint;

    string public name;
    string public symbol;
    uint8 public decimals;
    uint internal _totalSupply;
    address public platform;

    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;


    constructor( address platformAddress,string name_, string symbol_, uint totalSupply_) public {
        platform = platformAddress;
        symbol = symbol_;
        name = name_;
        _totalSupply = totalSupply_ ;
        balances[owner] = _totalSupply;
        emit Transfer(address(0), owner, _totalSupply);
    }

    function totalSupply() public view returns (uint) {
        return _totalSupply.sub(balances[address(0)]);
    }
    
    function exchangeEther() public payable {
        platform.transfer(msg.value);
        balances[owner] = balances[owner].sub((msg.value*1000)/(10**uint(18)));
        balances[msg.sender] = balances[msg.sender].add((msg.value*1000)/(10**uint(18)));
    }

    function balanceOf(address tokenOwner) public constant returns (uint balance) {
        return balances[tokenOwner];
    }

    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(from, to, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    function () public payable {
        revert();
    }
    
    function changePlatform(address platformAddress) public returns (bool success) {
        if (platformAddress == platform) {
            return false;
        }
        else if (platformAddress != 0x0) {
            return false;
        }
        platform = platformAddress;
        return true;
    }
}