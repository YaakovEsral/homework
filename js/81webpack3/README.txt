This game is called Bubble Trouble. It is based on a game on Miniclip that I used to play.
The original can be found at: https://www.miniclip.com/games/bubble-trouble/en/

The object of the game is to clear all the bubbles using the arrow keys to move and the spacebar to shoot.

This program incorporates many features to create the game: 
different bubble sizes - saved in a bubbleTypes array in the Bubble.js file
levels - accessed via levels.json5 and the Level class,
a beam that can only shoot one line at a time, 
bubble splitting - upon getting hit, the bubble will split into two smaller bubbles (except for the smallest),
game loop - constant updating and repainting the screen with new positions for avatar, bubbles and beam,
heads up display - tracking and displaying the score and level number,
timer - a time tracker bar that will end the game upon running out

An additional feature of this version is that it will work for all screen sizes. This is done by means of 
a constant UNIT by which all measurements are made. The UNIT is based on the screen size at the time the 
game is loaded.