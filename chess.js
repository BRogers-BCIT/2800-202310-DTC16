// Define size of a chessboard
const boardSize = 8;

// Define the format for a square with no piece
const nonePiece = ["empty.png", "notPiece"];

// Create board variable
var board;

//
var blackPieces;
var whitePieces;
var blackPawns;
var whitePawns;

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

// Stores the FEN of the board
var currentFEN;


// Working
function updateBoard() {
    closeAddPieces();
    // Populate the board based on the board variable
    for (var row = (boardSize); row > 0; row--) {

        if (row % 2 == 0) {
            // Populate even row with even square coloring
            $(`#${row}`).html(`<th>  ${row} </th> 
                <td id="a${row}"> <button id="${row}0" class="square"> <img src="img/${board[row][0][1]}"> </button> </td> 
                <td id="b${row}" class="ds"> <button id="${row}1" class="square"> <img src="img/${board[row][1][1]}"> </button> </td> 
                <td id="c${row}"> <button id="${row}2" class="square"> <img src="img/${board[row][2][1]}"> </button> </td> 
                <td id="d${row}" class="ds"> <button id="${row}3" class="square"> <img src="img/${board[row][3][1]}"> </button> </td> 
                <td id="e${row}"> <button id="${row}4" class="square"> <img src="img/${board[row][4][1]}"> </button> </td> 
                <td id="f${row}" class="ds"> <button id="${row}5" class="square"> <img src="img/${board[row][5][1]}"> </button> </td> 
                <td id="g${row}"> <button id="${row}6" class="square"> <img src="img/${board[row][6][1]}"> </button> </td> 
                <td id="h${row}" class="ds"> <button id="${row}7" class="square"> <img src="img/${board[row][7][1]}"> </button> </td> `)

        } else {
            // Populate odd row with odd square coloring
            $(`#${row}`).html(`<th>  ${row} </th> 
                <td id="a${row}" class="ds"> <button id="${row}0" class="square"> <img src="img/${board[row][0][1]}"> </button> </td> 
                <td id="b${row}"> <button id="${row}1" class="square"> <img src="img/${board[row][1][1]}"> </button> </td> 
                <td id="c${row}" class="ds"> <button id="${row}2" class="square"> <img src="img/${board[row][2][1]}"> </button> </td> 
                <td id="d${row}"> <button id="${row}3" class="square"> <img src="img/${board[row][3][1]}"> </button> </td> 
                <td id="e${row}" class="ds"> <button id="${row}4" class="square"> <img src="img/${board[row][4][1]}"> </button> </td> 
                <td id="f${row}"> <button id="${row}5" class="square"> <img src="img/${board[row][5][1]}"> </button> </td> 
                <td id="g${row}" class="ds"> <button id="${row}6" class="square"> <img src="img/${board[row][6][1]}"> </button> </td> 
                <td id="h${row}"> <button id="${row}7" class="square"> <img src="img/${board[row][7][1]}"> </button> </td> `)
        }

    }
}

// Working
function updateButtons() {

    //Promotion
    if (selectedPiece == true && board[selectedPieceRow][selectedPieceColumn][2] == "pawn") {
        // Set the promotion button to full transparency to indicate promotion is possible
        $(`.promote`).css("opacity", "1");
    } else {
        // Set the promotion button to half transparency to indicate promotion is not possible
        $(`.promote`).css("opacity", "0.5");
    }

    // Selected a piece
    if (selectedPiece == true) {
        if (board[selectedPieceRow][selectedPieceColumn][2] != "king") {
            // Set the add button to full transparency to indicate moving from that spot is possible
            $(`.add`).css("opacity", "1");
        } else {
            // Set the add button to half transparency to indicate moving from that spot is not possible
            $(`.add`).css("opacity", "0.5");
        }
        // Set the add button to full transparency to indicate moving from that spot is possible
        $(`.move`).css("opacity", "1");
        // Set the delete button to full transparency to indicate deletion is possible
        $(`.delete`).css("opacity", "1");

        // Selected a non-piece square
    } else if (selectedPiece == false) {
        // Set the add button to full transparency to indicate it is possible
        $(`.add`).css("opacity", "1");
        // Set the delete and move button to half transparency to indicate it is not possible
        $(`.delete`).css("opacity", "0.5");
        $(`.move`).css("opacity", "0.5");

    } else {
        // Set all non-reset buttons to half transparency to indicate they are not possible
        $(`.delete`).css("opacity", "0.5");
        $(`.move`).css("opacity", "0.5");
        $(`.add`).css("opacity", "0.5");
    }

}

