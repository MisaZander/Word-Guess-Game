var hangman = {
    wins: 0,
    losses: 0,
    strikes: 0,
    theWord: [],
    letterBank: [],
    wordbank: ["football", "basketball", "hockey", "golf",
                "soccer", "touchdown", "slapshot", "foul",
                "penalty", "safety", "referee", "dunk",
                "hook", "slice", "basket", "club",
                "baseball", "homerun", "sideline", "bench",
                "coach", "huddle"]
};

var winText = document.getElementById("wins");
var lossText = document.getElementById("losses");
var strikeText = document.getElementById("strikes");
var theWord = document.getElementById("the-word");
var wordBank = document.getElementById("word-bank");

//Initialize
init();


function init() {
    setWinsLosses(hangman.wins, hangman.losses);
    setStrikes(hangman.strikes);
    initWord();
    clearWordBank();
}

function setWinsLosses(wins, losses) {
    let intWins = parseInt(wins);
    let intLosses = parseInt(losses);
    if(intWins < 10) {
        winText.textContent = "0" + intWins;
    } else {
        winText.textContent = intWins;
    }

    if(intLosses < 10) {
        lossText.textContent = "0" + intLosses;
    } else {
        lossText.textContent = intLosses;
    }
}

function setStrikes(strikes) {
    let strikeString = "";
    for(var i = 1; i <= 10; i++) {
        if(strikes < i) {
            strikeString += "O";
        } else {
            strikeString += "X";
        }
    }
    
    strikeText.textContent = strikeString;
}

function initWord() {
    let theWord = hangman.wordbank[parseInt(Math.random() * hangman.wordbank.length)];
    
}

function clearWordBank() {

}