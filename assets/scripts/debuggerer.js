var wins = 0;
var losses = 0;
var strikes = 0;

var winText = document.getElementById("wins");
var lossText = document.getElementById("losses");
var strikeText = document.getElementById("strikes");

function strikeUp() {
    var strikeString = "";
    if(strikes === 11){
        strikes = 0;
    }

    for(var i = 1; i <= 10; i++) {
        if(strikes < i) {
            strikeString += "O";
        } else {
            strikeString += "X";
        }
    }
    
    strikeText.textContent = strikeString;
    strikes++;
};

function scoreUp() {
    if (wins === 100) {
        wins = 0;
        losses = 0;
    }

    if(wins < 10) {
        winText.textContent = "0" + wins;
        lossText.textContent = "0" + losses;
    } else {
        winText.textContent = wins;
        lossText.textContent = losses;
    }

    wins++;
    losses++;
};

var strikeInterval = setInterval(strikeUp, 2000);
var winInterval = setInterval(scoreUp, 2000);