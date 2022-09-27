import * as Phaser from 'phaser';
import { Board } from '../Board';
// import { gameWidth, gameHeight } from '../config';
import { Piece } from '../Piece';

export class GameScene extends Phaser.Scene {
	board!: Board;
	constructor() {
		super('gameScene');
	}

	preload() {}

	create() {
		this.add.image(0, 0, 'tatami').setOrigin(0).setScale(5.5, 5);
		this.board = new Board(this, 0, 0);
		this.board.pieces[4][6] = new Piece(this, 4, 6, 'king', this.board);
		this.board.pieces[4][2] = new Piece(this, 4, 2, 'pawn', this.board, true);

		this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {});
	}
}
