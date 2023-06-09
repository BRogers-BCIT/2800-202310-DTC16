// Define RegEx for FEN validation (Const)
const FENRegEx = /^([rnbqkpRNBQKP1-8]{1,8}\/){7}[rnbqkpRNBQKP1-8]{1,8}/;

// Define size of a chessboard (Const)
const boardSize = 8;

// Define the format for a square with no piece (Const)
const nonePiece = ["empty.png", "notPiece"];

// Pull User Data From Local Storage
const uUid = localStorage.getItem("userUid");
const uDisplayName = localStorage.getItem("userDisplayName");

// Create board variable (Board)
var board;

// Create piece variables (Board)
var blackPieces;
var whitePieces;
var blackPawns;
var whitePawns;

// Create FEN variables (FEN)
var FEN;
var currentColor = "w";
var currentColorFull = "White";
var castleWhiteKings = "K";
var castleWhiteQueens = "Q";
var castleBlackKings = "k";
var castleBlackQueens = "q";


// Created saved board variables (Save)
var savedFEN = "";
var savedName = "";
var savedDescription = "";
var savedDate = "";


// Create variables for the row and column
// and HTML square of a selected piece (Select / Delete / Move)
var selectedPieceRow;
var selectedPieceColumn;
var selectedSquare;

// Create variables for the row and column
// and HTML square of a piece selected to be moved (Move)
var movePieceRow;
var movePieceColumn;
var movePieceSquare;


// Create variable to track if piece is selected (Select)
var selectedPiece = null;

// Create variable to track number of deleted pieces
// Used to determine if adding to board is possible (Delete)
var deletedPieces = 0;

// Create variable to track if the user is moving or selecting a piece (Move / Select)
var moving = false;

// Create variable to track if a menu is currently open (Menus)
var menuOpen = false;


// Working (Update)
function updateBoard() {

    // Populate the board based on the boardSize constant
    for (var row = boardSize; row > 0; row--) {

        // If Even row
        if (row % 2 == 0) {

            // Populate even row with even square coloring pattern
            $(`#${row}`).html(`
                <td id="a${row}"> <button id="${row}0" class="square"> <img src="../img/${board[row][0][1]}"> </button> </td>
                <td id="b${row}" class="ds"> <button id="${row}1" class="square"> <img src="../img/${board[row][1][1]}"> </button> </td>
                <td id="c${row}"> <button id="${row}2" class="square"> <img src="../img/${board[row][2][1]}"> </button> </td>
                <td id="d${row}" class="ds"> <button id="${row}3" class="square"> <img src="../img/${board[row][3][1]}"> </button> </td>
                <td id="e${row}"> <button id="${row}4" class="square"> <img src="../img/${board[row][4][1]}"> </button> </td>
                <td id="f${row}" class="ds"> <button id="${row}5" class="square"> <img src="../img/${board[row][5][1]}"> </button> </td>
                <td id="g${row}"> <button id="${row}6" class="square"> <img src="../img/${board[row][6][1]}"> </button> </td>
                <td id="h${row}" class="ds"> <button id="${row}7" class="square"> <img src="../img/${board[row][7][1]}"> </button> </td> `)

            // Else Odd Row
        } else {

            // Populate odd row with odd square coloring pattern
            $(`#${row}`).html(`
                <td id="a${row}" class="ds"> <button id="${row}0" class="square"> <img src="../img/${board[row][0][1]}"> </button> </td>
                <td id="b${row}"> <button id="${row}1" class="square"> <img src="../img/${board[row][1][1]}"> </button> </td>
                <td id="c${row}" class="ds"> <button id="${row}2" class="square"> <img src="../img/${board[row][2][1]}"> </button> </td>
                <td id="d${row}"> <button id="${row}3" class="square"> <img src="../img/${board[row][3][1]}"> </button> </td>
                <td id="e${row}" class="ds"> <button id="${row}4" class="square"> <img src="../img/${board[row][4][1]}"> </button> </td>
                <td id="f${row}"> <button id="${row}5" class="square"> <img src="../img/${board[row][5][1]}"> </button> </td>
                <td id="g${row}" class="ds"> <button id="${row}6" class="square"> <img src="../img/${board[row][6][1]}"> </button> </td>
                <td id="h${row}"> <button id="${row}7" class="square"> <img src="../img/${board[row][7][1]}"> </button> </td> `)
        }

    }

}

