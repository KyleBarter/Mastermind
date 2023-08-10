# Mastermind
GA  project 1
Description
This was my first project with the General Assembly Software Engineering Immersive course where we were given just under a week to create a browser game. I opted with Mastermind, 
a code breaking game where the player tries to crack the hidden code through guesses and logical thinking, as this was a game I always used to play with family when I was younger. 
I also chose this game as I felt it was the right level of challenge for me at the stage I was in in my coding journey. I was interested in particular in comparing  the guesses 
with the code, so that I could then provide clues to show how close they are to cracking the code.


Rules
Code maker (CPU) creates a linear 4 digit code from a choice of 6 colours
Code guesser (player) makes an attempt to guess the hidden code
Code maker then confirms if the player has guessed any of the following:
Correct colour in incorrect position (marked with a green pin)
Correct colour in correct position (marked with an amber pin)
Incorrect colours (marked with a red pin)
Code guesser has 10 attempts to crack the code. The twist I’m making for my game is that the aesthetic will be a bomb defusal game, as such a timer will be set for the player.
Player loses if either the time runs out, or they run out of guesses and the bomb detonates
Player wins if they guess the correct code

Deployment link
https://github.com/KyleBarter/Mastermind



Getting Started/Code Installation
Written in VS code, will just need to clone, fork and take the HTTPS for your terminal


Timeframe & Working Team (Solo/Pair/Group)
This was a solo task where we were given roughly 6.5 days to complete the project. 


Technologies Used
I used Figma to wireframe the early concept of the game, and then used VS code to write the program. Stack overflow also assisted me in implementing certain lines and blocks.
Brief
Create a browser game with win / loss logic, deployed online using GitHub pages. We had to use separate HTML, CSS and JS files, with correct industry best practices such as 
correct indentation, applicable comments, correct naming conventions for functions and consistent vertical whitespace. Mastermind had no further specific requirements other than this.

Planning
Wireframe:
![mastermind-wireframe](https://github.com/KyleBarter/Mastermind/assets/118014478/7d2921b7-2282-4866-8cc0-bf084290c441)


I had detailed Pseudo code to get signed off for the project in the first instance, however as this was my first project I wasn’t familiar with committing to git consistently to grab 
screenshots. However below you can see some notes I made about what functions, event listeners and constants I wished to used.
Constants
Colours array [purple, yellow, blue, white, pink, grey]

Functions
Player guess
Countdown
Guess clues - green, yellow, red
Row unlock after guess made. Then locking the row of the guess that has been submitted

Event listeners
Each key click for the colours
Enter to submit code / defuse
‘Defuse the bomb’ restart the game / start new game


Build/Code Process
After listing the key components in the pseudo code above, and after building the board in CSS my first task was to assign the colour buttons on the front-end to concatinate to the colors array, for the empty CPU and player array.
![MM code 1](https://github.com/KyleBarter/Mastermind/assets/118014478/a29293fb-308c-46c0-bc19-362a03640731)


The nicest function to write was for the cpuRanAry to get them a four digit code using the colours provided. Simply using the Math.floor and Math.random methods in a for loop that stops once they have four objects in the array.

![MM code 2](https://github.com/KyleBarter/Mastermind/assets/118014478/2626a7a2-5b2a-48c4-871e-be44e6187c8d)




This would be my favourite function that I wrote, which starts the game / resets the game if you’re already in one. This clears the cpuRanAry, playerAry and sets all the background colours of each pin to blank, 
as well as setting the row and guess back to index 0. From here the user can begin guessing again as the cpuCode function is invoked at the end with colors as the argument so that the cpuRanAry is populated again. 

![MM code 3](https://github.com/KyleBarter/Mastermind/assets/118014478/65d9f91d-c432-4834-8708-d2dd144cf572)



One of the most useful things I learnt during this was creating a countdown and formatting it so that it appears as minute:seconds rather than 300 seconds counting down. This also fit the aesthetic of 
bomb defusal more as it was displayed as a digital clock (ie 4:25 displayed)
![MM code 4](https://github.com/KyleBarter/Mastermind/assets/118014478/7db1977e-36f5-4127-8ef2-af9bffaea519)

Challenges
As this was my first project there were lots of challenges to overcome, mainly the win / loss logic. This was a huge issue because of the way I was counting the user’s score. 2 points were for a perfectMatch 
(right colour in right location) so 8 points would result in a win, whereas a loss would be if the timer reaches zero, the currentRow was >9 && cluePins score was >8.

This was fine, it has just been a huge challenge trying to splice the array without it skipping the next index. For example, if the user guesses correct for all four, it will iterate through the array at index 0 
and see it’s correct, then move to index 1. However, as index 0 was removed, index 1 moves to index 0 so when the function iterates to array index 1, it’s actually reviewing index 2 as the array has shifted down by 1.

I fixed this by iterating through the array backwards so that it doesn’t have this issue.

Wins
I learnt a lot more about CSS gridbox as this was how I made the board of the game look like my wireframe. Playing around with this, whilst it was stressful, helped me problem solve where things should be using elements such as 
justify content, align items, grid-area-box etc. 

I was really happy when I managed to get the guess pin’s colour to change to the corresponding guess the user would click on, this ended up being quite simple but felt like a big win for me and was so satisfying to see.

Key Learnings/Takeaways
I became much more familiar with arrays and for loops to iterate through them with. Before this I still couldn’t quite understand the standard for loop structure (i = 0; i < length; i++). This made me feel much more 
comfortable with how these two syntax’s work.

Another key thing I learnt was how important it is to modularize my code. Some of my first commits had the submit, player guess and clue’s all under one submit event listener. This made the process very overwhelming as any 
small change would break the entire function, it was also horrible to read and try find where I was.

After receiving feedback about this I made a lot of smaller functions that I could call under the ‘submit’ function which made the code easier to read and easier to edit and update.




Bugs
Clue pins not giving the correct score correlating to the player guess. I think that this has something to do with how JS iterates over arrays. It moves onto index 1 but as it’s designed to not count duplicate pins, index 0 is 
deleted and what was index 1 shifts to index 0 so it actually skips over the original index 1 and 3. It’s something I’m going to be looking into as I would love for this game to work properly.

Initial load of page starts the guess at index 1, clicking ‘defuse the bomb’ starts a new game at index 0. I think I’m going to hide the board on load, and have a rules page showing, when the user clicks ‘defuse the bomb’ this will show the board and hide the rules.


Future Improvements
I’m going to implement the following to improve the game:
Bomb detonation for a player loss
Audio cues for a perfect match, match or wrong guess
Main screen is just ‘defuse the bomb’ to start the game, which would fix the bug mentioned above
Countdown beeping when it gets to final 10 seconds
