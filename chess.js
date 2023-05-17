// Create RegEx for FEN validation
const FENRegEx = /^([rnbqkpRNBQKP1-8]{1,8}\/){7}[rnbqkpRNBQKP1-8]{1,8} [wb] [KQkq-]{1,4} ([a-h][3-6]|-) \d+ \d+$/;

// Define size of a chessboard
const boardSize = 8;

// Define the format for a square with no piece
const nonePiece = ["empty.png", "notPiece"];

// Create board variable
var board;

// FEN variable
var FEN;
var currentColor = "w";
var currentColorFull = "White";
var castleWhiteKings = "K";
var castleWhiteQueens = "Q";
var castleBlackKings = "k";
var castleBlackQueens = "q";

// Create piece variables
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


// Prevents buttons from working whole menus are open
var menuOpen = false;


// Working
function updateBoard() {
    closeAddPieces();
    // Populate the board based on the board variable
    for (var row = (boardSize); row > 0; row--) {

        if (row % 2 == 0) {
            // Populate even row with even square coloring
            $(`#${row}`).html(`
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
            $(`#${row}`).html(`
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
    if (selectedPiece == true && (board[selectedPieceRow][selectedPieceColumn][2] == "p" || board[selectedPieceRow][selectedPieceColumn][2] == "P")) {
        // Set the promotion button to full transparency to indicate promotion is possible
        $(`.promote`).css("opacity", "1");
    } else {
        // Set the promotion button to half transparency to indicate promotion is not possible
        $(`.promote`).css("opacity", "0.5");
    }

    // Selected a piece
    if (selectedPiece == true) {
        if (board[selectedPieceRow][selectedPieceColumn][2] != "k" && board[selectedPieceRow][selectedPieceColumn][2] != "K") {
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
    if (menuOpen == false) {
        closeAddPieces();

        // Set all pieces to original states
        whitePieces = [["white", "wrook.png", "R", "on board"], ["white", "wknight.png", "N", "on board"],
        ["white", "wbishop.png", "B", "on board"], ["white", "wqueen.png", "Q", "on board"],
        ["white", "wking.png", "K", "on board"], ["white", "wbishop.png", "B", "on board"],
        ["white", "wknight.png", "N", "on board"], ["white", "wrook.png", "R", "on board"]];

        blackPieces = [["black", "brook.png", "r", "on board"], ["black", "bknight.png", "n", "on board"],
        ["black", "bbishop.png", "b", "on board"], ["black", "bqueen.png", "q", "on board"],
        ["black", "bking.png", "k", "king"], ["black", "bbishop.png", "b", "on board"],
        ["black", "bknight.png", "n", "on board"], ["black", "brook.png", "r", "on board"]];

        blackPawns = [["black", "bpawn.png", "p", "on board"], ["black", "bpawn.png", "p", "on board"],
        ["black", "bpawn.png", "p", "on board"], ["black", "bpawn.png", "p", "on board"],
        ["black", "bpawn.png", "p", "on board"], ["black", "bpawn.png", "p", "on board"],
        ["black", "bpawn.png", "p", "on board"], ["black", "bpawn.png", "p", "on board"]];

        whitePawns = [["white", "wpawn.png", "P", "on board"], ["white", "wpawn.png", "P", "on board"],
        ["white", "wpawn.png", "P", "on board"], ["white", "wpawn.png", "P", "on board"],
        ["white", "wpawn.png", "P", "on board"], ["white", "wpawn.png", "P", "on board"],
        ["white", "wpawn.png", "P", "on board"], ["white", "wpawn.png", "P", "on board"]];

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
}

// Working
function resetSquare() {

    // Reset color of previous selected piece
    if (selectedSquare != null) {

        // Find square color
        var squareColor = jQuery(`#${selectedSquare}`).attr('class');

        // Reset color
        if (squareColor == 'ds') {
            $(`#${selectedSquare}`).css("background-color", "#329BFA");
        } else {
            $(`#${selectedSquare}`).css("background-color", "#C9E7FA");
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
    if (menuOpen == false) {
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
        $(`#${selectedSquare}`).css("background-color", "#280BE3");

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
    if (menuOpen == false) {
        var type = jQuery(this).attr('id');
        if (selectedPiece == true && (board[selectedPieceRow][selectedPieceColumn][2] == "p" || board[selectedPieceRow][selectedPieceColumn][2] == "P")) {
            if (board[selectedPieceRow][selectedPieceColumn][0] == "black") {
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
}

// Working
function movePieceSelect() {
    if (menuOpen == false) {
        // Checks if there is a selected piece
        if (selectedPiece == true) {

            // Highlight the selected piece and record its values
            $(`#${selectedSquare}`).css("background-color", "#00BCFA");
            movePieceSquare = selectedSquare;
            movePieceRow = selectedPieceRow;
            movePieceColumn = selectedPieceColumn;

            // Wait for user to select a square and records its values as the selected square and piece
            moving = true;
        }
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
        deletePieceMove();
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
    if (menuOpen == false) {
        // Checks if there is a selected piece
        if (selectedPiece == true && board[selectedPieceRow][selectedPieceColumn][3] != 'king') {

            // Set the pieces taken value to taken and empty the square in the board
            board[selectedPieceRow][selectedPieceColumn][3] = 'taken';
            board[selectedPieceRow][selectedPieceColumn] = ['', 'empty.png', 'notPiece'];

            // Add one to the deleted pieces counter
            deletedPieces += 1;
        } else {
            console.log("Cannot take king")
        }

        // Update the board
        updateBoard();
        updateButtons();
    }
};

// In progress
function deletePieceMove() {
    board[selectedPieceRow][selectedPieceColumn] = ['', 'empty.png', 'notPiece'];

    // Update the board
    updateBoard();
    updateButtons();
};

// Working
function openAddPieces() {
    if (menuOpen == false) {
        // Set open menu to true
        menuOpen = true;
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

    // Set open menu to false
    menuOpen = false;

}

// In progress
function createBoardFromFEN(fenString) {
    // Must clear the board first
    // TODO: Ask braden if clearPieces() is functional and work from there

    console.log(fenString);
    if (FENRegEx.test(fenString)) {
        console.log("Valid FEN");
        // Split the FEN string by spaces, grab the board, discard the rest
        var fenSplit = fenString.split(" ");
        var fenBoard = fenSplit[0].split("/");  // Split the board into rows
        fenBoard.forEach(function (row, index) {  // For each row
            for (let space = 0; space < row.length; space++) {  // For each space in the row
                if (/^\d+$/.test(row[space])) {  // If the space is a number
                    space += parseInt(row[space]) - 1;  // Skip all spaces marked by the number
                } else {  // If the space is a piece
                    console.log(`${index}-${space} | ${row[space]}`);  // Log the piece
                    // Add the piece to the board
                    // TODO: Add the piece to the board
                }
            }
        })
        
    } else {
        console.log("Invalid FEN");
        alert("Invalid FEN");
    }
}


// Working
function openSaveMenu() {
    if (menuOpen == false) {
        // Set the save board menu to visible and the board to half transparency
        $(`#saveBoardMenu`).css("display", "block");
        $(`#whiteBoard`).css("opacity", "0.5");
        $(`#blackBoard`).css("opacity", "0.5");
        $(`#buttons`).css("opacity", "0.5");
        $(`#featureLinks`).css("opacity", "0.5");
        // Set open menu to true
        menuOpen = true;
    }
}

// To implement (Save)
function saveBoard() {

}

// Working
function closeSaveMenu() {
    // Set the save board menu to not visible and the board to full transparency
    $(`#saveBoardMenu`).css("display", "none");
    $(`#whiteBoard`).css("opacity", "1");
    $(`#blackBoard`).css("opacity", "1");
    $(`#buttons`).css("opacity", "1");
    $(`#featureLinks`).css("opacity", "1");

    // Set open menu to false
    menuOpen = false;
}


// Working
function openAnalyzeMenu() {
    if (menuOpen == false) {
        // Set the analyze board menu to visible and the board to half transparency
        $(`#analyzeBoardMenu`).css("display", "block");
        $(`#whiteBoard`).css("opacity", "0.5");
        $(`#blackBoard`).css("opacity", "0.5");
        $(`#buttons`).css("opacity", "0.5");
        $(`#featureLinks`).css("opacity", "0.5");

        // Set open menu to true
        menuOpen = true;
    }
}

// Working
function swapPlayingColor() {
    if (currentColor == "b") {
        currentColor = "w";
        currentColorFull = "White";
    } else {
        currentColor = "b";
        currentColorFull = "Black";
    }
    $(`#currentColorText`).html(`&nbsp;&nbsp; Moving: ${currentColorFull}`);
}

// Working
function updatedAvailableCastles() {
    if ($(`#whiteKings`).prop("checked") == true) {
        castleWhiteKings = "K"
    } else {
        castleWhiteKings = ""
    }
    if ($(`#whiteQueens`).prop("checked") == true) {
        castleWhiteQueens = "Q"
    } else {
        castleWhiteQueens = ""
    }
    if ($(`#blackKings`).prop("checked") == true) {
        castleBlackKings = "k"
    } else {
        castleBlackKings = ""
    }
    if ($(`#blackQueens`).prop("checked") == true) {
        castleBlackQueens = "q"
    } else {
        castleBlackQueens = ""
    }
}

// Working
function boardToFEN() {
    // Check the castle avalibility
    updatedAvailableCastles();

    // Record the board state
    // Start with empty string and empty square count
    let boardToFEN = "";
    var emptySquares = 0;

    // For each row reset the number of empty squares
    for (var row = 8; row >= 1; row--) {
        emptySquares = 0;
        // For each column in that row
        for (var column = 0; column < 8; column++) {
            // Record the piece type
            let piece = board[row][column][2];
            // For each column check if the square is empty
            // If it is we add 1 to the empty square count
            if (piece == 'notPiece') {
                emptySquares += 1;
            } else {
                // If the square is not empty then we add the number of empty squares
                // then record the piece
                if (emptySquares > 0) {
                    boardToFEN += emptySquares;
                    emptySquares = 0;
                }
                // Only record the number of empty squares if there are any
                boardToFEN += piece;
            }
        }
        // If there are any empty squares left then record them
        if (emptySquares > 0) {
            boardToFEN += emptySquares;
        }
        if (row > 1) {
            boardToFEN += "/";
        }
    }

    // Record current moving color
    boardToFEN += ` ${currentColor}`;

    // Put a space between color and castles if there are any
    if (castleWhiteKings != "" || castleWhiteQueens != "" || castleBlackKings != "" || castleBlackQueens != "") {
        boardToFEN += " ";
    }

    // Record castling availability
    boardToFEN += `${castleWhiteKings}${castleWhiteQueens}${castleBlackKings}${castleBlackQueens}` || " -";

    // Record en passant squares, full move number, and half move clock (Static set to - 0 1)
    boardToFEN += " - 0 1";

    // Set the global FEN to the fen just created
    FEN = boardToFEN
    console.log(FEN);
}

// To implement (Analysis)
function SaveBoardAndFENForAnalysis() {
    boardToFEN();
    // Save the board and FEN to the database
    // Call the analysis page
}

// Working
function closeAnalyzeMenu() {
    // Set the analyze board menu to visible and the board to half transparency
    $(`#analyzeBoardMenu`).css("display", "none");
    $(`#whiteBoard`).css("opacity", "1");
    $(`#blackBoard`).css("opacity", "1");
    $(`#buttons`).css("opacity", "1");
    $(`#featureLinks`).css("opacity", "1");

    // Set open menu to false
    menuOpen = false;
}


// To update as needed
setup = function () {

    // Reset the board and populate it
    resetBoard();
    updateBoard();

    // Prevent buttons from being used while menus are open

    // Select a square
    $("body").on("click", ".square", selectSquare);

    // Basic board functions
    $("body").on("click", ".move", movePieceSelect);
    $("body").on("click", ".delete", deletePiece);
    $("body").on("click", ".reset", resetBoard);
    $("body").on("click", ".add", openAddPieces);


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


    // Feature link buttons (Analysis)
    $("body").on("click", ".analyzeBoard", openAnalyzeMenu);
    $("body").on("click", ".castles", updatedAvailableCastles);
    $("body").on("click", ".swapColor", swapPlayingColor);
    $("body").on("click", ".goToAnalyze", SaveBoardAndFENForAnalysis);

    // Dev Controls
    $(`#tempPrint`).click(function () {
        console.log(board);
    });

    $(`#getFEN`).click(function() {
        boardToFEN();
        $(`#fenSpace`).text(FEN);
    });

    $(`#createFromFEN h3`).click(function() {
        let inputFEN = $(`#fenInput`).val();
        createBoardFromFEN(inputFEN);
    });

    // Not Currently used
    $("body").on("click", ".clear", clearBoard);

    // Close menu buttons
    $("body").on("click", ".closeSave", closeSaveMenu);
    $("body").on("click", ".closeAnalyze", closeAnalyzeMenu);
    $("body").on("click", ".closeAdd", closeAddPieces);
}
$(document).ready(setup)