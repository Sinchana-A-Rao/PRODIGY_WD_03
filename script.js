let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

function handleClick(index) {
    if (gameActive && gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].textContent = currentPlayer;
        checkResult();
        togglePlayer();
        updateStatus();
    }
}

function checkResult() {
    let winner = null;

    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winner = gameBoard[a];
            break;
        }
    }

    if (winner) {
        gameActive = false;
        document.getElementById('status').textContent = `Player ${winner} wins!`;
        displayResultMessage(`Player ${winner} wins!`);
        showRestartButton();
    } else if (!gameBoard.includes('')) {
        gameActive = false;
        document.getElementById('status').textContent = "Game over! It's a draw!";
        displayResultMessage("Game over! It's a draw!");
        showRestartButton();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateStatus() {
    document.getElementById('status').textContent = gameActive ? `Player ${currentPlayer}'s turn` : "";
}

function showRestartButton() {
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.onclick = resetGame;

    let statusDiv = document.getElementById('status');
    statusDiv.appendChild(document.createElement('br'));
    statusDiv.appendChild(restartButton);
}

function displayResultMessage(message) {
    let resultMessageDiv = document.getElementById('resultMessage');
    resultMessageDiv.textContent = message;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;

    let resultMessageDiv = document.getElementById('resultMessage');
    resultMessageDiv.textContent = '';

    let statusDiv = document.getElementById('status');
    let restartButton = statusDiv.querySelector('button');
    if (restartButton) {
        restartButton.remove();
    }
}
