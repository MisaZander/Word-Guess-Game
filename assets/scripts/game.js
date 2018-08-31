var hangman = {
    wins: 0,
    losses: 0,
    strikes: 0,
    theActualWord: "", //The word to guess. Alerted at the end
    theWord: [], //The word to guess, initially blanked
    theBird: [], //The bird is the word. The correct word to guess
    letterBank: [], //The array of incorrectly guessed letters
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
        for(var i = 1; i <= 11; i++) {
            if(this.strikes < i) {
                if(i !== 11){
                    strikeString += "O"; //Don't tack an 11th O to the end
                }
            } else {
                if(i !== 11){
                    strikeString += "X"; //Don't tack an 11th X to the end
                }
            }
        }
        
        strikeText.textContent = strikeString;
    },

    initWord: function() {
        this.theWord = []; //Reset the word
        this.theBird = [];
        let theword = this.wordbank[parseInt(Math.random() * this.wordbank.length)];
        console.log(theword);
        this.theActualWord = theword;
        let blank = "";
        for (var i = 0; i < theword.length; i++) {
            this.theWord.push("_");
            this.theBird.push(theword.charAt(i));
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
        //Update the guess word
        for(let i = 0; i < this.theWord.length; i++) {
            string += this.theWord[i];
            string += " ";
        }
        theWord.textContent = string;
        string = "";

        //Update the letter bank
        for(let i = 0; i < this.letterBank.length; i++) {
            string += this.letterBank[i];
            string += " ";
        }
        letterBank.textContent = string;
    },

    guessLetter: async function(letter) {
        //If letter is already in the bank OR is not lowercase alpha, end the function immediately
        if((this.letterBank.indexOf(letter) !== -1) || !(letter >= "a" && letter <= "z")){
            return;
        }

        //This function adds the letter guessed to the word if correct
        //Else: it adds it to the word bank if the letter is wrong
        let correct = false;
        for(var i = 0; i < this.theBird.length; i++){
            if(this.theBird[i] === letter) {
                //If there's a letter found, set theWord
                this.theWord[i] = letter;
                correct = true;
            }
        }
        this.updateWords();

        if(!correct) {
            this.strikes++;

            if(this.strikes !== 10) {
                //Add a strike
                this.setStrikes();
                this.letterBank.push(letter);
                this.updateWords();
            } else {
                //Game over
                this.setStrikes();
                this.letterBank.push(letter);
                this.updateWords();
                //Play a sound here
                
                //Add a loss
                this.losses++;
                this.setWinsLosses();
                await sleep(1500);
                
                alert("Game Over! " + this.theActualWord + " was what you wanted. " + this.theActualWord + ".");
                
                //Start a new game
                this.strikes = 0;
                this.setStrikes();
                this.clearLetterBank();
                this.initWord();
                return; //Don't go any further
            } //else
        }//if !correct

        //UR WINNAR!
        //If there is no blank in the word, you solved it!
        if(this.theWord.indexOf("_") === -1){
            //Add a win
            this.wins++;
            this.setWinsLosses();

            await sleep(1500);
            alert("UR WINNAR!");

            //Start a new game
            this.strikes = 0;
            this.setStrikes();
            this.clearLetterBank();
            this.initWord();
        }

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}