// Unimplemented
function clearBoard() {
    closeAddPieces();

    // Set all pieces to taken states except for the kings
    whitePieces = [["white", "wrook.png", "rook", "taken"], ["white", "wknight.png", "knight", "taken"],
    ["white", "wbishop.png", "c8", "bishop", "taken"], ["white", "wqueen.png", "d8", "queen", "taken"],
    ["white", "wking.png", "e8", "king", "taken"], ["white", "wbishop.png", "f8", "bishop", "king"],
    ["white", "wknight.png", "g8", "knight", "taken"], ["white", "wrook.png", "h8", "rook", "taken"]];

    blackPieces = [["black", "brook.png", "rook", "taken"], ["black", "bknight.png", "knight", "taken"],
    ["black", "bbishop.png", "bishop", "taken"], ["black", "bqueen.png", "d8", "queen", "taken"],
    ["black", "bking.png", "king", "king"], ["black", "bbishop.png", "f8", "bishop", "taken"],
    ["black", "bknight.png", "knight", "taken"], ["black", "brook.png", "h8", "rook", "taken"]];

    blackPawns = [["black", "bpawn.png", "pawn", "taken"], ["black", "bpawn.png", "pawn", "taken"],
    ["black", "bpawn.png", "pawn", "taken"], ["black", "bpawn.png", "pawn", "taken"],
    ["black", "bpawn.png", "pawn", "taken"], ["black", "bpawn.png", "pawn", "taken"],
    ["black", "bpawn.png", "pawn", "taken"], ["black", "bpawn.png", "pawn", "taken"]];

    whitePawns = [["white", "wpawn.png", "pawn", "taken"], ["white", "wpawn.png", "pawn", "taken"],
    ["white", "wpawn.png", "pawn", "taken"], ["white", "wpawn.png", "pawn", "taken"],
    ["white", "wpawn.png", "pawn", "taken"], ["white", "wpawn.png", "pawn", "taken"],
    ["white", "wpawn.png", "pawn", "taken"], ["white", "wpawn.png", "pawn", "taken"]];

    // Set the chessboard to a cleared position
    board = {
        1: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], blackPieces[4], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        2: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        3: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        4: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        5: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        6: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        7: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        8: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], whitePieces[4], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
    };

    // Reset all variables then set taken pieces to 30 (all but kings)
    resetVariables();
    deletedPieces = 0;

    // Update the board
    updateBoard();
    updateButtons();
}

