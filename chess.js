// Define size of a chessboard
const boardSize = 8;
// Create board variable
var board;
// Define the format for a square with no piece
var nonePiece = ["empty.png", "notPiece"];

// Array row and column of selected piece
var selectedPieceRow;
var selectedPieceColumn;

// HTML table row and column of selected piece (as letter and number combo)
var selectedSquare;

// Number of deleted pieces (used to track adding pieces)
var deletedPieces = 0;

// Working
function resetBoard() {
    // Set all pieces to original states
    var whitePieces = [["wrook.png", "null", "a8", "rook", "on board"], ["wknight.png", "null", "b8", "knight", "on board"],
    ["wbishop.png", "null", "c8", "bishop", "on board"], ["wqueen.png", "null", "d8", "queen", "on board"],
    ["wking.png", "null", "e8", "king", "on board"], ["wbishop.png", "null", "f8", "bishop", "on board"],
    ["wknight.png", "null", "g8", "knight", "on board"], ["wrook.png", "null", "h8", "rook", "on board"]];

    var blackPieces = [["brook.png", "null", "a8", "rook", "on board"], ["bknight.png", "null", "b8", "knight", "on board"],
    ["bbishop.png", "null", "c8", "bishop", "on board"], ["bqueen.png", "null", "d8", "queen", "on board"],
    ["bking.png", "null", "e8", "king", "on board"], ["bbishop.png", "null", "f8", "bishop", "on board"],
    ["bknight.png", "null", "g8", "knight", "on board"], ["brook.png", "null", "h8", "rook", "on board"]];

    var blackPawns = [["bpawn.png", "null", "a7", "pawn", "on board"], ["bpawn.png", "null", "b7", "pawn", "on board"],
    ["bpawn.png", "null", "c7", "pawn", "on board"], ["bpawn.png", "null", "d7", "pawn", "on board"],
    ["bpawn.png", "null", "e7", "pawn", "on board"], ["bpawn.png", "null", "f7", "pawn", "on board"],
    ["bpawn.png", "null", "g7", "pawn", "on board"], ["bpawn.png", "null", "h7", "pawn", "on board"],];

    var whitePawns = [["wpawn.png", "null", "a2", "null", "on board"], ["wpawn.png", "null", "b2", "null", "on board"],
    ["wpawn.png", "null", "c2", "pawn", "on board"], ["wpawn.png", "null", "d2", "pawn", "on board"],
    ["wpawn.png", "null", "e2", "pawn", "on board"], ["wpawn.png", "null", "f2", "pawn", "on board"],
    ["wpawn.png", "null", "g2", "pawn", "on board"], ["wpawn.png", "null", "h2", "pawn", "on board"]];

    // Set the chessboard to a starting position
    board = {
        1: [whitePieces[0], whitePieces[1], whitePieces[2], whitePieces[3], whitePieces[4], whitePieces[5], whitePieces[6], whitePieces[7]],
        2: [whitePawns[0], whitePawns[1], whitePawns[2], whitePawns[3], whitePawns[4], whitePawns[5], whitePawns[6], whitePawns[7]],
        3: [['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece']],
        4: [['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece']],
        5: [['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece']],
        6: [['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece']],
        7: [blackPawns[0], blackPawns[1], blackPawns[2], blackPawns[3], blackPawns[4], blackPawns[5], blackPawns[6], blackPawns[7]],
        8: [blackPieces[0], blackPieces[1], blackPieces[2], blackPieces[3], blackPieces[4], blackPieces[5], blackPieces[6], blackPieces[7]]
    };
    deletedPieces = 0;
    updateBoard();
}

