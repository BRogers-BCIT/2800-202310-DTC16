const boardSize = 8;
// Formatting = array of pieces starting from left to right
// image, selected, position, piece, status
var whitePieces = [["wrook.png", "null", "a8", "rook", "on board"], ["wknight.png", "null", "b8", "knight", "on board"],
["wbishop.png", "null", "c8", "bishop", "on board"], ["wqueen.png", "null", "d8", "queen", "on board"],
["wking.png", "null", "e8", "king", "on board"], ["wbishop.png", "null", "f8", "bishop", "on board"],
["wknight.png", "null", "g8", "knight", "on board"], ["wrook.png", "null", "h8", "rook", "on board"]];

var blackPieces = [["brook.png", "null", "a8", "rook", "on board"], ["bknight.png", "null", "b8", "knight", "on board"],
["bbishop.png", "null", "c8", "bishop", "on board"], ["bqueen.png", "null", "d8", "queen", "on board"],
["bking.png", "null", "e8", "king", "on board"], ["bbishop.png", "null", "f8", "bishop", "on board"],
["bknight.png", "null", "g8", "knight", "on board"], ["brook.png", "null", "h8", "rook", "on board"]];


// Formatting = array of pawns starting from left to right
// image, selected, position, promoted to, status
var blackPawns = [["bpawn.png", "null", "a7", "pawn", "on board"], ["bpawn.png", "null", "b7", "pawn", "on board"],
["bpawn.png", "null", "c7", "pawn", "on board"], ["bpawn.png", "null", "d7", "pawn", "on board"],
["bpawn.png", "null", "e7", "pawn", "on board"], ["bpawn.png", "null", "f7", "pawn", "on board"],
["bpawn.png", "null", "g7", "pawn", "on board"], ["bpawn.png", "null", "h7", "pawn", "on board"],];

var whitePawns = [["wpawn.png", "null", "a2", "null", "on board"], ["wpawn.png", "null", "b2", "null", "on board"],
["wpawn.png", "null", "c2", "pawn", "on board"], ["wpawn.png", "null", "d2", "pawn", "on board"],
["wpawn.png", "null", "e2", "pawn", "on board"], ["wpawn.png", "null", "f2", "pawn", "on board"],
["wpawn.png", "null", "g2", "pawn", "on board"], ["wpawn.png", "null", "h2", "pawn", "on board"]];

// Formatting = rows starting from bottom (0) to top (7)
var board = {
    1: [whitePieces[0], whitePieces[1], whitePieces[2], whitePieces[3], whitePieces[4], whitePieces[5], whitePieces[6], whitePieces[7]],
    2: [whitePawns[0], whitePawns[1], whitePawns[2], whitePawns[3], whitePawns[4], whitePawns[5], whitePawns[6], whitePawns[7]],
    3: [['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece']],
    4: [['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece']],
    5: [['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece']],
    6: [['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece'], ['empty.png', 'notPiece']],
    7: [blackPawns[0], blackPawns[1], blackPawns[2], blackPawns[3], blackPawns[4], blackPawns[5], blackPawns[6], blackPawns[7]],
    8: [blackPieces[0], blackPieces[1], blackPieces[2], blackPieces[3], blackPieces[4], blackPieces[5], blackPieces[6], blackPieces[7]]
};

var selectedPiece;
var selectedPosition;

function selectPiece() {
    // Reset color of previous selected piece
    if (selectedPosition != null) {
        // Find square color
        var squareColor = jQuery(`#${selectedPosition}`).attr('class');
        // Reset color
        if (squareColor == 'ds') {
            $(`#${selectedPosition}`).css("background-color", "brown");
        } else {
            $(`#${selectedPosition}`).css("background-color", "burlywood");
        }
    }
    // Find selected piece's position
    tag = jQuery(this).attr('id');
    selectedPosition = tag;
    // Find selected piece's row and column (as both letter and number)
    var row = Math.floor(tag / 10);
    var column = (tag % 10);
    var columnLetter = String.fromCharCode(97 + column);
    // Check if selected position is a piece
    if (board[row][column][1] != "notPiece") {
        // Record the selected piece and set its square to yellow
        selectedPiece = board[row][column];
        selectedPosition = `${columnLetter}${row}`;
        $(`#${selectedPosition}`).css("background-color", "grey");
    } else {
        // Reset selected piece and position
        selectedPiece = null;
        selectedPosition = null;
    }
}


setup = function () {
    for (var row = (boardSize); row > 0; row--) {
        if (row % 2 == 0) {
            $(`#${row}`).html(`<th>  ${row} </th> 
                <td id="a${row}"> <button id="${row}0" class="piece"> <img src="img/${board[row][0][0]}"> </button> </td> 
                <td id="b${row}" class="ds"> <button id="${row}1" class="piece"> <img src="img/${board[row][1][0]}"> </button> </td> 
                <td id="c${row}"> <button id="${row}2" class="piece"> <img src="img/${board[row][2][0]}"> </button> </td> 
                <td id="d${row}" class="ds"> <button id="${row}3" class="piece"> <img src="img/${board[row][3][0]}"> </button> </td> 
                <td id="e${row}"> <button id="${row}4" class="piece"> <img src="img/${board[row][4][0]}"> </button> </td> 
                <td id="f${row}" class="ds"> <button id="${row}5" class="piece"> <img src="img/${board[row][5][0]}"> </button> </td> 
                <td id="g${row}"> <button id="${row}6" class="piece"> <img src="img/${board[row][6][0]}"> </button> </td> 
                <td id="h${row}" class="ds"> <button id="${row}7" class="piece"> <img src="img/${board[row][7][0]}"> </button> </td> `)
        } else {
            $(`#${row}`).html(`<th>  ${row} </th> 
                <td id="a${row}" class="ds"> <button id="${row}0" class="piece"> <img src="img/${board[row][0][0]}"> </button> </td> 
                <td id="b${row}"> <button id="${row}1" class="piece"> <img src="img/${board[row][1][0]}"> </button> </td> 
                <td id="c${row}" class="ds"> <button id="${row}2" class="piece"> <img src="img/${board[row][2][0]}"> </button> </td> 
                <td id="d${row}"> <button id="${row}3" class="piece"> <img src="img/${board[row][3][0]}"> </button> </td> 
                <td id="e${row}" class="ds"> <button id="${row}4" class="piece"> <img src="img/${board[row][4][0]}"> </button> </td> 
                <td id="f${row}"> <button id="${row}5" class="piece"> <img src="img/${board[row][5][0]}"> </button> </td> 
                <td id="g${row}" class="ds"> <button id="${row}6" class="piece"> <img src="img/${board[row][6][0]}"> </button> </td> 
                <td id="h${row}"> <button id="${row}7" class="piece"> <img src="img/${board[row][7][0]}"> </button> </td> `)
        }
    }

    $("body").on("click", ".piece", selectPiece);
}
$(document).ready(setup)