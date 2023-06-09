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
let currentRow = 0


let currentGuess = 0


const clues = document.querySelectorAll('.clue-box')



//loss image
const lossImg = document.createElement('img');
Image.src = 'https://imgur.com/a/Qrkoc3U';

const countdownEl = document.querySelectorAll('#countdown')

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
    document.querySelectorAll('.guess').forEach(guess => guess.style.backgroundColor = "");
    document.querySelectorAll('.clue').forEach(clue => clue.style.backgroundColor = "");
    currentGuess = 0
    currentRow = 0
    console.log(cpuRanAry)
    cpuCode(colors)
    render()
}

//set background color of the guess pin
let setColor = color => {
    if (currentGuess <= 3) {
        const guessEl = rows[currentRow].querySelectorAll('.guess')[currentGuess]
        guessEl.style.backgroundColor = color
        currentGuess++
        playerAry.push(color)
        console.log(playerAry)
    }
}    
setColor()    

function submitClick() {
    const submitGuess = document.getElementById("submit");
    submitGuess.addEventListener('click', () => {
        if (currentGuess > 3) {
        console.log('submitted')
        cluePin(playerAry, cpuRanAry)
        getNextRow()
        setColor()
        currentGuess = 0
        } else {
        console.log('You need more input')
        }
    })
}
submitClick()


function cluePin(playerAry, cpuRanAry) {
    //comparison logic
    const checkComp = [...cpuRanAry]
    const checkPlayer = [...playerAry]
    let perfectMatches = 0; 
    let matches = 0;
    // check for perfect match
    checkPlayer.forEach((choice, i) => {
        const foundMatch = checkComp.indexOf(choice)
        if (choice === checkComp[i]) {
            perfectMatches++
            checkPlayer.splice(i, 1)
            checkComp.splice(i, 1)
            console.log('perfect match')
        } else if (foundMatch !== -1) { // check for match
            matches++
            checkComp.splice(foundMatch, 1)
            console.log('match')
        }
    })
    pinColor(perfectMatches, matches);
}


function pinColor(perfectMatches, matches) {
    let cluePins = [...clues[currentRow].querySelectorAll(".clue")]
    cluePins.forEach((pin, i) => {
        if (i < perfectMatches) {
            pin.style.backgroundColor = "green"
            console.log('green')
        } else if (i < matches + perfectMatches) {
            pin.style.backgroundColor = "orange"
            console.log('orange')
        } else {
            pin.style.backgroundColor = "red"
            console.log('red')
        }
    })
}




function getNextRow() {
        currentRow++
        playerAry = []
        setColor()
    }


//set interval & clear interval

//?player guess // will use a colour pallet as buttons for user// iterates through cpuRanAry and updates guessclues
//?after player guess this will be locked and next row unlocked to input //could id each row to their relative row

//?guess clues // this will need to compare the player guess and cpuRanAry to provide 3 possible colours
//?green = correct colour in correct location, orange = correct colour in wrong location, red = wrong colour

//countdown to start once player starts newBoard 

function renderCountdown() {
    let duration = 5 * 60;
    let timer = duration, minutes, seconds;

    let intervalId = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        console.log(minutes + ":" + seconds)

        if (--timer < 0) {
            clearInterval(intervalId)
            console.log("timer has ended")
        }
    }, 1000)
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

//render function to make the game work
function render(){
    renderBoard()
    renderCountdown()
    // renderMessage()
}

//message for winner / loser outcome
// function renderMessage() {
//     if (cluePins === 8) {
//         console.log('You win')
//     } else if (cluePins !== 8 && currentRow > 9 || countdownEl === 0) {
//         console.log('You lose!') //this will need to be ammended to the lossImg variable
//     }
// }

function renderBoard() {
    const board = document.querySelectorAll('board')
}