// Working
function updateBoard() {
    // Populate the board based on the board variable
    for (var row = (boardSize); row > 0; row--) {
        if (row % 2 == 0) {
            // Populate even row with even square coloring
            $(`#${row}`).html(`<th>  ${row} </th> 
                <td id="a${row}"> <button id="${row}0" class="square"> <img src="img/${board[row][0][0]}"> </button> </td> 
                <td id="b${row}" class="ds"> <button id="${row}1" class="square"> <img src="img/${board[row][1][0]}"> </button> </td> 
                <td id="c${row}"> <button id="${row}2" class="square"> <img src="img/${board[row][2][0]}"> </button> </td> 
                <td id="d${row}" class="ds"> <button id="${row}3" class="square"> <img src="img/${board[row][3][0]}"> </button> </td> 
                <td id="e${row}"> <button id="${row}4" class="square"> <img src="img/${board[row][4][0]}"> </button> </td> 
                <td id="f${row}" class="ds"> <button id="${row}5" class="square"> <img src="img/${board[row][5][0]}"> </button> </td> 
                <td id="g${row}"> <button id="${row}6" class="square"> <img src="img/${board[row][6][0]}"> </button> </td> 
                <td id="h${row}" class="ds"> <button id="${row}7" class="square"> <img src="img/${board[row][7][0]}"> </button> </td> `)
        } else {
            // Populate odd row with odd square coloring
            $(`#${row}`).html(`<th>  ${row} </th> 
                <td id="a${row}" class="ds"> <button id="${row}0" class="square"> <img src="img/${board[row][0][0]}"> </button> </td> 
                <td id="b${row}"> <button id="${row}1" class="square"> <img src="img/${board[row][1][0]}"> </button> </td> 
                <td id="c${row}" class="ds"> <button id="${row}2" class="square"> <img src="img/${board[row][2][0]}"> </button> </td> 
                <td id="d${row}"> <button id="${row}3" class="square"> <img src="img/${board[row][3][0]}"> </button> </td> 
                <td id="e${row}" class="ds"> <button id="${row}4" class="square"> <img src="img/${board[row][4][0]}"> </button> </td> 
                <td id="f${row}"> <button id="${row}5" class="square"> <img src="img/${board[row][5][0]}"> </button> </td> 
                <td id="g${row}" class="ds"> <button id="${row}6" class="square"> <img src="img/${board[row][6][0]}"> </button> </td> 
                <td id="h${row}"> <button id="${row}7" class="square"> <img src="img/${board[row][7][0]}"> </button> </td> `)
        }
    }
}

// To update
function selectSquare() {
    // Reset color of previous selected piece
    if (selectedSquare != null) {
        // Find square color
        var squareColor = jQuery(`#${selectedSquare}`).attr('class');
        // Reset color
        console.log(squareColor);
        if (squareColor == 'ds') {
            $(`#${selectedSquare}`).css("background-color", "brown");
        } else {
            $(`#${selectedSquare}`).css("background-color", "burlywood");
        }
    }

    // Find selected piece's position
    tag = jQuery(this).attr('id');

    // Find selected piece's row and column (as both letter and number)
    var row = Math.floor(tag / 10);
    var column = (tag % 10);
    var columnLetter = String.fromCharCode(97 + column);

    // Records the square of the selected piece
    selectedSquare = `${columnLetter}${row}`;;

    // Updates the color of the selected piece's square
    $(`#${columnLetter}${row}`).css("background-color", "grey");

    // Check if selected position is a piece
    if (board[row][column][1] != "notPiece") {

        // Set the add button to gray to indicate adding to that spot is not possible
        $(`.add`).css("background-color", "gray");

        // Set the delete button to red to indicate deletion is possible
        $(`.delete`).css("background-color", "red");

        // Record the selected piece and set its square to yellow
        selectedPieceRow = row;
        selectedPieceColumn = column;

    } else {

        // Check if there are any deleted pieces
        if (deletedPieces > 0) {
            // Set the add button to green to indicate adding to that spot is possible
            $(`.add`).css("background-color", "green");
        }

        // Set the delete button to gray to indicate deletion is not possible
        $(`.delete`).css("background-color", "gray");

        // Sets the selected piece locations to null
        selectedPieceRow = null;
        selectedPieceColumn = null;
    }
}

// Working
function deletePieces() {
    // Checks if there is a selected piece
    if (selectedPieceRow != null && selectedPieceColumn != null) {

        // Set the pieces taken value to taken and empty the square in the board
        board[selectedPieceRow][selectedPieceColumn][4] = 'taken';
        board[selectedPieceRow][selectedPieceColumn] = ['empty.png', 'notPiece'];

        // Add one to the deleted pieces counter
        deletedPieces += 1;
    }

    // Update the board
    updateBoard();
};

// To implement
function takePiece() {

}

// To implement
function addPieces() {
    if (deletePieces > 0 && selectedPieceRow == null && selectedPieceColumn == null) {
    }
};

// To update as needed
setup = function () {
    // Reset the board and populate it
    resetBoard();
    updateBoard();

    // Add event listeners
    $("body").on("click", ".square", selectSquare);
    $("body").on("click", ".reset", resetBoard);
    $("body").on("click", ".delete", deletePieces);
    $("body").on("click", ".add", addPieces);
}
$(document).ready(setup)

// Merge Pull Request Test Through GitHub