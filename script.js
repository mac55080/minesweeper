const boardSize = 9;
const numBombs = 8;
let board = [];

function initializeBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = {
        isBomb: false,
        isOpen: false,
        value: 0
      };
    }
  }
}

function placeBombs() {
  let bombsPlaced = 0;
  while (bombsPlaced < numBombs) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    if (!board[x][y].isBomb) {
      board[x][y].isBomb = true;
      bombsPlaced++;
    }
  }
}

function calculateValues() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!board[i][j].isBomb) {
        for (let xOffset = -1; xOffset <= 1; xOffset++) {
          for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const x = i + xOffset;
            const y = j + yOffset;
            if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y].isBomb) {
              board[i][j].value++;
            }
          }
        }
      }
    }
  }
}

function revealBoard() {
  const boardElement = document.getElementById("board");
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.getElementById(`cell-${i}-${j}`);
      cell.classList.remove("hidden");
      //if (board[i][j].isBomb) {
      //  cell.innerText = "*";
      //} else {
      //  cell.innerText = board[i][j].value;
      //}
    }
  }
}

function revealCell(x, y) {
  const cell = document.getElementById(`cell-${x}-${y}`);
  if (!cell.classList.contains("hidden")) {
    return;
  }
  cell.classList.remove("hidden");
  if (board[x][y].value === 0) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const newX = x + xOffset;
        const newY = y + yOffset;
        if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
          revealCell(newX, newY);
        }
      }
    }
  }
}

function cellClick(x, y) {
  if (board[x][y].isOpen) {
    return;
  }
  board[x][y].isOpen = true;
  if (board[x][y].isBomb) {
    board[x][y].innerText = '*';
    revealBoard();
    alert("Game Over! You hit a bomb!");
  } else {
    revealCell(x, y);
  }
}

function startGame() {
  board = [];
  initializeBoard();
  placeBombs();
  calculateValues();
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.className = "cell hidden";
      cell.id = `cell-${i}-${j}`;
      cell.onclick = () => cellClick(i, j);
      boardElement.appendChild(cell);
      const cellRendered = document.getElementById(`cell-${i}-${j}`);
      cellRendered.innerText = board[i][j].value;
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', startGame);
});