// Working (Update)
function updateButtons() {

    // Make the feature buttons full opacity
    $(`#featureLinks`).css("opacity", "1");

    // Promotion button check
    if (selectedPiece == true && (board[selectedPieceRow][selectedPieceColumn][2] == "p" || board[selectedPieceRow][selectedPieceColumn][2] == "P")) {
        // If there is a selected piece and it is a pawn
        // Set the promotion button to full transparency to indicate promotion is possible
        $(`.promote`).css("opacity", "1");

    } else {

        // If there is a selected piece and it is not a pawn
        // Set the promotion button to half transparency to indicate promotion is not possible
        $(`.promote`).css("opacity", "0.5");

    }


    // Selected a piece updates
    if (selectedPiece == true) {

        // Non-king piece check
        if (board[selectedPieceRow][selectedPieceColumn][2] != "k" && board[selectedPieceRow][selectedPieceColumn][2] != "K") {

            // If there is a selected piece and it is not a king
            // Set the add button to full transparency to indicate moving from that spot is possible
            $(`.add`).css("opacity", "1");

        } else {

            // If there is a selected piece and it is a king
            // Set the add button to half transparency to indicate moving from that spot is not possible
            $(`.add`).css("opacity", "0.5");

        }

        // For any piece
        // Set the add button to full transparency to indicate moving from that spot is possible
        $(`.move`).css("opacity", "1");

        // For any piece
        // Set the delete button to full transparency to indicate deletion is possible
        $(`.delete`).css("opacity", "1");


    } else if (selectedPiece == false) {
        // Selected a non-piece updates
        // If there is a selected piece

        // Set the add button to full transparency to indicate it is possible
        $(`.add`).css("opacity", "1");

        // Set the delete button to half transparency to indicate it is not possible
        $(`.delete`).css("opacity", "0.5");

        // Set the delete button to move transparency to indicate it is not possible
        $(`.move`).css("opacity", "0.5");



    } else {
        // Else there is not a selected piece

        // Set the delete button to move transparency to indicate it is not possible
        $(`.delete`).css("opacity", "0.5");

        // Set the move button to move transparency to indicate it is not possible
        $(`.move`).css("opacity", "0.5");

        // Set the add button to move transparency to indicate it is not possible
        $(`.add`).css("opacity", "0.5");

    }

}


// Working (Reset)
function resetBoard() {

    // Prevents the board from being reset if a menu is open
    if (menuOpen == false) {

        // Set all pieces to original states
        // White pieces
        whitePieces = [["white", "wrook.png", "R", "on board"], ["white", "wknight.png", "N", "on board"],
        ["white", "wbishop.png", "B", "on board"], ["white", "wqueen.png", "Q", "on board"],
        ["white", "wking.png", "K", "king"], ["white", "wbishop.png", "B", "on board"],
        ["white", "wknight.png", "N", "on board"], ["white", "wrook.png", "R", "on board"]];

        // White pawns
        whitePawns = [["white", "wpawn.png", "P", "on board"], ["white", "wpawn.png", "P", "on board"],
        ["white", "wpawn.png", "P", "on board"], ["white", "wpawn.png", "P", "on board"],
        ["white", "wpawn.png", "P", "on board"], ["white", "wpawn.png", "P", "on board"],
        ["white", "wpawn.png", "P", "on board"], ["white", "wpawn.png", "P", "on board"]];

        // Black pieces
        blackPieces = [["black", "brook.png", "r", "on board"], ["black", "bknight.png", "n", "on board"],
        ["black", "bbishop.png", "b", "on board"], ["black", "bqueen.png", "q", "on board"],
        ["black", "bking.png", "k", "king"], ["black", "bbishop.png", "b", "on board"],
        ["black", "bknight.png", "n", "on board"], ["black", "brook.png", "r", "on board"]];

        // Black pawns
        blackPawns = [["black", "bpawn.png", "p", "on board"], ["black", "bpawn.png", "p", "on board"],
        ["black", "bpawn.png", "p", "on board"], ["black", "bpawn.png", "p", "on board"],
        ["black", "bpawn.png", "p", "on board"], ["black", "bpawn.png", "p", "on board"],
        ["black", "bpawn.png", "p", "on board"], ["black", "bpawn.png", "p", "on board"]];

        // Set the chessboard to a starting position
        board = {
            1: [whitePieces[0], whitePieces[1], whitePieces[2], whitePieces[3], whitePieces[4], whitePieces[5], whitePieces[6], whitePieces[7]],
            2: [whitePawns[0], whitePawns[1], whitePawns[2], whitePawns[3], whitePawns[4], whitePawns[5], whitePawns[6], whitePawns[7]],
            3: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
            4: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
            5: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
            6: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
            7: [blackPawns[0], blackPawns[1], blackPawns[2], blackPawns[3], blackPawns[4], blackPawns[5], blackPawns[6], blackPawns[7]],
            8: [blackPieces[0], blackPieces[1], blackPieces[2], blackPieces[3], blackPieces[4], blackPieces[5], blackPieces[6], blackPieces[7]]
        };

        // Reset all variables
        resetVariables();
        deletedPieces = 0;

        // Update the board and buttons
        updateBoard();
        updateButtons();

    }

}

