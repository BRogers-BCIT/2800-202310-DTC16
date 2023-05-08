const boardColumns = "abcdefgh";

/* Chess Piece Classes */

class ChessPiece {
    constructor(letter, number, color, name) {
        this.letter = letter;
        this.number = number;
        this.color = color;
        this.name = name;
    }

    getFenLetter() {
        return this.color === "white" ? this.name[0].toUpperCase() : this.name[0].toLowerCase();
    }
}

class Pawn extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "pawn");
    }
}

class Rook extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "rook");
    }
}

class Knight extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "knight");
    }
}

class Bishop extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "bishop");
    }
}

class Queen extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "queen");
    }
}

class King extends ChessPiece {
    constructor(letter, number, color) {
        super(letter, number, color, "king");
    }
}

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
        console.log(this.board);
    }

    addPiece(piece) {
        this.board[`${piece.letter}${piece.number}`] = piece;
    }

    clearTile(letter, number) {
        this.board[`${letter}${number}`] = null;
    }

    exportToFEN() { // Copilot got really close with this one, but alas, I had to pick up the pieces
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
        return fen;
    }
}