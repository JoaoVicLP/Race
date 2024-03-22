cars = ["carRed","carOrange","carYellow","carGreen","carBlue"];
let timer;
let winner;
let raceFinished = false;
let speedway =  document.getElementById("speedway").getBoundingClientRect();
let speedwayWidth = speedway.width;
let money = 100;
let moneyElement = document.getElementById("money");

const moneyBetInput = document.getElementById("moneyBet");
const runnersSelect = document.getElementById("runnersSelect");
const resetButton = document.getElementById("resetButton");
const betButton = document.getElementById("betButton");

let bet = {
    runnerId: "",
    money: "",
}

function start(){
    resetButton.disabled = true;
    betButton.disabled = true;
    timer = setInterval(moveCars, 50);
}

function moveCars(){
    cars.forEach((id) => {
        let randomnum = Math.floor(Math.random() * 11);
        let element = document.getElementById(id);
        let currentPosition = element.getBoundingClientRect().x;
        let newPosition = currentPosition + randomnum;
        element.style.translate = newPosition + "px";
        
        if(newPosition + 100 >= speedwayWidth){
            winner = id;
            raceFinished = true;
            clearInterval(timer);
            if(winner === bet.runnerId){
                window.alert("You Won!");
               double(); 
            } else {
                window.alert("You Lost!");
            }    
            resetButton.disabled = false;       
        }
    });
}
function toBet(){  
    let moneyBet = moneyBetInput.value;
    if(moneyBet < 5){
        moneyBet = "";
        window.alert("The minimum amount to be bet is R$5.")
        return;
    }
    if (moneyBet > money){
        moneyBet = "";
        window.alert("The maximum you can bet is what you have");
        return;
    }
    bet.runnerId = runnersSelect.value;
    bet.money = moneyBet;
    debit(moneyBet);
    start();
}

function debit(moneyBet){
    money -= moneyBet;
    moneyElement.innerHTML = "R$ " + money;
}

function double(){
    money += bet.money * 2;
    moneyElement.innerHTML = "R$ " + money;
}

function reset(){
    cars.forEach(id =>{
        let element = document.getElementById(id);
        element.style.translate = "0px";
        betButton.disabled = false;
    })
}