// Working (Reset)
function resetSquare() {

    // Reset color of previous selected piece
    if (selectedSquare != null) {

        // Find color of the square
        var squareColor = jQuery(`#${selectedSquare}`).attr("class");

        // Reset color to original color
        if (squareColor == "ds") {
            // If square is a dark sqaure
            $(`#${selectedSquare}`).css("background-color", "#329BFA");

        } else {
            // Else square is a light square
            $(`#${selectedSquare}`).css("background-color", "#C9E7FA");
        }

    }
}

// Working (Reset)
function resetVariables() {

    // Set all variables to null or false (default states)
    selectedPiece = null;
    selectedSquare = null;
    selectedPieceRow = null;
    selectedPieceColumn = null;
    movePieceRow = null;
    movePieceColumn = null;
    movePieceSquare = null;
    moving = false;

}




// Working (Select)
function selectSquare() {

    // Prevents the player starting a selection while a menu is open
    if (menuOpen == false) {

        // Reset the color of the last selected piece
        resetSquare();

        // Find selected piece' position
        var tag = jQuery(this).attr("id");

        // Find selected piece' row and column
        var row = Math.floor(tag / 10);
        var column = (tag % 10);

        // Records the square of the selected piece
        // Record the row number as a letter
        // (a=1 - h=8)
        selectedSquare = `${String.fromCharCode(97 + column)}${row}`;

        // Record the row and column of the selected piece normally
        selectedPieceRow = row;
        selectedPieceColumn = column;

        // Set the selected square to gray
        $(`#${selectedSquare}`).css("background-color", "#280BE3");

        // Check if the player is moving a piece
        if (moving == false) {

            // If the player is not moving a piece then call piece selection
            selectedSquareCheck();

        } else {

            // Else the player is moving a piece then call piece movement
            movePieceMove();

        }

        // Set the movement to false
        moving = false;

        // Update the buttons
        updateButtons();

    }
}

// Working (Select)
function selectedSquareCheck() {

    // Check if selected position is a piece and sets the values
    if (board[selectedPieceRow][selectedPieceColumn][2] != "notPiece") {

        // If the selected square is a piece then set the selected piece to true
        selectedPiece = true;

    } else {

        // If the selected square is not a piece then set the selected piece to false
        selectedPiece = false;
    }

    // Update the buttons
    updateButtons();

}




// Working (Move)
function movePieceSelect() {

    // Prevent the player from starting a move while a menu is open
    if (menuOpen == false) {

        // Checks if there is a selected piece
        if (selectedPiece == true) {

            // Highlight the selected piece' square and record its location
            $(`#${selectedSquare}`).css("background-color", "#00BCFA");
            movePieceSquare = selectedSquare;
            movePieceRow = selectedPieceRow;
            movePieceColumn = selectedPieceColumn;

            // Set the selected a square to move variable to true
            moving = true;

        }

    }

}

// Working (Move)
function movePieceMove() {

    // Check if the selected square is a non-king piece
    if (board[selectedPieceRow][selectedPieceColumn][3] != "king") {

        // Delete the selected piece in the selected square
        if (selectedPiece == true) {
            // Call the delete piece function
            deletePiece();
        }

        // Set square of the new location to have the value (piece variable) of the old location
        board[selectedPieceRow][selectedPieceColumn] = board[movePieceRow][movePieceColumn];

        // Set the selected square to the square to be moved to
        selectedSquare = movePieceSquare;
        selectedPieceRow = movePieceRow;
        selectedPieceColumn = movePieceColumn;

        // Delete the old piece
        deletePieceMove();

        // Reset the old square
        resetSquare();

        // Reset Variables to unselect all squares
        resetVariables();

        // Update the board with the new piece
        updateBoard();
        updateButtons();

    } else {
        // Else the selected square is a king

        // Reset the variables and update the board
        resetVariables();
        updateBoard();
        updateButtons();

    }
}




// Working (Delete)
function deletePiece() {

    // Checks there are no menus open
    if (menuOpen == false) {

        // Checks if there is a selected piece that is not a king
        if (board[selectedPieceRow][selectedPieceColumn][3] != "king" && board[selectedPieceRow][selectedPieceColumn][2] != "notPiece") {

            // Set the pieces taken value to taken and empty the square in the board
            board[selectedPieceRow][selectedPieceColumn][3] = "taken";
            board[selectedPieceRow][selectedPieceColumn] = ["", "empty.png", "notPiece"];

            // Add one to the deleted pieces counter
            deletedPieces += 1;

        }

        // Unselect the piece
        selectedPiece = null;

        // Update the board
        updateBoard();
        updateButtons();

    }

};

// Working (Move)
function deletePieceMove() {

    // Empty the moved pieces old square in the board
    board[selectedPieceRow][selectedPieceColumn] = ["", "empty.png", "notPiece"];

    // Update the board
    updateBoard();
    updateButtons();

};




