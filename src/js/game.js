class Game {
    constructor(playerName, scoreElement, timerElement, difficulty = 'medium') {
        this.playerName = playerName;
        this.scoreElement = scoreElement;
        this.timerElement = timerElement;
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isGameActive = false;
        this.score = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.moveCount = 0;
        this.difficulty = difficulty;
        
        // Xác định số lượng cặp thẻ và cấu hình lưới dựa trên độ khó
        let requiredPairs, columns;
        switch (difficulty) {
            case 'easy': 
                requiredPairs = 6; 
                columns = 3;
                break;
            case 'medium': 
                requiredPairs = 8; 
                columns = 4;
                break;
            case 'hard': 
                requiredPairs = 12; 
                columns = 4;
                break;
            default: 
                requiredPairs = 8;
                columns = 4;
        }
        
        this.gridColumns = columns;
        this.loadImages(requiredPairs);
    }

    loadImages(requiredPairs = 8) {
        // Đường dẫn đến các hình ảnh trong thư mục card-set-1
        const availableImages = [
            'images/cards/card-set-1/itachi1.jpg',
            'images/cards/card-set-1/naruto1.jpg',
            'images/cards/card-set-1/sasuke1.jpg',
            'images/cards/card-set-1/hinata1.jpg',
            'images/cards/card-set-1/tsunade1.jpg',
            // Thêm các hình ảnh khác trong thư mục nếu cần
        ];
        
        // Trường hợp 1: Có đủ hình ảnh
        if (availableImages.length >= requiredPairs) {
            // Xáo trộn và chọn số lượng cần thiết
            this.images = this.shuffleArray([...availableImages]).slice(0, requiredPairs);
        } 
        // Trường hợp 2: Không đủ hình ảnh, cho phép lặp lại
        else {
            // Tạo một mảng mới đủ dài bằng cách lặp lại các hình ảnh có sẵn
            this.images = [];
            for (let i = 0; i < requiredPairs; i++) {
                // Lấy hình ảnh theo chỉ mục, nếu vượt quá thì quay lại từ đầu
                const imageIndex = i % availableImages.length;
                this.images.push(availableImages[imageIndex]);
            }
            
            // Xáo trộn mảng kết quả để tránh các hình ảnh lặp lại xuất hiện liên tiếp nhau
            this.shuffleArray(this.images);
        }
        
        this.totalPairs = this.images.length;
        return this.images;
    }

    // Phương thức hỗ trợ để xáo trộn mảng
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    startGame() {
        this.shuffleCards();
        this.createCardElements();
        this.isGameActive = true;
        this.matchedPairs = 0;
        this.moveCount = 0;
        this.score = 0;
        this.timer = 0;
        this.updateScore(0);
        this.updateTimer();
        this.startTimer();
    }

    shuffleCards() {
        const doubledImages = [...this.images, ...this.images];
        this.cards = this.shuffleArray(doubledImages);
    }

    createCardElements() {
        const gameBoard = document.getElementById('game-board');
        if (!gameBoard) return;
        
        // Thiết lập số cột dựa trên độ khó
        gameBoard.style.gridTemplateColumns = `repeat(${this.gridColumns}, 1fr)`;
        
        gameBoard.innerHTML = '';
        
        const cardBackImage = 'images/cards/card-back.svg';
        
        this.cards.forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-index', index);
            card.setAttribute('data-image', image);
            
            // Tạo mặt trước (ảnh bị ẩn) và mặt sau (card-back) của thẻ
            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');
            
            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            
            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.style.backgroundImage = `url(${image})`;
            
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            
            card.addEventListener('click', () => this.flipCard(card));
            gameBoard.appendChild(card);
        });
    }

    flipCard(card) {
        if (!this.isGameActive || card.classList.contains('flipped') || this.flippedCards.length === 2) {
            return;
        }

        // Phát âm thanh lật thẻ
        this.playSound('flip');
        
        card.classList.add('flipped');
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.moveCount++;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [firstCard, secondCard] = this.flippedCards;
        const firstImage = firstCard.getAttribute('data-image');
        const secondImage = secondCard.getAttribute('data-image');

        if (firstImage === secondImage) {
            this.handleMatch();
        } else {
            setTimeout(() => {
                this.unflipCards(firstCard, secondCard);
            }, 1000);
        }
    }

    handleMatch() {
        // Phát âm thanh khi tìm thấy cặp giống nhau
        this.playSound('match');
        
        // Thêm delay trước khi đánh dấu thẻ đã khớp
        setTimeout(() => {
            // Thêm class để đánh dấu thẻ đã khớp
            this.flippedCards.forEach(card => {
                card.classList.add('matched');
                // Vô hiệu hóa sự kiện nhấp chuột cho thẻ đã khớp
                const newCard = card.cloneNode(true);
                card.parentNode.replaceChild(newCard, card);
            });
            
            this.matchedPairs++;
            
            // Tính điểm dựa trên độ khó
            const basePoints = 10;
            const difficultyMultiplier = this.difficulty === 'easy' ? 1 : 
                                      this.difficulty === 'medium' ? 1.5 : 2;
            this.updateScore(Math.round(basePoints * difficultyMultiplier));
            
            this.flippedCards = [];
            
            if (this.matchedPairs === this.totalPairs) {
                this.checkWin();
            }
        }, 700); // Delay 500ms để người chơi thấy được thẻ khớp
    }

    unflipCards(firstCard, secondCard) {
        // Phát âm thanh khi không khớp
        this.playSound('nomatch');
        
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        this.flippedCards = [];
    }

    checkWin() {
        this.isGameActive = false;
        this.stopTimer();
        
        // Phát âm thanh chiến thắng
        this.playSound('victory');
        
        // Hiển thị modal thắng
        const victoryModal = document.getElementById('victory-modal');
        const finalScoreEl = document.getElementById('final-score');
        const finalTimeEl = document.getElementById('final-time');
        
        if (victoryModal && finalScoreEl && finalTimeEl) {
            finalScoreEl.textContent = this.score;
            finalTimeEl.textContent = this.timer;
            victoryModal.classList.add('show');
        }
    }
    
    restartGame() {
        this.stopTimer();
        this.startGame();
    }
    
    updateScore(points) {
        this.score += points;
        if (this.scoreElement) {
            this.scoreElement.textContent = this.score;
        }
    }
    
    startTimer() {
        this.stopTimer(); // Clear any existing timer
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimer();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    updateTimer() {
        if (this.timerElement) {
            this.timerElement.textContent = this.timer;
        }
    }
    
    playSound(soundName) {
        try {
            const audio = new Audio(`audio/${soundName}-cut.mp3`);
            audio.play().catch(e => console.log('Audio playback failed:', e));
        } catch(error) {
            console.log('Error playing sound:', error);
        }
    }
}

export default Game;