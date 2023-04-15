//import * as Phaser from 'phaser';
import { Board } from "./Board";

enum TurnState {
    PLAYER,
    ENEMY,
}

export class AI {
    board!: Board;
    constructor(board: Board) {
        this.board = board;
    }

    public async putPiece() {
        this.board.resetValidMoves();
        this.board.searchValidMoves(TurnState.ENEMY, TurnState.PLAYER);

        let minNextValid = this.board.validMoves[0];

        let minValidCount = 100;
        let testBoard: Board = this.board;

        this.board.validMoves.forEach((validMoves) => {

            testBoard.boards[validMoves.x][validMoves.y].changeValid(1);

            testBoard.searchValidMoves(TurnState.PLAYER, TurnState.ENEMY);

            if (minValidCount > testBoard.validMoves.length) {
                minValidCount = testBoard.validMoves.length;
                minNextValid = validMoves;
            }
        });

        testBoard.resetValidMoves();

        // put piece
        await this.board.putPiece(minNextValid.x, minNextValid.y, TurnState.ENEMY, TurnState.PLAYER);
    }
}