// Firebase configuration
const firebaseConfig = {
    // Your Firebase configuration
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let playerId = null;
let opponentId = null;
let playerScore = 0;
let opponentScore = 0;

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    startGame();
});

function startGame() {
    // Generate random player ID
    playerId = 'player-' + Math.random().toString(36).substr(2, 9);
    document.getElementById('player-name').innerText = 'Player ' + playerId.substr(7);

    // Listen for changes in the game state
    database.ref('game').on('value', snapshot => {
        const gameState = snapshot.val();
        if (gameState && gameState.opponentId) {
            opponentId = gameState.opponentId;
            if (gameState.playerChoice && gameState.opponentChoice) {
                updateScore(gameState.playerChoice, gameState.opponentChoice);
                displayResult(gameState.playerChoice, gameState.opponentChoice);
            }
        }
    });

    // Listen for changes in player score
    database.ref('scores/' + playerId).on('value', snapshot => {
        playerScore = snapshot.val() || 0;
        document.getElementById('player-score').innerText = `Your Score:
