// Define variables
const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const winningMessageText = document.getElementById('winningMessage');
const restartBtn = document.getElementById('restartBtn');

const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Define winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(cell, index), { once: true });
});

function handleClick(cell, index) {
  if (!gameActive) return;

  // Mark the cell with current player's marker
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for win
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (boardState.every(cell => cell)) {
    endGame(true);
  } else {
    // Switch turns and let AI play if current player is 'X'
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    if (currentPlayer === PLAYER_O) {
      aiMove();
    }
  }
}

// Check for win
function checkWin(currentPlayer) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return boardState[index] === currentPlayer;
    });
  });
}

// End game
function endGame(draw) {
  gameActive = false;
  if (draw) {
    winningMessageText.textContent = "It's a draw!";
  } else {
    winningMessageText.textContent = `${currentPlayer} wins!`;
  }
}

// AI Move (simple random AI)
function aiMove() {
  const availableCells = boardState
    .map((cell, index) => (cell === '' ? index : null))
    .filter(index => index !== null);

  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  const selectedCell = cells[randomIndex];

  setTimeout(() => {
    selectedCell.click();
  }, 500);
}

// Restart the game
restartBtn.addEventListener('click', restartGame);

function restartGame() {
  gameActive = true;
  currentPlayer = PLAYER_X;
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', () => handleClick(cell, index), { once: true });
  });
  winningMessageText.textContent = '';
}
