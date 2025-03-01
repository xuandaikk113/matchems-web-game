const leaderboardKey = 'memoryGameLeaderboard';

export function saveScore(name, score) {
    const leaderboard = getLeaderboard();
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
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

    leaderboard.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('leaderboard-entry');
        entryElement.textContent = `${entry.name}: ${entry.score}`;
        leaderboardElement.appendChild(entryElement);
    });
}