// Working (Add)
function openAddPieces() {

    // Checks there are no menus open
    if (menuOpen == false && deletedPieces > 0) {

        // Set open menu tracker to true ro prevent other menus from opening
        menuOpen = true;

        // Checks if there is a selected square to add to
        if (selectedSquare != null) {

            // Set the save board menu to visible and the board to half transparency
            $(`#addPieceMenu`).css("display", "block");
            $(`#whiteBoard`).css("opacity", "0.5");
            $(`#blackBoard`).css("opacity", "0.5");
            $(`#buttons`).css("opacity", "0.5");
            $(`#featureLinks`).css("opacity", "0.5");



            // For each black piece
            var takenBlackPieces = 8;
            for (var blackPiece = 0; blackPiece < 8; blackPiece++) {

                //  If it has been taken, add a button with the piece' image
                if (blackPieces[blackPiece][3] == "taken") {
                    $(`#blackPieces`).append(`<button class="blackPiece" id="${blackPiece}"><img src="../img/${blackPieces[blackPiece][1]}" class="piece" id="${blackPiece}"></button>`);

                } else {

                    // Otherwise take one from the taken black pieces counter
                    takenBlackPieces -= 1;

                }
            }

            // If no black pieces have been taken then display a blank space
            if (takenBlackPieces == 0) {
                $(`#blackPieces`).append(`<h3></h3>`);
            }



            // For each white piece
            var takenWhitePieces = 8;
            for (var whitePiece = 0; whitePiece < 8; whitePiece++) {

                //  If it has been taken, add a button with the piece' image
                if (whitePieces[whitePiece][3] == "taken") {
                    $(`#whitePieces`).append(`<button class="whitePiece" id="${whitePiece}"><img src="../img/${whitePieces[whitePiece][1]}" class="piece" id="${whitePiece}"></button>`);

                } else {

                    // Otherwise take one from the taken white pieces counter
                    takenWhitePieces -= 1;

                }
            }

            // If no white pieces have been taken then display a blank space
            if (takenWhitePieces == 0) {
                $(`#whitePieces`).append(`<h3></h3>`);
            }



            // For each black pawn
            var takenBlackPawns = 8;
            for (var blackPawn = 0; blackPawn < 8; blackPawn++) {

                //  If it has been taken, add a button with the piece' image
                if (blackPawns[blackPawn][3] == "taken") {
                    $(`#blackPawns`).append(`<button class="blackPawn" id="${blackPawn}"><img src="../img/${blackPawns[blackPawn][1]}" class="piece" id="${blackPawn}"></button>`);

                } else {

                    // Otherwise take one from the taken black pawns counter
                    takenBlackPawns -= 1;

                }
            }

            // If no black pawns have been taken then display a blank space
            if (takenBlackPawns == 0) {
                $(`#blackPawns`).append(`<h3></h3>`);
            }



            // For each white pawn
            var takenWhitePawns = 8;
            for (var whitePawn = 0; whitePawn < 8; whitePawn++) {

                //  If it has been taken, add a button with the piece' image
                if (whitePawns[whitePawn][3] == "taken") {
                    $(`#whitePawns`).append(`<button class="whitePawn" id="${whitePawn}"><img src="../img/${whitePawns[whitePawn][1]}" class="piece" id="${whitePawn}"></button>`);

                } else {

                    // Otherwise take one from the taken white pawns counter
                    takenWhitePawns -= 1;

                }
            }

            // If no white pawns have been taken then display a blank space
            if (takenWhitePawns == 0) {
                $(`#whitePawns`).append(`<h3></h3>`);
            }

        }

    }

};

// Working (Add)
function addPieceToBoard() {

    // Checks if the selected piece is not a king
    if (board[selectedPieceRow][selectedPieceColumn][3] != "king") {

        // Closes the menu
        closeAddPieces();

        // Get the piece type from the buttons class and index from buttons id
        var pieceType = jQuery(this).attr("class");
        var pieceIndex = jQuery(this).attr("id");

        // If moving to a square with a piece then delete the piece on that square
        if (selectedPiece == true) {
            deletePiece();
        }

        // For each piece type check if the piece to be added is of that type
        // If it is then set it to be "on board" and add it to the board
        if (pieceType == "blackPiece") {
            // Black pieces
            blackPieces[pieceIndex][3] = "on board";
            board[selectedPieceRow][selectedPieceColumn] = blackPieces[pieceIndex]

        } else if (pieceType == "whitePiece") {
            // White pieces
            whitePieces[pieceIndex][3] = "on board";
            board[selectedPieceRow][selectedPieceColumn] = whitePieces[pieceIndex]

        } else if (pieceType == "blackPawn") {
            // Black pawns
            blackPawns[pieceIndex][3] = "on board";
            board[selectedPieceRow][selectedPieceColumn] = blackPawns[pieceIndex]

        } else if (pieceType == "whitePawn") {
            // White pawns
            whitePawns[pieceIndex][3] = "on board";
            board[selectedPieceRow][selectedPieceColumn] = whitePawns[pieceIndex]
        }

    }

    // Update the board with the new pieces
    updateBoard();
    updateButtons();

}

