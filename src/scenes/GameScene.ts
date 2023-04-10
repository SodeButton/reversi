import * as Phaser from 'phaser';
import { Board } from '../Board';
import { Cursor } from '../Cursor';
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

		this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {});

		this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
			this.putPiece(pointer);
		});
	}

	private putPiece(pointer: Phaser.Input.Pointer) {
		let x = Math.floor(pointer.x / 32) - 1;
		let y = Math.floor(pointer.y / 32) - 1;

		

		console.log(x, y);

		this.board.putPiece(x, y, 0);
	}

	// private resetBoard() {}

	// private managedTurn() {}
}
