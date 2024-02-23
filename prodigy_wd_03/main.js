const board = document.getElementById("board");
const cells = [];
const resultDiv = document.getElementById("result");
const resetButton = document.getElementById("reset");
const playAIButton = document.getElementById("playAIButton");
const twoPlayerButton = document.getElementById("twoPlayerButton");
let twoPlayerMode = true;
let playWithAI = false;
let currentPlayer = "X";
let gameActive = true;

for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleCellClick(i));
    cells.push(cell);
    board.appendChild(cell);
}

function handleCellClick(index) {
    if (!gameActive || cells[index].textContent !== "") {
        return;
    }
    cells[index].textContent = currentPlayer;
    if (checkForWinner()) {
        displayResult(`${twoPlayerMode ? "Player" : "You"} ${currentPlayer} wins!!`);
        highlightWinningCells(getWinningCombination());
        gameActive = false;
    } else if (checkForTie()) {
        displayResult("It's a tie!!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (playWithAI && currentPlayer === "O") {
            setTimeout(makeComputerMove, 500);
        }
    }
}

function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].textContent !== "" &&
               cells[a].textContent === cells[b].textContent &&
               cells[a].textContent === cells[c].textContent;
    });
}

function getWinningCombination() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
            return combination;
        }
    }
    return null;
}

function highlightWinningCells(combination) {
    if (combination) {
        combination.forEach(index => {
            cells[index].classList.add("winning-cell");
        });
    }
}

function checkForTie() {
    return cells.every(cell => cell.textContent !== "");
}

function makeComputerMove() {
    const emptyCells = cells.reduce((acc, cell, index) => {
        if (cell.textContent === "") {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];

    cells[computerMove].textContent = currentPlayer;
    if (checkForWinner()) {
        displayResult("AI Won!!");
        highlightWinningCells(getWinningCombination());
        gameActive = false;
    } else if (checkForTie()) {
        displayResult("It's a tie!!");
        gameActive = false;
    } else {
        currentPlayer = "X";
    }
}

function displayResult(message) {
    resultDiv.textContent = message;
}
        
resetButton.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-cell");
    });
    resultDiv.textContent = "";
    currentPlayer = "X";
    gameActive = true;
});

twoPlayerButton.addEventListener("click", () => {
    twoPlayerMode = true;
    playWithAI = false;
    resultDiv.textContent = "";
    resetButton.click();
    twoPlayerButton.classList.add("active");
    playAIButton.classList.remove("active");
});

playAIButton.addEventListener("click", () => {
    playWithAI = !playWithAI;
    resultDiv.textContent = "";
    resetButton.click();
    playAIButton.classList.add("active");
    twoPlayerButton.classList.remove("active");
});