// Working
function resetBoard() {
    closeAddPieces();

    // Set all pieces to original states
    whitePieces = [["white", "wrook.png", "rook", "on board"], ["white", "wknight.png", "knight", "on board"],
    ["white", "wbishop.png", "bishop", "on board"], ["white", "wqueen.png", "queen", "on board"],
    ["white", "wking.png", "king", "on board"], ["white", "wbishop.png", "bishop", "king"],
    ["white", "wknight.png", "knight", "on board"], ["white", "wrook.png", "rook", "on board"]];

    blackPieces = [["black", "brook.png", "rook", "on board"], ["black", "bknight.png", "knight", "on board"],
    ["black", "bbishop.png", "bishop", "on board"], ["black", "bqueen.png", "queen", "on board"],
    ["black", "bking.png", "king", "king"], ["black", "bbishop.png", "bishop", "on board"],
    ["black", "bknight.png", "knight", "on board"], ["black", "brook.png", "rook", "on board"]];

    blackPawns = [["black", "bpawn.png", "pawn", "on board"], ["black", "bpawn.png", "pawn", "on board"],
    ["black", "bpawn.png", "pawn", "on board"], ["black", "bpawn.png", "pawn", "on board"],
    ["black", "bpawn.png", "pawn", "on board"], ["black", "bpawn.png", "pawn", "on board"],
    ["black", "bpawn.png", "pawn", "on board"], ["black", "bpawn.png", "pawn", "on board"]];

    whitePawns = [["white", "wpawn.png", "pawn", "on board"], ["white", "wpawn.png", "pawn", "on board"],
    ["white", "wpawn.png", "pawn", "on board"], ["white", "wpawn.png", "pawn", "on board"],
    ["white", "wpawn.png", "pawn", "on board"], ["white", "wpawn.png", "pawn", "on board"],
    ["white", "wpawn.png", "pawn", "on board"], ["white", "wpawn.png", "pawn", "on board"]];

    // Set the chessboard to a starting position
    board = {
        1: [whitePieces[0], whitePieces[1], whitePieces[2], whitePieces[3], whitePieces[4], whitePieces[5], whitePieces[6], whitePieces[7]],
        2: [whitePawns[0], whitePawns[1], whitePawns[2], whitePawns[3], whitePawns[4], whitePawns[5], whitePawns[6], whitePawns[7]],
        3: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        4: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        5: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        6: [['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece'], ['', 'empty.png', 'notPiece']],
        7: [blackPawns[0], blackPawns[1], blackPawns[2], blackPawns[3], blackPawns[4], blackPawns[5], blackPawns[6], blackPawns[7]],
        8: [blackPieces[0], blackPieces[1], blackPieces[2], blackPieces[3], blackPieces[4], blackPieces[5], blackPieces[6], blackPieces[7]]
    };

    // Reset all variables
    resetVariables();
    deletedPieces = 0;

    // Update the board
    updateBoard();
    updateButtons();

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
            $(`#${selectedSquare}`).css("background-color", "tan");
        }

    }
}

// Working
function resetVariables() {
    selectedPiece = null;
    selectedSquare = null;
    selectedPieceRow = null;
    selectedPieceColumn = null;
    movePieceRow = null;
    movePieceColumn = null;
    movePieceSquare = null;
    moving = false;
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
    updateButtons();
}

