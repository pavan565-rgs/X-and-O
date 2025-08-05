const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      statusText.textContent = `Player ${gameState[a]} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Current Turn: ${currentPlayer}`;
    }
  }
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Current Turn: ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
