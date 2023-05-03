const boardSize = 8;
// Formatting = array of pieces starting from left to right
// Position, piece, status
var blackPieces = [["a8", "rook", "on board"], ["b8", "knight", "on board"],
["c8", "bishop", "on board"], ["d8", "queen", "on board"],
["e8", "king", "on board"], ["f8", "bishop", "on board"],
["g8", "knight", "on board"], ["h8", "rook", "on board"]];

var whitePieces = [["a8", "rook", "on board"], ["b8", "knight", "on board"],
["c8", "bishop", "on board"], ["d8", "queen", "on board"],
["e8", "king", "on board"], ["f8", "bishop", "on board"],
["g8", "knight", "on board"], ["h8", "rook", "on board"]];


// Formatting = array of pawns starting from left to right
// Position, promoted to, status
var blackPawns = [["a7", "null", "on board"], ["b7", "null", "on board"],
["c7", "null", "on board"], ["d7", "null", "on board"],
["e7", "null", "on board"], ["f7", "null", "on board"],
["g7", "null", "on board"], ["h7", "null", "on board"]];

var whitePawns = [["a2", "null", "on board"], ["b2", "null", "on board"],
["c2", "null", "on board"], ["d2", "null", "on board"],
["e2", "null", "on board"], ["f2", "null", "on board"],
["g2", "null", "on board"], ["h2", "null", "on board"]];

// Formatting = rows starting from top (8) to bottom (1)
var board = {
    1: [blackPieces[0], blackPieces[1], blackPieces[2], blackPieces[3], blackPieces[4], blackPieces[5], blackPieces[6], blackPieces[7]],
    2: [blackPawns[0], blackPawns[1], blackPawns[2], blackPawns[3], blackPawns[4], blackPawns[5], blackPawns[6], blackPawns[7]],
    3: [['test'], ['test'], ['test'], ['test'], ['test'], ['test'], ['test'], ['test']],
    4: [['test'], ['test'], ['test'], ['test'], ['test'], ['test'], ['test'], ['test']],
    5: [['test'], ['test'], ['test'], ['test'], ['test'], ['test'], ['test'], ['test']],
    6: [['test'], ['test'], ['test'], ['test'], ['test'], ['test'], ['test'], ['test']],
    7: [whitePawns[0], whitePawns[1], whitePawns[2], whitePawns[3], whitePawns[4], whitePawns[5], whitePawns[6], whitePawns[7]],
    8: [whitePieces[0], whitePieces[1], whitePieces[2], whitePieces[3], whitePieces[4], whitePieces[5], whitePieces[6], whitePieces[7]]
};




setup = function () {
    for (var row = 8; row > 0; row--) {
        if (row % 2 == 0) {
            $(`#${row}`).html(`<th> ${row} </th>
                <td id="a${row}">${board[row][0][0]}</td>
                <td id="b${row}" class="ds">${board[row][1][0]}</td>
                <td id="c${row}">${board[row][2][0]}</td>
                <td id="d${row}" class="ds">${board[row][3][0]}</td>
                <td id="e${row}">${board[row][4][0]}</td>
                <td id="f${row}" class="ds">${board[row][5][0]}</td>
                <td id="g${row}">${board[row][6][0]}</td>
                <td id="h${row}" class="ds">${board[row][7][0]}</td>`)
        } else {
            $(`#${row}`).html(`<th> ${row} </th>
                <td id="a${row}" class="ds">${board[row][0][0]}</td>
                <td id="b${row}">${board[row][1][0]}</td>
                <td id="c${row}" class="ds">${board[row][2][0]}</td>
                <td id="d${row}">${board[row][3][0]}</td>
                <td id="e${row}" class="ds">${board[row][4][0]}</td>
                <td id="f${row}">${board[row][5][0]}</td>
                <td id="g${row}" class="ds">${board[row][6][0]}</td>
                <td id="h${row}">${board[row][7][0]}</td>`)
        }
    }
}
$(document).ready(setup)