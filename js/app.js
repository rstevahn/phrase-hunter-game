/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
/*jshint esversion: 6 */

// First, let's wait for the page to load

window.addEventListener ('DOMContentLoaded', () => {

    // start a new game

    const game = new Game();

    // listener for the start game button

    document.querySelector ('#btn__reset').addEventListener ("click", () => {

        // shrink the text of the title and game-over messages to zero
        // css transitions will create a fun effect

        const gameTitle = document.querySelector('.title');
        const message = document.querySelector('#game-over-message');
        gameTitle.style.fontSize = '0';
        if (message) {
            message.style.fontSize = '0';
        }

        // allow one second for the transitions, then start a new game

        setTimeout (() => {game.startGame();}, 1000);
    });

    // listener for button clicks

    document.querySelector ('#qwerty').addEventListener ("click", (e) => {
        if (e.target.className == 'key') {
            game.handleInteraction (e.target);
        }
    });

    // listener for keyup anywhere in the document

    document.querySelector ('body').addEventListener ("keyup", (e) => {

        const keybuttons = document.querySelectorAll ('div.keyrow button'); // get a list of key buttons
        const keyExp = /^\w$/; // will match a single word character

        if (!game.getActivePhrase()) { // this means the game is not active
            return; // nothing to do
        }

        if (keyExp.test(e.key)) { // this is a word character
            for (let i = 0; i < keybuttons.length; i++) { // find the button corresponding to the key
                if (keybuttons[i].textContent === e.key.toLowerCase()) {
                    game.handleInteraction (keybuttons[i]); // handle the interaction as if this were a button press
                    return;
                }
            }
        }
    });
});