// Working (Add)
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

    // Set open menu tracker to false to indicate no menu is open
    menuOpen = false;

}


// Working (Analysis)
function createBoardFromFEN(fenString) {

    // Test if the FEN string is valid
    if (FENRegEx.test(fenString)) {

        // Clear the board first
        clearBoard();

        // Map FEN letters to their piece equivalents
        const pieceDictionary = {
            "P": [whitePawns[0], whitePawns[1], whitePawns[2], whitePawns[3], whitePawns[4], whitePawns[5], whitePawns[6], whitePawns[7]],
            "p": [blackPawns[0], blackPawns[1], blackPawns[2], blackPawns[3], blackPawns[4], blackPawns[5], blackPawns[6], blackPawns[7]],
            "R": [whitePieces[0], whitePieces[7]],
            "r": [blackPieces[0], blackPieces[7]],
            "N": [whitePieces[1], whitePieces[6]],
            "n": [blackPieces[1], blackPieces[6]],
            "B": [whitePieces[2], whitePieces[5]],
            "b": [blackPieces[2], blackPieces[5]],
            "K": [whitePieces[4]],
            "k": [blackPieces[4]],
            "Q": [whitePieces[3]],
            "q": [blackPieces[3]]
        };

        // Split the FEN string by spaces, grab the board, discard the rest
        var fenSplit = fenString.split(" ");

        // Split the board into rows
        var fenBoard = fenSplit[0].split("/");

        // For each row
        fenBoard.forEach(function (row, index) {

            // Create the index to actually use for placing pieces
            var columnIndex = 0;

            // For each space in the row
            for (var space = 0; space < row.length; ++space) {

                // If the space is a number
                if (/^\d+$/.test(row[space])) {

                    // Get the number of spaces to skip
                    var spacesToSkip = parseInt(row[space]);
                    // Skip all spaces marked by the number
                    columnIndex += spacesToSkip;

                } else {
                    // If the space is a piece
                    var pieceName = row[space];
                    // Get the piece letter
                    var pieceArray = pieceDictionary[pieceName];
                    // Get the array corresponding to the piece name

                    try {
                        // Set the piece to be on the board
                        pieceArray[0][3] = "on board";
                        // Get the piece from the array
                        var piece = pieceArray.pop();


                        // Set the piece to be on the board
                        piece[3] = "on board";
                        // Decrement the deleted pieces counter
                        deletedPieces--;

                        // Add the piece to the board
                        board[boardSize - index][columnIndex] = piece;


                    } catch (error) {
                        // If there are no more pieces of this type
                        console.log(`ERROR: #${index + 1}${columnIndex} | No more pieces of this type, skipping`);
                    }

                    // Increment the space index
                    columnIndex++;
                }

            }

        });

        // Set Kings to be Kings, not on board
        whitePieces[4][3] = "King";
        blackPieces[4][3] = "King";

        // Update the board
        updateBoard();

    }
}


// Working (Save)
function openSaveMenu() {

    // Check if the user is logged in
    if (uUid === null) {
        // If not logged in, alert the user
        window.alert("You must be logged in to save a board");

    } else {

        // If logged in, check if a menu is already open
        if (menuOpen == false) {

            // If no menu is already open
            // Set the save board menu to visible and the board to half transparency
            $(`#saveBoardMenu`).css("display", "block");
            $(`#whiteBoard`).css("opacity", "0.5");
            $(`#blackBoard`).css("opacity", "0.5");
            $(`#buttons`).css("opacity", "0.5");
            $(`#featureLinks`).css("opacity", "0.5");

            // Set open menu tracker to true to indicate a menu is open
            menuOpen = true;

        }

    }

}

// Working (Save)
function boardToFEN() {

    // Check the castle availability
    updatedAvailableCastles();

    // Record the board state
    // Start with empty string and empty square count
    var boardToFEN = "";
    var emptySquares = 0;

    // For each row reset the number of empty squares
    for (var row = 8; row >= 1; row--) {
        emptySquares = 0;

        // For each column in that row
        for (var column = 0; column < 8; column++) {

            // Record the piece type
            var piece = board[row][column][2];

            // For each column check if the square is empty
            if (piece == "notPiece") {

                // If it is we add 1 to the empty square count
                emptySquares += 1;

            } else {

                // If the square is not empty then we add the number of empty squares
                if (emptySquares > 0) {

                    // Then record the piece in that square
                    boardToFEN += emptySquares;
                    emptySquares = 0;

                }

                // Only record the number of empty squares if there are any
                boardToFEN += piece;

            }
        }

        // If there are any empty squares left in the column then record them
        if (emptySquares > 0) {
            boardToFEN += emptySquares;
        }

        // If we are not on the last row then add a slash to indicate the end of the row
        if (row > 1) {
            boardToFEN += "/";
        }

    }

    // Set the global FEN to the fen just created
    FEN = boardToFEN

}

