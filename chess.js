// Define size of a chessboard
const boardSize = 8;

// Define the format for a square with no piece
const nonePiece = ["empty.png", "notPiece"];

// Create board variable
var board;

// Array row and column and HTML square of a selected piece (Select / Delete)
var selectedPieceRow;
var selectedPieceColumn;
var selectedSquare;

// Array row and column and HTML square of a piece selected to be moved (Move)
var movePieceRow;
var movePieceColumn;
var movePieceSquare;

// Whether or not a piece is selected (Select)
var selectedPiece = null;

// Number of deleted pieces (used to track adding pieces) (Delete)
var deletedPieces = 0;

// Tracks if the user is moving or selecting a piece (Move / Select)
var moving = false;

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

    // Reset all variables
    selectedPieceRow = null;
    selectedPieceColumn = null;
    deletedPieces = 0;

    // Reset colors of buttons
    $(`.add`).css("background-color", "gray");
    $(`.delete`).css("background-color", "gray");

    // Update the board
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
function selectSquare() {
    // Reset the color of the last selected piece
    resetSquare();

    // Find selected piece's position
    var tag = jQuery(this).attr('id');

    // Find selected piece's row and column
    var row = Math.floor(tag / 10);
    var column = (tag % 10);

    // Records the square of the selected piece with the first number as a letter
    // (a=1 - h=8)
    selectedSquare = `${String.fromCharCode(97 + column)}${row}`;
    selectedPieceRow = row;
    selectedPieceColumn = column;

    // Set the selected square to gray
    $(`#${selectedSquare}`).css("background-color", "gray");

    if (moving == false) {
        // If the player is not moving a piece then call piece selection
        selectedSquareCheck();
    } else {
        // If the player is moving a piece then call piece movement
        movePieceMove();
    }

    // Set the movement to false
    moving = false;

}

// Working
function selectedSquareCheck() {

    // Check if selected position is a piece and sets the values
    if (board[selectedPieceRow][selectedPieceColumn][1] != "notPiece") {
        // Selected a piece square then set the selected piece to true
        selectedPiece = true;
    } else {
        // Selected a non-piece square then set the selected piece to false
        selectedPiece = false;
    }

    // update the buttons
    updateButtons();

}

// Working
function updateButtons() {

    // Selected a piece
    if (selectedPiece == true) {

        // Set the add button to gray to indicate adding to that spot is not possible
        $(`.move`).css("background-color", "blue");
        // Set the add button to gray to indicate adding to that spot is not possible
        $(`.add`).css("background-color", "gray");
        // Set the delete button to red to indicate deletion is possible
        $(`.delete`).css("background-color", "red");

        // Selected a non-piece square
    } else if (selectedPiece == false) {

        // Check if there are any deleted pieces
        if (deletedPieces > 0) {
            // Set the add button to green to indicate adding to that spot is possible
            $(`.add`).css("background-color", "green");
        }

        // Set the delete and move button to gray to indicate it is not possible
        $(`.delete`).css("background-color", "gray"); e
        $(`.move`).css("background-color", "gray");

    } else {
        // Set all non-reset buttons to gray to indicate they are not possible
        $(`.add`).css("background-color", "gray");
        $(`.delete`).css("background-color", "gray");
        $(`.move`).css("background-color", "gray");
    }

}

// In progress
function movePieceSelect() {

    // Checks if there is a selected piece
    if (selectedPiece == true) {

        // Highlight the selected piece and record its values
        $(`#${selectedSquare}`).css("background-color", "blue");
        movePieceSquare = selectedSquare;
        movePieceRow = selectedPieceRow;
        movePieceColumn = selectedPieceColumn;

        // Wait for user to select a square and records its values as the selected square and piece
        moving = true;

    }
}

// In progress
function movePieceMove() {

    // If the selected square is a piece then delete it
    if (selectedPiece == true) {
        deletePiece();
    }

    // Move the piece to the selected square
    board[selectedPieceRow][selectedPieceColumn] = board[movePieceRow][movePieceColumn];

    // Set the selected square to the old square and delete it then reset the old square
    selectedSquare = movePieceSquare;
    selectedPieceRow = movePieceRow;
    selectedPieceColumn = movePieceColumn;
    deletePiece();
    resetSquare();

    // Unselect all squares
    selectedPiece = null;

    // Update the board
    updateBoard();
    updateButtons();

}

// Working
function deletePiece() {
    // Checks if there is a selected piece
    if (selectedPiece == true) {

        // Set the pieces taken value to taken and empty the square in the board
        board[selectedPieceRow][selectedPieceColumn][2] = 'taken';
        board[selectedPieceRow][selectedPieceColumn] = ['empty.png', 'notPiece'];

        // Add one to the deleted pieces counter
        deletedPieces += 1;
    }
    // Update the board
    updateBoard();
};

// To implement (next week)
function addPieces() {
    if (deletePieces > 0 && (selectedPiece == false)) {
    }
};

// To update as needed
setup = function () {
    console.log(moving)
    // Reset the board and populate it
    resetBoard();
    updateBoard();

    // Add event listeners
    $("body").on("click", ".square", selectSquare);
    $("body").on("click", ".reset", resetBoard);
    $("body").on("click", ".delete", deletePiece);
    $("body").on("click", ".add", addPieces);
    $("body").on("click", ".move", movePieceSelect);


}
$(document).ready(setup)

// Merge Pull Request Test Through GitHub