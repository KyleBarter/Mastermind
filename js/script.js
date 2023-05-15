// ! AUDIO
//Guess clues beep
//Countdown from 10 seconds beep
//Explosion

//Will also need to add a mute button

// ! CONSTANTS
const colors = ["purple", "yellow", "blue", "pink", "white", "black"];
let cpuRanAry = [] //cpuRanAry //random array of four colours taken from the colors array
let playerAry = [] //empty array to be updated with clicks


// ! STATE VARIABLES


// ! CACHED ELEMENTS
//color choice buttons
const purpleBtn = document.getElementById("purple").addEventListener('click', () => setColor(colors[0]))
const yellowBtn = document.getElementById("yellow").addEventListener('click', () => setColor(colors[1]))
const blueBtn = document.getElementById("blue").addEventListener('click', () => setColor(colors[2]))
const pinkBtn = document.getElementById("pink").addEventListener('click', () => setColor(colors[3]))
const whiteBtn = document.getElementById("white").addEventListener('click', () => setColor(colors[4]))
const blackBtn = document.getElementById("black").addEventListener('click', () => setColor(colors[5]))


//row elements
const row1 = document.getElementById("row1")
const row2 = document.getElementById("row2")
const row3 = document.getElementById("row3")
const row4 = document.getElementById("row4")
const row5 = document.getElementById("row5")
const row6 = document.getElementById("row6")
const row7 = document.getElementById("row7")
const row8 = document.getElementById("row8")
const row9 = document.getElementById("row9")
const row10 = document.getElementById("row10")
const rows = [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10]
let currentRow = rows[0]

//guess elements
let guess1 = document.getElementById("guess1")
let guess2 = document.getElementById("guess2")
let guess3 = document.getElementById("guess3")
let guess4 = document.getElementById("guess4")
const guesses = [guess1, guess2, guess3, guess4]


//clue elements
const clue1 = document.getElementById("clue1")
const clue2 = document.getElementById("clue2")
const clue3 = document.getElementById("clue3")
const clue4 = document.getElementById("clue4")
const clues = [clue1, clue2, clue3, clue4]

const lossImg = document.createElement('img');
Image.src = 'https://imgur.com/a/Qrkoc3U';

// ! EVENTS
//generate new code / play again button
const newBoardBtn = document.getElementById("new-game").addEventListener('click', newBoard)


// ! FUNCTIONS


//cpu random array
function cpuCode(arr) {
    let cpuRanAry = []
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomColor = arr[randomIndex];
        cpuRanAry.push(randomColor);
    }
    return cpuRanAry;
}
console.log(cpuCode(colors))

//new board button // this will need to reset the cpuRanAry and clear player guesses and clues
function newBoard () {
    //'defuse the bomb' will render the board
    cpuRanAry = []
    cpuRanAry = cpuCode(colors);
    playerAry = [];
    guesses.forEach(guess => guess.style.backgroundColor = "");
    clues.forEach(clue => clue.style.backgroundColor = "");
    currentGuess = guesses[0]
    currentRow = rows[0]
    console.log(cpuRanAry)
    cpuCode(colors)
}

//set background color of the guess pin
let setColor = color => {
    currentGuess = guesses[0];
    if (guess1.style.backgroundColor === "") {
        guess1.style.backgroundColor = color;
        guess1.backgroundColor = color;
    } else if (guess2.style.backgroundColor === "") {
        guess2.style.backgroundColor = color;
        guess2.backgroundColor = color;
        currentGuess = guesses[1];
    } else if (guess3.style.backgroundColor === "") {
        guess3.style.backgroundColor = color;
        guess3.backgroundColor = color;
        currentGuess = guesses[2];
    } else if (guess4.style.backgroundColor === "") {
        guess4.style.backgroundColor = color;
        guess4.backgroundColor = color;
        currentGuess = guesses[3];
    }
    playerAry.push(color)
    return currentGuess
}        


const submitGuess = document.getElementById("submit");
const cluePins = []
submitGuess.addEventListener('click', () => {
    console.log('submitted')
    if (playerAry.length < cpuRanAry.length) {
        //comparison logic
        const checkPlayer = [...playerAry]
        const checkComp = [...cpuRanAry]
        let perfectMatches = 0
        let matches = 0
        // perfectMatches = document.querySelector("#clue");
        // perfectMatches.style.backgroundColor = "green";
        // matches = document.querySelector("#clue");
        // matches.style.backgroundColor = "orange";
        // check for match
        checkPlayer.forEach((choice, i) => {
            // choice = 'red'
            // checkComp = ['red', 'yellow']
            const foundMatch = checkComp.indexOf(choice)
            if (foundMatch !== -1) {
                //check if foundMatch matches i - if so, perfect match
                if(foundMatch === i) {
                    perfectMatches++
                } else {
                    matches++
                }
                checkPlayer.splice(i, 1)
                checkComp.splice(foundMatch, 1)
            }
        })
        //create clue pins
        cluePins.length = 0;
        for(let i = 0; perfectMatches >= 0 && i <= perfectMatches; i++){
            cluePins.push(2)
        }
        for(let i = 0; matches >= 0 && i <= matches; matches++){
            cluePins.push(1)
        }
    } else {
        const currentClues = currentRow.querySelectorAll(".clue")
        cluePins.forEach((pin, i) => {
            currentClues[i].style.backgroundColor = pin === 2 ? "green" : "orange"
            console.log(currentClues)
        })
    }
    while (currentRow < rows.length) {
        if (cluePins === 8) {
            console.log('You win')
            break;
        }

        currentRow++

        if (currentRow === rows.length && cluePins !== 8) {
            console.log('You lose');
            break;
        }
    }
    
    // for (let i = 0; currentRow > 9; currentRow++){
    //     if (currentRow === rows[9] && cluePins !== 8){
    //         return('You lose')
    //     } else  if (cluePins === 8){
    //         console.log('You win') 
    //     } else {
    //         currentRow++
    //     }
    // }
})
//set interval & clear interval

//?player guess // will use a colour pallet as buttons for user// iterates through cpuRanAry and updates guessclues
//?after player guess this will be locked and next row unlocked to input //could id each row to their relative row

//?guess clues // this will need to compare the player guess and cpuRanAry to provide 3 possible colours
//?green = correct colour in correct location, orange = correct colour in wrong location, red = wrong colour

//countdown to start once player starts newBoard 

function renderCountdown(cb) {
    let count = 3;
    // AUDIO.currentTime = 0;
    // AUDIO.play();
    countdownEl.style.visibility = 'visible';
    countdownEl.innerText = count;
    const timerId = setInterval(function() {
      count--;
      if (count) {
        countdownEl.innerText = count;
      } else {
        clearInterval(timerId);
        countdownEl.style.visibility = 'hidden';
        cb();
      }
    }, 1000);
  }
//render function to make the game work
function render(){
    
    if (currentRow > 9 && cluePins !== 8)
    return lossImg
}

//message for winner / loser outcome
function renderMessage() {
    
}

function renderBoard() {

}