// Working (Save)
function saveBoard() {

    // Get the board name and description from the input fields
    var boardName = document.getElementById("boardName").value;
    // Set the board name to lowercase and trim it
    boardName = boardName.toLowerCase();
    boardName = boardName.trim();

    // If the board name is empty then alert the user
    if (boardName == "") {
        $(`#boardName`).css("background-color", "yellow");
        window.alert("You must enter a name for the board");
        return;
    }

    // Get the board description and trim it
    var boardDescription = document.getElementById("boardDescriptionText").value;
    boardDescription = boardDescription.trim();

    // Convert the board to FEN for saving
    boardToFEN();

    // Get the user's uid and display name
    var uUid = localStorage.getItem("userUid")
    var uDisplayName = localStorage.getItem("userDisplayName")

    // If the board name is not empty
    if (boardName != "") {

        // Save the board to the database
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").doc(boardName).set({

            // Set the board name, description, FEN, and date saved
            boardName: boardName,
            boardDescription: boardDescription,
            boardFEN: FEN,
            savedDate: new Date().toISOString().split("T")[0],

        }).then(function () {

            // Close the save board menu
            closeSaveMenu();

        }).catch(function (error) {

            // Catch any errors
            console.error("Error writing document: ", error);

        });

    }

}

// Working (Save)
function closeSaveMenu() {

    // Hide the save board menu and set the board back to normal
    $(`#saveBoardMenu`).css("display", "none");
    $(`#whiteBoard`).css("opacity", "1");
    $(`#blackBoard`).css("opacity", "1");
    $(`#buttons`).css("opacity", "1");
    $(`#featureLinks`).css("opacity", "1");
    $(`#boardName`).css("background-color", "white");

    // Set open menu tracker to false to indicate all menus are closed
    menuOpen = false;

}


// Working (Analyze)
function openAnalyzeMenu() {

    // Check if the user is logged in
    if (uUid === null) {
        // If not logged in, alert the user
        window.alert("You must be logged in to analyze a board");
    } else {

        // If the user is logged in, check if a menu is already open
        if (menuOpen == false) {

            // Set the analyze board menu to visible and the board to half transparency
            $(`#analyzeBoardMenu`).css("display", "block");
            $(`#whiteBoard`).css("opacity", "0.5");
            $(`#blackBoard`).css("opacity", "0.5");
            $(`#buttons`).css("opacity", "0.5");
            $(`#featureLinks`).css("opacity", "0.5");

            // Set open menu tracker to true to indicate a menus is open
            menuOpen = true;

        }

    }

}

// Working (Analyze)
function swapPlayingColor() {

    // Update the current color playing
    if (currentColor == "b") {
        // If the current color is black (b) then swap to white (w)
        currentColor = "w";
        currentColorFull = "White";
    } else {
        // Otherwise swap to black (b)
        currentColor = "b";
        currentColorFull = "Black";
    }

    // Update the current color text
    $(`#currentColorText`).html(`&nbsp;&nbsp; Moving: ${currentColorFull}`);
}

// Working (Analyze)
function updatedAvailableCastles() {

    // Check the castle availability and record it
    // White is uppercase, black is lowercase
    // Kingside is K, Queens side is Q
    // Non-available is ""

    // White Kings side castle
    if ($(`#whiteKings`).prop("checked") == true) {
        castleWhiteKings = "K"
    } else {
        castleWhiteKings = ""
    }

    // White Queens side castle
    if ($(`#whiteQueens`).prop("checked") == true) {
        castleWhiteQueens = "Q"
    } else {
        castleWhiteQueens = ""
    }

    // Black Kings side castle
    if ($(`#blackKings`).prop("checked") == true) {
        castleBlackKings = "k"
    } else {
        castleBlackKings = ""
    }

    // Black Queens side castle
    if ($(`#blackQueens`).prop("checked") == true) {
        castleBlackQueens = "q"
    } else {
        castleBlackQueens = ""
    }

}

