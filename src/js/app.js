import Game from './game.js';
import { saveScore, displayLeaderboard } from './leaderboard.js';
// Add this function at the beginning of your DOMContentLoaded event
function createFloatingCards() {
    const cardBackground = document.getElementById('card-background');
    if (!cardBackground) return;
    
    const numCards = 300; // Number of floating cards
    
    for (let i = 0; i < numCards; i++) {
        const card = document.createElement('div');
        card.classList.add('floating-card');
        
        // Ensure cards are distributed across the entire viewport
        card.style.left = `${Math.random() * 100}vw`;
        card.style.top = `${Math.random() * 100}vh`;
        
        // Random rotation
        card.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random animation delay
        card.style.animationDelay = `${Math.random() * 5}s`;
        
        // Make sure cards have absolute positioning
        card.style.position = 'absolute';
        
        cardBackground.appendChild(card);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    createFloatingCards(); // Call this at the start
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