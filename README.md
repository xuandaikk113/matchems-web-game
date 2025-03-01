# Memory Game

## Overview
This is a web-based memory game where players must find matching pairs of images. The game features a simple and intuitive user interface, responsive design, and engaging gameplay mechanics.

## Features
- **Matching Pairs**: Players flip cards to find matching pairs of images.
- **Responsive Design**: The game is designed to work seamlessly on both desktop and mobile devices.
- **Leaderboard**: Players can enter their names and save their scores to a leaderboard.
- **Sound Effects**: Enjoy sound effects for card flips, matches, and winning the game.
- **Multiple Difficulty Levels**: The game offers different levels of difficulty by changing the grid size and number of images.

## Project Structure
```
memory-game
├── src
│   ├── js
│   │   ├── app.js
│   │   ├── game.js
│   │   ├── leaderboard.js
│   │   └── utils.js
│   ├── css
│   │   ├── styles.css
│   │   ├── game.css
│   │   ├── leaderboard.css
│   │   └── responsive.css
│   ├── audio
│   │   ├── flip.mp3
│   │   ├── match.mp3
│   │   ├── nomatch.mp3
│   │   └── victory.mp3
│   ├── images
│   │   ├── cards
│   │   │   ├── card-back.svg
│   │   │   └── card-set-1
│   │   │       ├── image1.svg
│   │   │       ├── image2.svg
│   │   │       └── ...
│   │   └── ui
│   │       ├── logo.svg
│   │       └── icons
│   │           ├── timer.svg
│   │           ├── score.svg
│   │           └── settings.svg
│   └── index.html
├── data
│   └── leaderboard.json
├── package.json
└── README.md
```

## Getting Started
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open `src/index.html` in your web browser to start playing the game.

## How to Play
- Click on two cards to flip them over.
- If the cards match, they will remain face up.
- If they do not match, they will flip back after a short delay.
- Try to find all matching pairs in the least amount of time!

## Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements for the game.

## License
This project is open-source and available under the MIT License.