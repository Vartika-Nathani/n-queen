const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  const n = parseInt(document.getElementById("nInput").value);
  if (n < 4 || n > 12) {
    messageEl.textContent = "Please enter a value between 4 and 12.";
    return;
  }

  document.documentElement.style.setProperty('--n', n);
  boardEl.innerHTML = "";
  messageEl.textContent = "Solving...";
  boardEl.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

  const board = Array.from({ length: n }, () => Array(n).fill(0));
  const success = solveNQueens(board, 0, n);

  if (success) {
    renderBoard(board, n);
    messageEl.textContent = "✅ Solution Found!";
  } else {
    messageEl.textContent = "❌ No solution found.";
  }
});

function isSafe(board, row, col, n) {
  for (let i = 0; i < col; i++)
    if (board[row][i]) return false;

  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
    if (board[i][j]) return false;

  for (let i = row, j = col; i < n && j >= 0; i++, j--)
    if (board[i][j]) return false;

  return true;
}

function solveNQueens(board, col, n) {
  if (col >= n) return true;

  for (let i = 0; i < n; i++) {
    if (isSafe(board, i, col, n)) {
      board[i][col] = 1;

      if (solveNQueens(board, col + 1, n)) return true;

      board[i][col] = 0; // backtrack
    }
  }

  return false;
}

function renderBoard(board, n) {
  boardEl.innerHTML = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if ((i + j) % 2 === 0) {
        cell.classList.add("black");
      }
      if (board[i][j] === 1) {
        cell.classList.add("queen");
        cell.textContent = "♕";
      }
      boardEl.appendChild(cell);
    }
  }
}
