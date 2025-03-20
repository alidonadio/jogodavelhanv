const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartBtn');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para verificar se alguém ganhou
function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            statusDisplay.textContent = `Jogador ${gameBoard[a]} venceu!`;
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameActive = false;
        statusDisplay.textContent = "Empate!";
    }
}

// Função para alternar o jogador
function handleCellClick(event) {
    const index = event.target.getAttribute('data-cell-index');
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Vez do jogador ${currentPlayer}`;
    }
}

// Função para reiniciar o jogo
function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    statusDisplay.textContent = `Vez do jogador X`;
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);