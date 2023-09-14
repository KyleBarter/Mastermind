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
let currentClue = 0

const submitGuess = document.getElementById("submit");
const board = document.querySelector('.board-container');
const rules = document.querySelector('.rules-container')
const winMessage = document.querySelector('.win-message');
const countdownEl = document.getElementById('countdown')
const lossImg = document.querySelector('.loss-message-container');
const lossText = document.querySelector('.loss-message-text')

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
    console.log('computer array', cpuRanAry)
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
    submitGuess.addEventListener('click', () => {
        if (currentGuess > 3) {
        console.log('submitted')
        cluePin(playerAry, cpuRanAry)
        getNextRow()
        currentGuess = 0
        } else {
        console.log('You need more input')
        }
    })
}
submitClick()


function cluePin(playerAry, cpuRanAry) {
    //comparison logic
    let perfectMatches = []; 
    let matches = [];
    let wrongs = [];
    let cluePins = [...clues[currentRow].querySelectorAll(".clue")]
    let cpuRanAryCopy = [...cpuRanAry]
    let playerAryCopy = [...playerAry]


    //separate perfect matches loop from the rest due to errors
    for (let i = playerAryCopy.length - 1; i >= 0; i--) {
        if (playerAryCopy[i] === cpuRanAryCopy[i]) {
            perfectMatches.push(playerAryCopy[i]);
            playerAryCopy.splice(i, 1);
            cpuRanAryCopy.splice(i, 1);
        }

    }

    // only matches getting reviewed here
    for (let i = playerAryCopy.length - 1; i >= 0; i--) {
        const element = playerAryCopy[i];
        if (cpuRanAryCopy.includes(element)) {
            matches.push(element);
            const index = cpuRanAryCopy.indexOf(element);
            if (index !== -1) {
                cpuRanAryCopy.splice(index, 1);
            }
            const playerIndex = playerAryCopy.indexOf(element);
            if (playerIndex !== -1) {
                playerAryCopy.splice(playerIndex, 1);
            }
        }
    }

    //everything else gets regarded as a 'wrong'
    wrongs = playerAryCopy.slice();

    console.log("Perfect Match: ", perfectMatches)
    console.log("Match: ", matches)
    console.log("Wrong: ", wrongs)

    // for loop for the clue pins to change colour with each element in perfect match, match and wrong array
    for (let i = 0; i < cluePins.length; i++) {
        const pin = cluePins[i]
        if (i < perfectMatches.length){
            pin.style.backgroundColor = "green"
            console.log(`setting pin ${i} to green`)
        } else if (i < perfectMatches.length + matches.length) {
            pin.style.backgroundColor = "orange"
            console.log(`setting pin ${i} to orange`)
        }  else if (i < perfectMatches.length + matches.length + wrongs.length) {
            pin.style.backgroundColor = "red"
            console.log(`setting pin ${i} to red`)
        }
    }

    if (perfectMatches.length === 4) {
        renderWin()
    }
}


// get next row, clearing player guess and using set color function

function getNextRow() {
        currentRow++
        playerAry = []
        setColor()
        if (currentRow > 10) {
            renderLoss()
        }
    }


//set interval & clear interval

//?player guess // will use a colour pallet as buttons for user// iterates through cpuRanAry and updates guessclues
//?after player guess this will be locked and next row unlocked to input //could id each row to their relative row

//?guess clues // this will need to compare the player guess and cpuRanAry to provide 3 possible colours
//?green = correct colour in correct location, orange = correct colour in wrong location, red = wrong colour



// render function to make the game work
function render(){
    renderBoard()
    renderCountdown()
    // renderMessage()
}



function renderBoard() {

    board.style.visibility = 'visible';
    rules.style.display = 'none'
    winMessage.style.display = 'none'
}


//render win display
function renderWin(){
    winMessage.style.display = 'block'
}

function renderLoss(){
    lossImg.style.display = 'block'
    lossText.style.display = 'block'
    lossText.innerHTML = `GAME OVER - THE CODE WAS: ${cpuRanAry[0]}, ${cpuRanAry[1]}, ${cpuRanAry[2]}, ${cpuRanAry[3]}`
    let opacity = 0;
    function fade(){
        if (opacity >= 1) {
            return
        }
        opacity += 0.01
        lossImg.style.opacity = opacity
        requestAnimationFrame(fade)
    }

    requestAnimationFrame(fade)
    board.style.display = 'none'
    console.log('game over')
}

//countdown to start once player starts newBoard 

let intervalId;

function renderCountdown() {
    if (intervalId) {
        clearInterval(intervalId)
    }

    let duration = 1 * 60;
    let timer = duration, minutes, seconds;


    intervalId = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // console.log(minutes + ":" + seconds)
        countdownEl.textContent = `${minutes}:${seconds}`
        if (--timer < 0) {
            clearInterval(intervalId)
            renderLoss()
            console.log("timer has ended")
        }
    }, 1000)
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}