// Working (Analyze)
function boardToFullFEN() {

    // Check the castle availability
    updatedAvailableCastles();

    // Record the board state
    // Start with empty string and empty square count
    var boardToFEN = "";
    var emptySquares = 0;

    // For each row reset the number of empty squares
    for (var row = 8; row >= 1; row--) {
        emptySquares = 0;

        // For each column in that row
        for (var column = 0; column < 8; column++) {

            // Record the piece type
            var piece = board[row][column][2];

            // For each column check if the square is empty
            if (piece == "notPiece") {

                // If it is we add 1 to the empty square count
                emptySquares += 1;

            } else {

                // If the square is not empty then we add the number of empty squares
                if (emptySquares > 0) {

                    // Then record the piece in that square
                    boardToFEN += emptySquares;
                    emptySquares = 0;

                }

                // Only record the number of empty squares if there are any
                boardToFEN += piece;

            }
        }

        // If there are any empty squares left in the column then record them
        if (emptySquares > 0) {
            boardToFEN += emptySquares;
        }

        // If we are not on the last row then add a slash to indicate the end of the row
        if (row > 1) {
            boardToFEN += "/";
        }

    }

    // Record current moving color
    boardToFEN += ` ${currentColor}`;

    // Put a space between the moving color and the available castles (if there are any)
    if (castleWhiteKings != "" || castleWhiteQueens != "" || castleBlackKings != "" || castleBlackQueens != "") {
        boardToFEN += " ";
    } else {
        boardToFEN += "";
    }

    // Record castling availability
    boardToFEN += `${castleWhiteKings}${castleWhiteQueens}${castleBlackKings}${castleBlackQueens}` || " -";

    // Record the en passant squares, full move number, and half move clock (Static set to - 0 1)
    boardToFEN += " - 0 1";

    // Set the global FEN to the fen just created
    FEN = boardToFEN;

}

// Working (Analyze)
function SaveFENForAnalysis() {

    // Convert the board to FEN for analysis
    boardToFullFEN();

    // Save the board FEN to the database
    const uUid = localStorage.getItem("userUid")
    db.collection("users").doc(uUid).update({
        currentFEN: FEN

    }).then(function () {

        // Then wait for save to upload and submit the form
        setTimeout(function () {
            // Set form to board fen
            $(`#fenInput`).val(FEN);
            // Submit the form
            $(`#fenToPass`).submit();
        }, 1000);

    }).catch(function (error) {

        // Catch any errors
        console.error("Error writing document: ", error);

    });

}

// Working (Analyze)
function closeAnalyzeMenu() {

    // Hide the analyze board menu and set the board back to normal
    $(`#analyzeBoardMenu`).css("display", "none");
    $(`#whiteBoard`).css("opacity", "1");
    $(`#blackBoard`).css("opacity", "1");
    $(`#buttons`).css("opacity", "1");
    $(`#featureLinks`).css("opacity", "1");

    // Set open menu tracker to false to indicate all menus are closed
    menuOpen = false;

}



// Working (Promote)
function promotePawn() {

    // Prevent buttons from being used while menus are open
    if (menuOpen == false) {

        // Get the type of piece to promote to based on the buttons ID
        var type = jQuery(this).attr("id");

        // If the selected piece is a pawn then update it to the selected type
        if (selectedPiece == true && (board[selectedPieceRow][selectedPieceColumn][2] == "p" || board[selectedPieceRow][selectedPieceColumn][2] == "P")) {

            // Update the piece to the selected type (black)
            if (board[selectedPieceRow][selectedPieceColumn][0] == "black") {
                board[selectedPieceRow][selectedPieceColumn][1] = `bp${type}.png`;
            }

            // Update the piece to the selected type (white)
            if (board[selectedPieceRow][selectedPieceColumn][0] == "white") {
                board[selectedPieceRow][selectedPieceColumn][1] = `wp${type}.png`;
            }

        }

        // Reset variables
        resetVariables();

        // Update the board and buttons
        updateBoard();
        updateButtons();

    }

}

// Working (Open Saved Board)
function clearBoard() {

    // Set all pieces to taken states except for the kings

    // White pieces
    whitePieces = [["white", "wrook.png", "R", "taken"], ["white", "wknight.png", "N", "taken"],
    ["white", "wbishop.png", "B", "taken"], ["white", "wqueen.png", "Q", "taken"],
    ["white", "wking.png", "K", "king"], ["white", "wbishop.png", "B", "taken"],
    ["white", "wknight.png", "N", "taken"], ["white", "wrook.png", "R", "taken"]];

    // White pawns
    whitePawns = [["white", "wpawn.png", "P", "taken"], ["white", "wpawn.png", "P", "taken"],
    ["white", "wpawn.png", "P", "taken"], ["white", "wpawn.png", "P", "taken"],
    ["white", "wpawn.png", "P", "taken"], ["white", "wpawn.png", "P", "taken"],
    ["white", "wpawn.png", "P", "taken"], ["white", "wpawn.png", "P", "taken"]];

    // Black pieces
    blackPieces = [["black", "brook.png", "r", "taken"], ["black", "bknight.png", "n", "taken"],
    ["black", "bbishop.png", "b", "taken"], ["black", "bqueen.png", "q", "taken"],
    ["black", "bking.png", "k", "king"], ["black", "bbishop.png", "b", "taken"],
    ["black", "bknight.png", "n", "taken"], ["black", "brook.png", "r", "taken"]];

    // Black pawns
    blackPawns = [["black", "bpawn.png", "p", "taken"], ["black", "bpawn.png", "p", "taken"],
    ["black", "bpawn.png", "p", "taken"], ["black", "bpawn.png", "p", "taken"],
    ["black", "bpawn.png", "p", "taken"], ["black", "bpawn.png", "p", "taken"],
    ["black", "bpawn.png", "p", "taken"], ["black", "bpawn.png", "p", "taken"]];


    // Set the chessboard to a cleared position
    // All pieces are taken
    // Kings will always be populated onto the board from FEN
    board = {
        1: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
        2: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
        3: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
        4: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
        5: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
        6: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
        7: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
        8: [["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"], ["", "empty.png", "notPiece"]],
    };

    // Reset all variables then set taken pieces to 30 (all but kings)
    resetVariables();
    deletedPieces = 30;

    // Update the board and buttons
    updateBoard();
    updateButtons();

}

