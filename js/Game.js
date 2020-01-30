/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
/*jshint esversion: 6 */ 

class Game {
    constructor() {
        this.missed = 0; // the number of missed guesses so far
        this.phrases = this.generatePhrases(); // generate an array of 5 phrase objects
        this.phrasesUsed = 0; // used to keep track of how many phrases we've used
        this.activePhrase = null; // populated by getRandomPhrase()
    }

    // method to generate the array of phrase objects, called by the constructor
    // params: n/a
    // returns: an array of phrase objects

    generatePhrases() {
        const phraseStrings = ["Here is a phrase", 
                            "The quick brown fox", 
                            "phrase hunter", 
                            "JavaScript is fun!", 
                            "Where's the beef?"];
        const phraseObjects = [];

        for (let i = 0; i < 5; i++) {
            phraseObjects.push (new Phrase(phraseStrings[i].toUpperCase()));
        }
        return phraseObjects;
    }

    // the user pressed the button, so start a new game
    // params: none
    // returns: none

    startGame() {

        const overlay = document.querySelector('#overlay'); // the game overlay div
        const keys = document.querySelectorAll ('#qwerty .keyrow button'); // list of keyboard buttons
    
        // Clear any leftover transform styles from the onscreen keyboard keys

        keys.forEach ((key) => {
             key.style = '';
        });

        // hide the display overlay

        overlay.style.display = 'none';

        // select a random phrase and reset the phrases if we've used them all

        this.activePhrase = this.getRandomPhrase();
        if (++this.phrasesUsed === this.phrases.length) { // we've used all of the phrases
            this.phrases.forEach(phrase => phrase.clearGuessed()); // reset the phrases for next time
            this.phrasesUsed = 0;
        }

        // display the phrase and reset the missed counter

        this.activePhrase.addPhraseToDisplay();
        this.missed = 0;
    }

    // Method to select a random phrase. Ee use the phrase's alreadyGuessed() and setGuessed()
    // methods to keep track of which phrases have already been selected. We always return a
    // previously unused phrase.
    // params: none
    // returns: a previously unused phrase

    getRandomPhrase() {
        const numPhrases = this.phrases.length; // number of phrases
        let index;
        do {
            index = Math.floor (Math.random() * numPhrases); // get a random quote
        } while (this.phrases[index].wasGuessedAlready()); // make sure it hasn't been used yet
        this.phrases[index].setGuessed(); // we have now guessed this phrase
        return this.phrases[index];
    }

    // method to return the current phrase. this is used by the keyup listener in app.js
    // params: none
    // returns: the current phrase

    getActivePhrase() {
        return this.activePhrase;
    }

    // method to handle a button or key press.
    // param: targetKey button element
    // returns: n/a

    handleInteraction(targetKey) {

        // disable the button

        targetKey.disabled = true;

        // Update the target key class name depending on whether or not the letter is in the phrase.
        // Display phrase letter(s) and check for a win if the letter is in the phrase.
        // Remove a life if the letter is not in the phrase

        if (this.activePhrase.checkLetter(targetKey.textContent)) { // this letter is in the phrase
            targetKey.className = 'chosen';
            targetKey.style.transform = 'scale(2,2)'; // expand the button
            setTimeout (() => {targetKey.style.transform = 'scale(1,1)';}, 500); // shrink the button later
            this.activePhrase.showMatchedLetter(targetKey.textContent);
            if (this.checkForWin()) {
                this.gameOver();
            }
        } else { // this letter is not in the phrase
            targetKey.className = 'wrong';
            targetKey.style.transform = 'scale(0.5,0.5)'; // shrink the button
            setTimeout (() => {targetKey.style.transform = 'scale(1,1)';}, 500); // expand the button later
            this.removeLife();
        }
    }

    // method to remove a life. includes game end logic
    // params: n/a
    // returns: n/a

    removeLife() {

        // Increment the missed count. If this is the fifth miss, call gameOver().
        // If not, change the src attribute of the rightmost heart image.

        if (++this.missed === 5) {
            this.gameOver();
        } else {
            const images = document.querySelectorAll ('#scoreboard ol li img');
            images [5 - this.missed].src = 'images/lostHeart.png';
        }
    }

    // method to check for a win
    // param: n/a
    // returns: true/false

    checkForWin() {
        if (document.querySelector ('#phrase ul li.hide')) { // test for a hidden li element
            return false; // no winner yet
        }
        return true; // we have a winner!
    }

    // game over processing
    // param: n/a
    // returns: n/a

    gameOver() {

        const overlay = document.querySelector('#overlay'); // the overlay
        const gameTitle = document.querySelector('.title'); // the 'PHRASE HUNTER' title
        const message = document.querySelector('#game-over-message'); // the game over message
        const phraseLetters = document.querySelectorAll ('#phrase ul li'); // list of current phrase characters
        const keys = document.querySelectorAll ('#qwerty .keyrow button'); // list of keyboard buttons
        const heartImages = document.querySelectorAll ('#scoreboard ol li img'); // list of scoreboard images

        // update the game over message and overlay class

        if (this.missed < 5) {
            message.textContent = 'Congratulations! Try again?';
            overlay.className = 'win';
        } else {
            message.textContent = 'Better luck next time!';
            overlay.className = 'lose';
        }

        // reset the font size of the overlay text

        gameTitle.style.fontSize = '60px';
        message.style.fontSize = '20px';
      
        // initialize the phrase display by removing existing list items

        phraseLetters.forEach (letter => letter.remove());
        this.activePhrase = null;

        // initialize the onscreen keyboard

        keys.forEach ((key) => {
            key.className = 'key';
            key.disabled = false;
         });

        // initialize the scoreboard

        heartImages.forEach (image => image.src = 'images/liveHeart.png');
        this.missed = 0;
          
        // show the display overlay

        overlay.style.display = "";

    }
}