import * as Phaser from 'phaser';
import { Board } from '../Board';
import { Cursor } from '../Cursor';
// import { gameWidth, gameHeight } from '../config';
// import { Piece } from '../Piece';

export class GameScene extends Phaser.Scene {
	board!: Board;
	cursor!: Cursor;
	constructor() {
		super('gameScene');
	}

	preload() {}

	create() {
		this.board = new Board(this, 0, 0);
		this.cursor = new Cursor(this);

		this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {});
	}
}
