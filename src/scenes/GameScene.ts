import * as Phaser from 'phaser';
import { Board } from '../Board';
import { Cursor } from '../Cursor';
import { AI } from "../AI";
import {TextParticle} from "../TextParticle";

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


		this.board.resetValidMoves();
		this.board.searchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
		this.board.drawValidMoves();

	}

	calculateScore() {
		let isFull = false;
		let playerScore = 0;
		let enemyScore = 0;
		for (let pieces of this.board.pieces) {
			for (let piece of pieces) {
				if (piece.state == -1) return;
				if (piece.state == 0) playerScore++;
				if (piece.state == 1) enemyScore++;
				isFull = true;
			}
		}

		if (!isFull) return -2;

		if (playerScore > enemyScore) return TurnState.PLAYER;
		else if (playerScore < enemyScore) return TurnState.ENEMY;
		else return -1;

	}

	private async putPiece(pointer: Phaser.Input.Pointer) {

		if (this.turnState == TurnState.ENEMY) return;

		let x = Math.floor(pointer.x / 32) - 1;
		let y = Math.floor(pointer.y / 32) - 1;

		if (this.board.getPiece(x, y)?.state != -1) return;
		if (this.board.boards[x][y].state == -1) return;

		this.board.resetValidMoves();
		await this.board.putPiece(x, y, TurnState.PLAYER, TurnState.ENEMY);

		this.board.searchValidMoves(TurnState.ENEMY, TurnState.PLAYER);

		if (this.board.validMoves.length == 0) {
			await this.delay(200);
			this.board.resetValidMoves();
			this.board.searchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
			this.board.drawValidMoves();

			return;
		}

		this.turnState = TurnState.ENEMY;

		await this.delay(500);

		await this.ai.putPiece();

		this.board.searchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
		while(this.board.validMoves.length == 0) {

			await this.delay(500);
			await this.ai.putPiece();

			this.board.resetValidMoves();
			this.board.searchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
		}

		await this.delay(200);

		this.board.resetValidMoves();
		this.board.searchValidMoves(TurnState.PLAYER, TurnState.ENEMY);
		this.board.drawValidMoves();

		this.turnState = TurnState.PLAYER;

		let winner = this.calculateScore();
		console.log(winner);
	}

	async countPieces() {
		let playerScore = 0;
		let enemyScore = 0;
		for (let pieces of this.board.pieces) {
			for (let piece of pieces) {
				piece.main.tint = 0x770000;
				if (piece.state == 0) playerScore++;
				if (piece.state == 1) enemyScore++;
				new TextParticle(this, piece.x, piece.y, playerScore.toString()).floatAnimation(-0.2);
				await this.delay(100);

			}
		}
		if (playerScore > enemyScore) console.log("勝ち");
	}

	delay(ms: number): Promise<void> {
		return new Promise(resolve => {
			this.time.delayedCall(ms, resolve, [], this);
		});
	}

	// private resetBoard() {}

	// private managedTurn() {}
}
