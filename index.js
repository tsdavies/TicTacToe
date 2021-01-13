// Make a blank filled array for the board
// potentially make sizeable grid
const newGame = () => new Array(9).fill(null)

// Represent board positions like this:
// [0, 1, 2]
// [3, 4, 5]
// [6, 7, 8]

// Manual representation of grid winning lines
// Essentially grid size 3x3 lines represent
// all horizontal straight lines
// all vertical straight line
// the X in the middle
const winningLines = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal 'X'
    [0, 4, 8],
    [6, 4, 2],
]

// Each row is position % gridSize === 0 length;
// Each column position is gridSize * column, gridsize times. 3x3 grid, col1 = 0,3,6
// canPlaceSymbol (board, position to mark, marker (0 = O, 1 = X))
const canPlaceSymbol = (board, position, symbol) => {
    if (board[position]) return false // space is occupied - fail
    board[position] = symbol
    return true // board updated - success
}

// If every position in the line is the same as the value at the
// first position of the line
// Return value true - all match, false otherwise.
const checkLine = (board, line) => line.every((position) => board[position] && board[position] === board[line[0]])

// For each winning line, find out if all position in that line have the same value
const isWinner = (board, winningLines) => {
    const length = winningLines.length
    for (let i = 0; i < length; i++) {
        if (checkLine(board, winningLines[i])) return true
    }
    return false
}

const BOARD_SQUARES = 9

let hasWon = false
let moveCounter = 0
let xTurn = true

const getSymbol = () => (xTurn ? "X" : "0")
const isDraw = () => moveCounter === BOARD_SQUARES
const isGameOver = () => hasWon || isDraw()

const setMessage = (message, messageStyle) => {
    const messageNode = document.getElementById("message")
    messageNode.innerHTML = `<h3 class="${messageStyle}">${message}</h3>`
}

const clickHandler = ({ board, square, index }) => {
    if (isGameOver()) return
    const symbol = getSymbol()
    if (canPlaceSymbol(board, index, symbol)) {
        // Update the board and move counter and the the 'who's next' value
        square.innerHTML = symbol
        moveCounter++
        xTurn = !xTurn

        // Check if this move won
        hasWon = isWinner(board, winningLines)

        if (hasWon) {
            setMessage(`${symbol} wins! `, "flash")
        } else {
            if (isDraw()) {
                setMessage(`<p>It's a tie!</p>`, "flash")
            } else {
                setMessage(`<p>Next turn is ${getSymbol(xTurn)}</p>`)
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const board = newGame()
    // Convert HTMLCollection to Array, because annoying. (Enables forEach loop)
    const boardDOM = Array.from(document.getElementsByTagName("td"))
    // We have all <td> elements (in board), loop over each and add a click event listener
    boardDOM.forEach((square, index) => {
        square.addEventListener("click", () =>
            clickHandler({
                board,
                square,
                index,
            })
        )
    })

    const restartNode = document.getElementById("restart")
    restartNode.onclick = () => {
        window.location.reload()
    }
})
