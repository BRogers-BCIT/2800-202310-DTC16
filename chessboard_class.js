const boardColumns = "abcdefgh";

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

    exportToFEN() {
        let fen = "";
        let emptyCounter = 0;
        for (let i = 0; i < 8; i++) {
            let emptyCounter = 0;
            for (let j = 0; j < 8; j++) {
                let letter = boardColumns[i];
                let piece = this.board[`${letter}${j + 1}`];
                if (piece == null) {
                    emptyCounter++;
                } else {
                    if (emptyCounter > 0) {
                        fen += emptyCounter;
                        emptyCounter = 0;
                    }
                    fen += piece.getFenLetter();
                }
            }
            if (emptyCounter > 0) {
                fen += emptyCounter;
                emptyCounter = 0;
            }
            fen += "/";
        }
        return fen;
    }
}