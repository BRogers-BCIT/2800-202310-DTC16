const boardSize = 8;
// Formatting = array of pieces starting from left to right
// Position, piece, status
var whitePieces = [["wrook.png", "null", "a8", "rook", "on board"], ["wknight.png", "null", "b8", "knight", "on board"],
["wbishop.png", "null", "c8", "bishop", "on board"], ["wqueen.png", "null", "d8", "queen", "on board"],
["wking.png", "null", "e8", "king", "on board"], ["wbishop.png", "null", "f8", "bishop", "on board"],
["wknight.png", "null", "g8", "knight", "on board"], ["wrook.png", "null", "h8", "rook", "on board"]];

var blackPieces = [["brook.png", "null", "a8", "rook", "on board"], ["bknight.png", "null", "b8", "knight", "on board"],
["bbishop.png", "null", "c8", "bishop", "on board"], ["bqueen.png", "null", "d8", "queen", "on board"],
["bking.png", "null", "e8", "king", "on board"], ["bbishop.png", "null", "f8", "bishop", "on board"],
["bknight.png", "null", "g8", "knight", "on board"], ["brook.png", "null", "h8", "rook", "on board"]];


// Formatting = array of pawns starting from left to right
// Position, promoted to, status
var blackPawns = [["bpawn.png", "null", "a7", "null", "null"], ["bpawn.png", "null", "b7", "null", "null"],
["bpawn.png", "null", "c7", "null", "nujpgll"], ["bpawn.png", "null", "d7", "null", "null"],
["bpawn.png", "null", "e7", "null", "null"], ["bpawn.png", "null", "f7", "null", "null"],
["bpawn.png", "null", "g7", "null", "null"], ["bpawn.png", "null", "h7", "null", "null"],];

var whitePawns = [["wpawn.png", "null", "a2", "null", "on board"], ["wpawn.png", "null", "b2", "null", "on board"],
["wpawn.png", "null", "c2", "null", "on board"], ["wpawn.png", "null", "d2", "null", "on board"],
["wpawn.png", "null", "e2", "null", "on board"], ["wpawn.png", "null", "f2", "null", "on board"],
["wpawn.png", "null", "g2", "null", "on board"], ["wpawn.png", "null", "h2", "null", "on board"]];

// Formatting = rows starting from top (8) to bottom (1)
var board = {
    8: [blackPieces[0], blackPieces[1], blackPieces[2], blackPieces[3], blackPieces[4], blackPieces[5], blackPieces[6], blackPieces[7]],
    7: [blackPawns[0], blackPawns[1], blackPawns[2], blackPawns[3], blackPawns[4], blackPawns[5], blackPawns[6], blackPawns[7]],
    6: [['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png']],
    5: [['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png']],
    4: [['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png']],
    3: [['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png'], ['empty.png']],
    2: [whitePawns[0], whitePawns[1], whitePawns[2], whitePawns[3], whitePawns[4], whitePawns[5], whitePawns[6], whitePawns[7]],
    1: [whitePieces[0], whitePieces[1], whitePieces[2], whitePieces[3], whitePieces[4], whitePieces[5], whitePieces[6], whitePieces[7]]
};




setup = function () {
    for (var row = 8; row > 0; row--) {
        if (row % 2 == 0) {
            $(`#${row}`).html(`<th> ${row} </th>
                <td id="a${row}"><button class="piece"><img src="img/${board[row][0][0]}"></button></td>
                <td id="b${row}" class="ds"><button class="piece"><img src="img/${board[row][1][0]}"></button></td>
                <td id="c${row}"><button class="piece"><img src="img/${board[row][2][0]}"></button></td>
                <td id="d${row}" class="ds"><button class="piece"><img src="img/${board[row][3][0]}"></button></td>
                <td id="e${row}"><button class="piece"><img src="img/${board[row][4][0]}"></button></td>
                <td id="f${row}" class="ds"><button class="piece"><img src="img/${board[row][5][0]}"></button></td>
                <td id="g${row}"><button class="piece"><img src="img/${board[row][6][0]}"></button></td>
                <td id="h${row}" class="ds"><button class="piece"><img src="img/${board[row][7][0]}"></button></td>`)
        } else {
            $(`#${row}`).html(`<th> ${row} </th>
                <td id="a${row}" class="ds"><button class="piece"><img src="img/${board[row][0][0]}"></button></td>
                <td id="b${row}"><button class="piece"><img src="img/${board[row][1][0]}"></button></td>
                <td id="c${row}" class="ds"><button class="piece"><img src="img/${board[row][2][0]}"></button></td>
                <td id="d${row}"><button class="piece"><img src="img/${board[row][3][0]}"></button></td>
                <td id="e${row}" class="ds"><button class="piece"><img src="img/${board[row][4][0]}"></button></td>
                <td id="f${row}"><button class="piece"><img src="img/${board[row][5][0]}"></button></td>
                <td id="g${row}" class="ds"><button class="piece"><img src="img/${board[row][6][0]}"></button></td>
                <td id="h${row}"><button class="piece"><img src="img/${board[row][7][0]}"></button></td>`)
        }
    }
}
$(document).ready(setup)