// Working (Navbar)
const closeAllMenus = function () {

    // Call all close menu functions
    closeAddPieces();
    closeSaveMenu();
    closeAnalyzeMenu();

}

// Working (Open Saved Board)
const openSavedBoard = function () {

    // Check if the user is opening a saved board
    var currentPage = window.location.href;
    if (currentPage.includes("openBoard") || currentPage.includes("analysis")) {

        // Get the user's information
        db.collection("users").doc(uUid).get()
            .then((doc) => {

                // Get the saved board name from the current user's document
                savedName = doc.data().currentBoardName;
                $(document).prop("title", `${savedName} - ChessMind.AI`);
                $("#savedBoardName").html(savedName)

                // Get the saved description from the current user's document
                savedDescription = doc.data().currentBoardDescription;
                $("#savedBoardDescriptionText").val(savedDescription)

                // Get the saved date from the current user's document
                savedDate = doc.data().currentBoardSavedDate
                $("#savedBoardDate").html(`DATE SAVED:  ${savedDate}`)

                // Get the saved FEN from the current user's document
                savedFEN = doc.data().currentFEN;

                // If the saved FEN is valid, create the board from the FEN
                if (savedFEN != undefined && savedFEN != "" && savedFEN != null && savedFEN != "XXXXXXXXXXX") {
                    // Create the board from the saved FEN
                    createBoardFromFEN(savedFEN);

                } else {

                    // Otherwise hide the board information and description
                    $("#savedBoardDescription").css("display", "none")
                    $("#boardInformation").css("display", "none")

                }

            })
    }

}

// Working (ALL)
setup = function () {

    // Populate the board with the pieces
    resetBoard();

    // Open the board from the users saved board (if applicable)
    openSavedBoard();

    // Update the board and buttons
    updateBoard();

    // Square Selection Listener (Board)
    $("body").on("click", ".square", selectSquare);

    // Basic Board Function Listeners (Move, Delete, Reset)
    $("body").on("click", ".move", movePieceSelect);
    $("body").on("click", ".delete", deletePiece);
    $("body").on("click", ".reset", resetBoard);

    // Open Menu Buttons Listeners (Menus)
    $("body").on("click", ".add", openAddPieces);
    $("body").on("click", ".saveBoard", openSaveMenu);
    $("body").on("click", ".analyzeBoard", openAnalyzeMenu);

    // Add Piece Buttons Listeners (Add)
    $("body").on("click", ".blackPiece", addPieceToBoard);
    $("body").on("click", ".blackPawn", addPieceToBoard);
    $("body").on("click", ".whitePiece", addPieceToBoard);
    $("body").on("click", ".whitePawn", addPieceToBoard);

    // Feature Link Save Buttons Listeners (Save & Analyze)
    $("body").on("click", ".saveToUser", saveBoard);
    $("body").on("click", ".goToAnalyze", SaveFENForAnalysis);

    // FEN Button Listeners (Analyze)
    $("body").on("click", ".castles", updatedAvailableCastles);
    $("body").on("click", ".swapColor", swapPlayingColor);

    // Close Menu Button Listeners (Menus)
    $("body").on("click", ".closeSave", closeSaveMenu);
    $("body").on("click", ".closeAnalyze", closeAnalyzeMenu);
    $("body").on("click", ".closeAdd", closeAddPieces);

    // Promote Pawn Button Listener (Promote)
    $("body").on("click", ".promote", promotePawn);

    // Clear Board Listener (Clear) (Currently Method Call Only, No Button)
    $("body").on("click", ".clear", clearBoard);

    // Navbar Listener (Menus / Nav Bar)
    $("body").on("click", ".navbar-toggler", closeAllMenus);


}
$(document).ready(setup)

