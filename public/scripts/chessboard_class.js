const boardColumns = "abcdefgh";

/* Chess Piece Classes */

class ChessPiece {
    constructor(letter, number, color, fenSymbol) {
        this.letter = letter;
        this.number = number;
        this.color = color;
        this.fenSymbol = fenSymbol;
    }

    setLetter(letter) {
        this.letter = letter;
    }

    setNumber(number) {
        this.number = number;
    }

    setColor(color) {
        this.color = color;
    }

    getFenLetter() {
        return this.color === "white" ? this.fenSymbol.toUpperCase() : this.fenSymbol.toLowerCase();
    }
}

class Pawn extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "p");
    }
}

class Rook extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "r");
    }
}

class Knight extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "n");
    }
}

class Bishop extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "b");
    }
}

class Queen extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "q");
    }
}

class King extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "k");
    }
}

/* Chess Piece Codenames */
const pieceCodenames = {
    "pawn": function () { return new Pawn(...arguments) },
    "rook": function () { return new Rook(...arguments) },
    "knight": function () { return new Knight(...arguments) },
    "bishop": function () { return new Bishop(...arguments) },
    "queen": function () { return new Queen(...arguments) },
    "king": function () { return new King(...arguments) }
};

/* Chessboard Class */

class Chessboard {
    constructor() {
        this.board = {};
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let letter = boardColumns[i];
                this.board[`${letter}${j + 1}`] = null;
            }
        }
    }

    addPiece(piece) {
        this.board[`${piece.letter}${piece.number}`] = piece;
    }

    clearTile(letter, number) {
        this.board[`${letter}${number}`] = null;
    }

    getPieceFromCodename(pieceName) {
        if (pieceName in pieceCodenames) {
            let result = pieceCodenames[pieceName]();
            return result;
        }
        return null;
    }

    exportToFEN(activeColor) {
        let fen = "";
        for (let row = 8; row >= 1; row--) {
            let emptyCount = 0;
            for (let col = 0; col < 8; col++) {
                let letter = boardColumns[col];
                let piece = this.board[`${letter}${row}`];
                if (piece === null) {
                    emptyCount++;
                } else {
                    if (emptyCount > 0) {
                        fen += emptyCount;
                        emptyCount = 0;
                    }
                    fen += piece.getFenLetter();
                }
            }
            if (emptyCount > 0) {
                fen += emptyCount;
            }
            if (row > 1) {
                fen += "/";
            }
        }
        fen += ` ${activeColor[0]}`;
        return fen;
    }

    initializePieces() {
        // White Pawns
        for (let i = 0; i < 8; i++) {
            let letter = boardColumns[i];
            this.addPiece(new Pawn(letter, 2, "white"));
        }

        // Black Pawns
        for (let i = 0; i < 8; i++) {
            let letter = boardColumns[i];
            this.addPiece(new Pawn(letter, 7, "black"));
        }

        // White Rooks
        this.addPiece(new Rook("a", 1, "white"));
        this.addPiece(new Rook("h", 1, "white"));

        // Black Rooks
        this.addPiece(new Rook("a", 8, "black"));
        this.addPiece(new Rook("h", 8, "black"));

        // White Knights
        this.addPiece(new Knight("b", 1, "white"));
        this.addPiece(new Knight("g", 1, "white"));

        // Black Knights
        this.addPiece(new Knight("b", 8, "black"));
        this.addPiece(new Knight("g", 8, "black"));

        // White Bishops
        this.addPiece(new Bishop("c", 1, "white"));
        this.addPiece(new Bishop("f", 1, "white"));

        // Black Bishops
        this.addPiece(new Bishop("c", 8, "black"));
        this.addPiece(new Bishop("f", 8, "black"));

        // White Queen
        this.addPiece(new Queen("d", 1, "white"));

        // Black Queen
        this.addPiece(new Queen("d", 8, "black"));

        // White King
        this.addPiece(new King("e", 1, "white"));

        // Black King
        this.addPiece(new King("e", 8, "black"));
    }
}