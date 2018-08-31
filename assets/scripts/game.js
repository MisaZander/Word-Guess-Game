var hangman = {
    wins: 0,
    losses: 0,
    strikes: 0,
    theWord: [],
    theBird: [],
    letterBank: [],
    wordbank: ["football", "basketball", "hockey", "golf",
                "soccer", "touchdown", "slapshot", "foul",
                "penalty", "safety", "referee", "dunk",
                "hook", "slice", "basket", "club",
                "baseball", "homerun", "sideline", "bench",
                "coach", "huddle"],
    
    init: function() {
        this.wins = this.losses = this.strikes = 0;
        this.setWinsLosses();
        this.setStrikes();
        this.initWord();
        this.clearLetterBank();
    },

    setWinsLosses: function() {
        this.wins = parseInt(this.wins);
        this.losses = parseInt(this.losses);
        if(this.wins < 10) {
            winText.textContent = "0" + this.wins;
        } else {
            winText.textContent = this.wins;
        }
    
        if(this.losses < 10) {
            lossText.textContent = "0" + this.losses;
        } else {
            lossText.textContent = this.losses;
        }
    },

    setStrikes: function() {
        let strikeString = "";
        for(var i = 1; i <= 10; i++) {
            if(this.strikes < i) {
                strikeString += "O";
            } else {
                strikeString += "X";
            }
        }
        
        strikeText.textContent = strikeString;
    },

    initWord: function() {
        let theword = this.wordbank[parseInt(Math.random() * this.wordbank.length)];
        console.log(theword);
        let blank = "";
        for (var i = 0; i < theword.length; i++) {
            hangman.theWord.push("_");
            hangman.theBird.push(theword.charAt(i));
            blank += "_ ";
        }

        theWord.innerText = blank;
    },

    clearLetterBank: function() {
        this.letterBank.length = 0;
        letterBank.textContent = "";
    },

    updateWords: function() {
        let string = "";
        for(let i = 0; i < this.theWord.length; i++) {
            
        }
    },

    guessLetter: function(letter) {
        //Has it been guessed? AND is the key typed a letter?
        if(this.letterBank.indexOf(letter) !== -1 && typeof letter === "string" && letter.length === 1
        && (letter >= "a" && letter <= "z" || letter >= "A" && letter <= "Z") ){
            return; //exit the function entirely if letter already exists in the bank OR not a letter typed
        }

        let correct = false; //If the below checker finds a correct letter, this changes to true
        for(var i = 0; i < this.theBird.length; i++){
            if(this.theBird[i] === letter) {
                //If there's a letter found, set theWord
                this.theWord[i] = letter;
                correct = true;
            }
        }

        if(!correct) {
            this.strikes++;

            if(this.strikes !== 10) {
                //Add a strike
                this.setStrikes();
            } else {
                //Game over
                this.setStrikes();
                //Play a sound here
                alert("Game Over");
                
                //Add a loss
                this.losses++;
                this.setWinsLosses();

                //Start a new game
                this.clearLetterBank();
                this.initWord();
            } //else
        }//if !correct
    }//guessletter()
};

//main
var winText = document.getElementById("wins");
var lossText = document.getElementById("losses");
var strikeText = document.getElementById("strikes");
var theWord = document.getElementById("the-word");
var letterBank = document.getElementById("letter-bank");

//Initialize
hangman.init();

document.onkeyup = function(e) {
    hangman.guessLetter(e.key);
}