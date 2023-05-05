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
    var whitePieces = [["wrook.png", "rook", "on board"], ["wknight.png", "knight", "on board"],
    ["wbishop.png", "c8", "bishop", "on board"], ["wqueen.png", "d8", "queen", "on board"],
    ["wking.png", "e8", "king", "on board"], ["wbishop.png", "f8", "bishop", "on board"],
    ["wknight.png", "g8", "knight", "on board"], ["wrook.png", "h8", "rook", "on board"]];

    var blackPieces = [["brook.png", "rook", "on board"], ["bknight.png", "knight", "on board"],
    ["bbishop.png", "bishop", "on board"], ["bqueen.png", "d8", "queen", "on board"],
    ["bking.png", "king", "on board"], ["bbishop.png", "f8", "bishop", "on board"],
    ["bknight.png", "knight", "on board"], ["brook.png", "h8", "rook", "on board"]];

    var blackPawns = [["bpawn.png", "pawn", "on board"], ["bpawn.png", "pawn", "on board"],
    ["bpawn.png", "pawn", "on board"], ["bpawn.png", "pawn", "on board"],
    ["bpawn.png", "pawn", "on board"], ["bpawn.png", "pawn", "on board"],
    ["bpawn.png", "pawn", "on board"], ["bpawn.png", "pawn", "on board"]];

    var whitePawns = [["wpawn.png", "pawn", "on board"], ["wpawn.png", "pawn", "on board"],
    ["wpawn.png", "pawn", "on board"], ["wpawn.png", "pawn", "on board"],
    ["wpawn.png", "pawn", "on board"], ["wpawn.png", "pawn", "on board"],
    ["wpawn.png", "pawn", "on board"], ["wpawn.png", "pawn", "on board"]];

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
    selectedPieceRow = null;
    selectedPieceColumn = null;
    $(`.add`).css("background-color", "gray");
    $(`.delete`).css("background-color", "gray");
    deletedPieces = 0;
    updateBoard();
}

// Working
function resetSquare() {
    // Reset color of previous selected piece
    if (selectedSquare != null) {
        // Find square color
        var squareColor = jQuery(`#${selectedSquare}`).attr('class');
        // Reset color
        if (squareColor == 'ds') {
            $(`#${selectedSquare}`).css("background-color", "brown");
        } else {
            $(`#${selectedSquare}`).css("background-color", "burlywood");
        }
    }
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

// Working
function selectSquare() {
    // Reset the color of the lsat selected piece
    resetSquare();

    // Find selected piece's position
    var tag = jQuery(this).attr('id');

    // Find selected piece's row and column
    var row = Math.floor(tag / 10);
    var column = (tag % 10);

    // Records the square of the selected piece with the first number as a letter
    // (a=1 - h=8)
    selectedSquare = `${String.fromCharCode(97 + column)}${row}`;

    // Updates the color of the selected piece's square
    $(`#${selectedSquare}`).css("background-color", "grey");

    // Check if selected position is a piece
    // Selected an piece square
    if (board[row][column][1] != "notPiece") {
        // Set the add button to gray to indicate adding to that spot is not possible
        $(`.move`).css("background-color", "blue");
        // Set the add button to gray to indicate adding to that spot is not possible
        $(`.add`).css("background-color", "gray");
        // Set the delete button to red to indicate deletion is possible
        $(`.delete`).css("background-color", "red");
        // Record the selected piece and set its square to yellow
        selectedPieceRow = row;
        selectedPieceColumn = column;

        // Selected a non-piece square
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

function getSquare() {
    // Find selected piece's position
    var tag = jQuery(this).attr('id');

    // Find selected piece's row and column
    var row = Math.floor(tag / 10);
    var column = (tag % 10);

    // Records the square of the selected piece with the first number as a letter
    // (a=1 - h=8)
    selectedSquare = `${String.fromCharCode(97 + column)}${row}`;
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
function movePiece() {
    // Checks if there is a selected piece
    if (selectedPieceRow != null && selectedPieceColumn != null) {

        // Highlight the selected piece and record its values
        $(`#${selectedSquare}`).css("background-color", "blue");
        var currentSquare = selectedSquare;
        var currentPieceRow = selectedPieceRow;
        var currentPieceColumn = selectedPieceColumn;

        // Wait for user to select a square and records its values as the selected square and piece
        $("body").on("click", ".square", getSquare);

        // If the selected square is a piece then delete is
        if (selectedPieceRow != null && selectedPieceColumn != null) {
            deletePieces();
        }

        board[selectedPieceRow][selectedPieceColumn] = ['empty.png', 'notPiece'];

        // Reset old square
        selectedSquare = currentSquare;
        resetSquare();

        // Unselect all squares
        selectedSquare = null;
        selectedPieceColumn = null;
        selectedPieceRow = null;

        // Update the board
        updateBoard();
    }
}

// To implement (next week)
function takePiece() {

}

// To implement (next week)
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
    $("body").on("click", ".move", movePiece);

}
$(document).ready(setup)

// Merge Pull Request Test Through GitHub