import Game from './game.js';
import { saveScore, displayLeaderboard } from './leaderboard.js';

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const homeButton = document.getElementById('home-button');
    const leaderboardButton = document.getElementById('leaderboard-button');
    const backButton = document.getElementById('back-button');
    const playAgainButton = document.getElementById('play-again');
    const submitScoreButton = document.getElementById('submit-score');
    
    const playerNameInput = document.getElementById('player-name');
    const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const gameContainer = document.getElementById('game-container');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const victoryModal = document.getElementById('victory-modal');
    
    const scoreValueElement = document.getElementById('score-value');
    const timeElement = document.getElementById('time');

    let game;
    let playerName;
    let difficulty = 'medium';

    // Event Listeners
    startButton.addEventListener('click', () => {
        playerName = playerNameInput.value.trim() || 'Player';
        
        // Get selected difficulty
        difficultyRadios.forEach(radio => {
            if (radio.checked) {
                difficulty = radio.value;
            }
        });
        
        welcomeScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        
        // Start the game
        game = new Game(playerName, scoreValueElement, timeElement, difficulty);
        game.startGame();
    });
    
    restartButton.addEventListener('click', () => {
        if (game) {
            game.restartGame();
        }
    });
    
    homeButton.addEventListener('click', () => {
        gameContainer.style.display = 'none';
        welcomeScreen.style.display = 'block';
        if (game) {
            game.stopTimer();
        }
    });

    leaderboardButton.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
        leaderboardContainer.style.display = 'block';
        displayLeaderboard();
    });
    
    backButton.addEventListener('click', () => {
        leaderboardContainer.style.display = 'none';
        welcomeScreen.style.display = 'block';
    });
    
    submitScoreButton.addEventListener('click', () => {
        if (game) {
            saveScore(playerName, game.score);
            victoryModal.classList.remove('show');
            leaderboardContainer.style.display = 'block';
            gameContainer.style.display = 'none';
            displayLeaderboard();
        }
    });
    
    playAgainButton.addEventListener('click', () => {
        if (game) {
            victoryModal.classList.remove('show');
            game.restartGame();
        }
    });

    // Đóng modal khi click bên ngoài
    window.addEventListener('click', (event) => {
        if (event.target === victoryModal) {
            victoryModal.classList.remove('show');
        }
    });
});