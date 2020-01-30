/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
/*jshint esversion: 6 */ 

 class Phrase {

     // the constructor method

     constructor(phrase) {
         this.phrase = phrase; // the phrase itself
         this.alreadyGuessed = false; // used to avoid phrase repeats
     }

     // method to add the HTML for the phrase to the DOM
     // param: n/a
     // returns: n/a

     addPhraseToDisplay() {

        const alphaExp = /\w/i; // regular expression for a word character
        const whiteExp = /\s/; // regular expression for a white space character
        const ul = document.querySelector('#phrase ul'); // our ul container
        
        // add a list item for each character in the phrase. If the character is a word character,
        // give it the class of 'hide letter ' + the character. If whitespace, give it the class 'space'.
        // Otherwise, give it the class 'show letter' without the letter appended. This prevents searching for this
        // character. Finally, set the text content of the li to the character.

        for (let i = 0; i < this.phrase.length; i++) {
            const li = document.createElement('li'); // create an 'li' element to append
            const char = this.phrase.charAt(i); // the character we are adding
            if (alphaExp.test(char)) { // test for a word character
               li.className = 'hide letter ' + char;
            } else if (whiteExp.test(char)) {// this is white space
               li.className = 'space';
            } else { // special character
                li.className = 'show letter'; // do not add the character as a class. this way we won't search for it
            }
            li.textContent = char;
            ul.appendChild (li);
         }
     }

     // method to check a letter to see if it is in the phrase
     // param: a one-character string
     // returns: true/false

     checkLetter(letter) {
         return (this.phrase.indexOf(letter.toUpperCase()) > -1);
     }

     // method to display each occurance of the provided letter on the screen
     // param: a one-character string
     // returns: n/a

     showMatchedLetter(letter) {
         const matches = document.querySelectorAll ('.' + letter.toUpperCase()); // select all matching elements

         if (!matches.length) { // we should have at least one match if this function is called
             console.log ("Error: No matches in phrase.showMatchedLetter()");
         }

         matches.forEach(li => li.className = 'show letter ' + letter); // change the class of each one from hide to show
     }

     // getter method to return whether this phrase has aleady been guessed
    
     wasGuessedAlready() {
         return this.alreadyGuessed;
     }

     // setter method to specify that this phrase has now been guessed

     setGuessed() {
         this.alreadyGuessed = true;
     }

     // setter method to clear the "alreadyGuessed" status

     clearGuessed() {
         this.alreadyGuessed = false;
     }
 }