// Working
function selectedSquareCheck() {

    // Check if selected position is a piece and sets the values
    if (board[selectedPieceRow][selectedPieceColumn][2] != "notPiece") {
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
function promotePawn() {
    var type = jQuery(this).attr('id');
    if (selectedPiece == true && board[selectedPieceRow][selectedPieceColumn][2] == "pawn") {
        if (board[selectedPieceRow][selectedPieceColumn][0] == "black") {
            console.log("black")
            board[selectedPieceRow][selectedPieceColumn][1] = `bp${type}.png`;
        }
        if (board[selectedPieceRow][selectedPieceColumn][0] == "white") {
            board[selectedPieceRow][selectedPieceColumn][1] = `wp${type}.png`;
        }
    }
    resetVariables();
    updateBoard();
    updateButtons();
}

// Working
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

// Working
function movePieceMove() {
    if (board[selectedPieceRow][selectedPieceColumn][3] != 'king') {
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
    } else {
        resetVariables();
        updateBoard();
        updateButtons();
    }
}

// Working
function deletePiece() {

    // Checks if there is a selected piece
    if (selectedPiece == true && board[selectedPieceRow][selectedPieceColumn][3] != 'king') {

        // Set the pieces taken value to taken and empty the square in the board
        board[selectedPieceRow][selectedPieceColumn][3] = 'taken';
        board[selectedPieceRow][selectedPieceColumn] = ['', 'empty.png', 'notPiece'];

        // Add one to the deleted pieces counter
        deletedPieces += 1;
        console.log(deletedPieces)
    } else {
        console.log("Cannot take king")
    }

    // Reset the selected piece
    resetVariables();

    // Update the board
    updateBoard();
    updateButtons();

};


// Working
function openAddPieces() {

    // Checks if there is a selected square to add to
    if (selectedSquare != null) {

        // Set the add piece menu to visible and the board to half transparency
        $(`#addPieceMenu`).css("display", "block");
        $(`#whiteBoard`).css("opacity", "0.5");
        $(`#blackBoard`).css("opacity", "0.5");
        $(`#buttons`).css("opacity", "0.5");
        $(`#featureLinks`).css("opacity", "0.5");

        // For each black piece, add a button with the piece's image if it has been taken
        var takenBlackPieces = 8;
        for (var blackPiece = 0; blackPiece < 8; blackPiece++) {
            if (blackPieces[blackPiece][3] == "taken") {
                $(`#blackPieces`).append(`<button class="blackPiece" id="${blackPiece}"><img src="img/${blackPieces[blackPiece][1]}" class="piece" id="${blackPiece}"></button>`);
            } else {
                takenBlackPieces -= 1;
            }
        }

        // If not black pieces have been taken then display none
        if (takenBlackPieces == 0) {
            $(`#blackPieces`).append(`<h3>&nbsp;&nbsp;&nbsp;&nbsp;None</h3>`);
        }

        // For each white piece, add a button with the piece's image if it has been taken
        var takenWhitePieces = 8;
        for (var whitePiece = 0; whitePiece < 8; whitePiece++) {
            if (whitePieces[whitePiece][3] == "taken") {
                $(`#whitePieces`).append(`<button class="whitePiece" id="${whitePiece}"><img src="img/${whitePieces[whitePiece][1]}" class="piece" id="${whitePiece}"></button>`);
            } else {
                takenWhitePieces -= 1;
            }
        }

        // If not white pieces have been taken then display none
        if (takenWhitePieces == 0) {
            $(`#whitePieces`).append(`<h3>&nbsp;&nbsp;&nbsp;&nbsp;None</h3>`);
        }

        // For each black pawn, add a button with the piece's image if it has been taken
        var takenBlackPawns = 8;
        for (var blackPawn = 0; blackPawn < 8; blackPawn++) {
            if (blackPawns[blackPawn][3] == "taken") {
                $(`#blackPawns`).append(`<button class="blackPawn" id="${blackPawn}"><img src="img/${blackPawns[blackPawn][1]}" class="piece" id="${blackPawn}"></button>`);
            } else {
                takenBlackPawns -= 1;
            }
        }

        // If not black pawns have been taken then display none
        if (takenBlackPawns == 0) {
            $(`#blackPawns`).append(`<h3>&nbsp;&nbsp;&nbsp;&nbsp;None</h3>`);
        }

        // For each white pawn, add a button with the piece's image if it has been taken
        var takenWhitePawns = 8;
        for (var whitePawn = 0; whitePawn < 8; whitePawn++) {
            if (whitePawns[whitePawn][3] == "taken") {
                $(`#whitePawns`).append(`<button class="whitePawn" id="${whitePawn}"><img src="img/${whitePawns[whitePawn][1]}" class="piece" id="${whitePawn}"></button>`);
            } else {
                takenWhitePawns -= 1;
            }
        }

        // If not white pawns have been taken then display none
        if (takenWhitePawns == 0) {
            $(`#whitePawns`).append(`<h3>&nbsp;&nbsp;&nbsp;&nbsp;None</h3>`);
        }
    }
};

// Working
function addPieceToBoard() {
    if (board[selectedPieceRow][selectedPieceColumn][3] != 'king') {
        // Get the piece type from button class and index from button id
        var pieceType = jQuery(this).attr('class');
        var pieceIndex = jQuery(this).attr('id');

        // If moving to a square with a piece then delete it
        if (selectedPiece == true) {
            deletePiece();
        }

        // For each piece type check if the piece to add is that type
        // Them set it to not be taken and add it to the board
        if (pieceType == "blackPiece") {
            blackPieces[pieceIndex][3] = "on board";
            board[selectedPieceRow][selectedPieceColumn] = blackPieces[pieceIndex]
        } else if (pieceType == "whitePiece") {
            whitePieces[pieceIndex][3] = "on board";
            board[selectedPieceRow][selectedPieceColumn] = whitePieces[pieceIndex]
        } else if (pieceType == "blackPawn") {
            blackPawns[pieceIndex][3] = "on board";
            board[selectedPieceRow][selectedPieceColumn] = blackPawns[pieceIndex]
        } else if (pieceType == "whitePawn") {
            whitePawns[pieceIndex][3] = "on board";
            board[selectedPieceRow][selectedPieceColumn] = whitePawns[pieceIndex]
        }
    }
    // Update the board with new pieces
    updateBoard();
    updateButtons();

}

// Working
function closeAddPieces() {

    // Reset the add piece menu for next call
    $(`#blackPieces`).html(`<h3>&nbsp;&nbsp;Black Pieces</h3>`);
    $(`#blackPawns`).html(`<h3>&nbsp;&nbsp;Black Pawns</h3>`);
    $(`#whitePieces`).html(`<h3>&nbsp;&nbsp;White Pieces</h3>`);
    $(`#whitePawns`).html(`<h3>&nbsp;&nbsp;White Pawns</h3>`);

    // Hide the add piece menu and set the board back to normal
    $(`#addPieceMenu`).css("display", "none");
    $(`#whiteBoard`).css("opacity", "1");
    $(`#blackBoard`).css("opacity", "1");
    $(`#buttons`).css("opacity", "1");

}



// To implement (Analyze)
function openAnalyzeMenu() {
}

// To implement (Analyze)
function swapPlayingColor() {
}

// To implement (Analyze)
function updatedAvailableCastles() {
}

// To implement (Analyze)
function boardToFEN() {
}

// To implement (Analyze)
function closeAnalyzeMenu() {
}




// To implement (Save)
function openSaveMenu() {
    // Set the add piece menu to visible and the board to half transparency
    $(`#saveBoardMenu`).css("display", "block");
    $(`#whiteBoard`).css("opacity", "0.5");
    $(`#blackBoard`).css("opacity", "0.5");
    $(`#buttons`).css("opacity", "0.5");
    $(`#featureLinks`).css("opacity", "0.5");
}

// To implement (Save)
function saveBoard() {
}

// To implement (Save)
function closeSaveMenu() {
}



// To update as needed
setup = function () {

    // Reset the board and populate it
    resetBoard();
    updateBoard();

    // Select a square
    $("body").on("click", ".square", selectSquare);

    // Basic board functions
    $("body").on("click", ".move", movePieceSelect);
    $("body").on("click", ".delete", deletePiece);
    $("body").on("click", ".reset", resetBoard);

    // Open and Close add menu buttons
    $("body").on("click", ".add", openAddPieces);
    $("body").on("click", ".closeAdd", closeAddPieces);

    // Add piece buttons
    $("body").on("click", ".blackPiece", addPieceToBoard);
    $("body").on("click", ".blackPawn", addPieceToBoard);
    $("body").on("click", ".whitePiece", addPieceToBoard);
    $("body").on("click", ".whitePawn", addPieceToBoard);

    // Promote pawn button class
    $("body").on("click", ".promote", promotePawn);

    // Feature link buttons (Save)
    $("body").on("click", ".saveBoard", openSaveMenu);
    $("body").on("click", ".saveToUser", saveBoard);
    $("body").on("click", ".closeSave", closeSaveMenu);

    // Feature link buttons (Analysis)
    $("body").on("click", ".analyzeBoard", openAnalyzeMenu);
    $("body").on("click", ".castles", updatedAvailableCastles);
    $("body").on("click", ".swapColor", swapPlayingColor);
    $("body").on("click", ".goToAnalyze", boardToFEN);
    $("body").on("click", ".closeAnalyze", closeAnalyzeMenu);

    // Not Currently used
    $("body").on("click", ".clear", clearBoard);
}
$(document).ready(setup)