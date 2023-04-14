import * as Phaser from 'phaser';
import { Board } from '../Board';
import { Cursor } from '../Cursor';
import { AI } from "../AI";

// import { gameWidth, gameHeight } from '../config';
// import { Piece } from '../Piece';

enum TurnState {
	PLAYER,
	ENEMY,
}

export class GameScene extends Phaser.Scene {
	board!: Board;
	cursor!: Cursor;
	turnState!: TurnState;
	ai!: AI;

	constructor() {
		super('gameScene');
	}

	preload() {}

	create() {
		this.initialize();
	}

	private initialize() {
		this.turnState = TurnState.PLAYER;
		this.board = new Board(this, 0, 0);

		this.cursor = new Cursor(this);

		this.ai = new AI(this.board);

		this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {});

		this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
			this.putPiece(pointer).then();
		});

		// this.board.pieces[3][3].flipAnimation().then();

		this.board.resetValidMoves();
		this.board.SearchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
		this.board.drawValidMoves();
	}

	private async putPiece(pointer: Phaser.Input.Pointer) {
		if (this.turnState == TurnState.ENEMY) return;

		let x = Math.floor(pointer.x / 32) - 1;
		let y = Math.floor(pointer.y / 32) - 1;

		if (this.board.getPiece(x, y)?.state != -1) return;
		if (this.board.boards[x][y].state == -1) return;

		this.board.resetValidMoves();
		await this.board.putPiece(x, y, TurnState.PLAYER, TurnState.ENEMY);


		this.board.SearchValidMoves(TurnState.ENEMY, TurnState.PLAYER);

		if (this.board.validMoves.length == 0) {
			await this.delay(200);
			this.board.resetValidMoves();
			this.board.SearchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
			this.board.drawValidMoves();

			return;
		}

		this.turnState = TurnState.ENEMY;

		await this.delay(500);

		await this.ai.putPiece();

		this.board.SearchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
		while(this.board.validMoves.length == 0) {

			await this.delay(500);
			await this.ai.putPiece();

			this.board.resetValidMoves();
			this.board.SearchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
		}

		await this.delay(200);

		this.board.resetValidMoves();
		this.board.SearchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
		this.board.drawValidMoves();

		this.turnState = TurnState.PLAYER;
	}

	delay(ms: number): Promise<void> {
		return new Promise(resolve => {
			this.time.delayedCall(ms, resolve, [], this);
		});
	}

	// private resetBoard() {}

	// private managedTurn() {}
}
