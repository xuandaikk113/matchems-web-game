const leaderboardKey = 'memoryGameLeaderboard';

export function saveScore(name, score, time) {
    const leaderboard = getLeaderboard();
    leaderboard.push({ name, score, time });
    
    // Sort first by score (descending), then by time (ascending)
    leaderboard.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // Higher score first
        }
        return a.time - b.time; // If same score, shorter time first
    });
    
    localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
}

export function getLeaderboard() {
    const storedLeaderboard = localStorage.getItem(leaderboardKey);
    return storedLeaderboard ? JSON.parse(storedLeaderboard) : [];
}

export function displayLeaderboard() {
    const leaderboard = getLeaderboard();
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('leaderboard-entry');
        
        // Format the time in minutes:seconds
        const minutes = Math.floor(entry.time / 60);
        const seconds = entry.time % 60;
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        // Show rank, name, score and time
        entryElement.textContent = `${index + 1}. ${entry.name}: ${entry.score} points (${formattedTime})`;
        leaderboardElement.appendChild(entryElement);
    });
}