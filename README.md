# The dreamed job

## Description

Land your dreamed job can be be a tough experience expecially when the HR guys and girls prevent you to meet the only person that will make you the questions that matters. "the dreamed job" is a survival game in which the player will have to avoid the HR team and meet the Project Manger with at least 1 cv.

## MVP (DOM - CANVAS)

The player that can move in 2 directions (left and right) via key related events. HR teams members and the Project Manager will move vertically and randomly (no related key actions). The Project Manager will fall every x time. Every time a HR team member will collide with the Player this one will loose a cv (he will have 4 in total). When the Project Manager and the player collide a prompt with a question will appear. If the answer at the question is correct, the player will win the game. If not, he'll loose automatically.

## Tasks

- Setup git & GitHub
- Create and connect files: main.js, player.js, obstacle.js,
- BuildDom in main.js
- Create 4 screens in main.js
- Create screen transitions in main.js
- Create Game constructor
- Create loop in game.js
- Create Player constructor
- Create HRTeam constructor
- Create ProjectM constructor
- Draw Player in game.js
- Draw HRTeam in game.js
- Draw ProjectM in game.js
- Move HRTeam & ProjectM in game.js
- Move player (addEventListener (keys left - right)) in game.js
- Check Collisions in game.js
- Check game result in game.js
- update lives in game.js
- speed in game.js
- Add cv's lives and print it in game.js
- Create lifeboard in main.js
- addEventListener (click, startGame) in main.js
- Add audios, img and fonts

## Data structure

1. index.html
2. main.js
3. game.js
4. player.js
5. obstacle.js
6. bonus.js

### 1. index.html file

### 2. Main file

- buildDom
- createStartScreen / removeStartScreen
- createGameScreen / removeGameScreen
- createGameOverScreen / removeGameOverScreen
- createWinScreen / removeWinScreen
- startGame / endGame

### 3. Game Constructor

**Properties**

- canvas

- ctx

- player

- HRteam

- ProjectM

- gameIsOver

- gameIsWon

- loopCountLives

**Methods**

- start
- startLoop
- checkCollision
- checkLives
- win
- gameWon / gameOver
- printLives
- printTime

### 4. Player Constructor

**Properties**

- canvas
- ctx
- x position
- y position
- width
- height
- lives
- image
- direction

**Methods**

- draw

- move

- collidedWithObstacle

- collidedWithScreen

- removeLife

### 5. HRteam & ProjectM Constructor

**Properties**

- canvas
- ctx
- x position
- y position
- width
- height
- row
- speed
- direction
- image

**Methods**

- draw
- move

## Backlog

- Bonus cv (extra life if collide a randomly ironhacker)
- Username registration and scoreboard (to compete again other players)
- Pause game
- Sounds and visual effects (when collides, looses or wins)

## States and States Transitions

- startScreen

  - Start the game
  - Goes to gameScreen when Start button is clicked

- gameScreen

  - Game running while lives > 0
  - Goes to gameoverScreen if lives < 0
  - Goes to winScreen if Players collide with the ProjctM

- gameoverScreen

  - Shows Game Over message and Restart button
  - Goes back to Game Screen when Restart button is clicked

- winScreen

  - Shows Win message and Restart button

  - Goes back to Game Screen when Restart button is clicked

## Links

### Trello

https://bit.ly/2xeOM5D
