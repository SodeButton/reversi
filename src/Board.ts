import * as Phaser from 'phaser';
import { BoardPiece } from './BoardPiece';
import { Piece } from './Piece';

export class Board extends Phaser.GameObjects.Container {
	boards: BoardPiece[][] = new Array(9);
	pieces: Piece[][] | null[][] = new Array(9);
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y);

		this.scene.add.existing(this);
		this.setDepth(1);
		this.setName('Board');

		this.scene.add.image(32, 192, 'board_edge', 0);
		this.scene.add.image(9 * 64 + 96, 192, 'board_edge', 2);
		this.scene.add.image(32, 9 * 64 + 256, 'board_edge', 6);
		this.scene.add.image(9 * 64 + 96, 9 * 64 + 256, 'board_edge', 8);

		for (let i = 0; i < 9; i++) {
			this.scene.add.image(i * 64 + 96, 256 - 64, 'board_edge', 1);
			this.scene.add.image(i * 64 + 96, 9 * 64 + 256, 'board_edge', 7);
			this.scene.add.image(32, i * 64 + 256, 'board_edge', 3);
			this.scene.add.image(9 * 64 + 96, i * 64 + 256, 'board_edge', 5);
		}

		for (let i = 0; i < 9; i++) {
			this.boards[i] = new Array(9).fill(null);
			this.pieces[i] = new Array(9).fill(null);
			for (let j = 0; j < 9; j++) {
				this.boards[i][j] = new BoardPiece(scene, i, j);
				this.add(this.boards[i][j]);
			}
		}
	}

	capturePiece(x: number, y: number) {
		if (this.getPiece(x, y) == null) return;
		this.pieces[x][y]?.destroy();
		this.pieces[x][y] = null;
		console.log(this.pieces[x][y]);
	}

	getPiece(x: number, y: number): Piece | null {
		if (0 > x || x >= 9 || 0 > y || y >= 9) return null;
		return this.pieces[x][y];
	}

	getPoint(x: number, y: number) {
		if (0 > x || x >= 9 || 0 > y || y >= 9) return null;
		return this.boards[x][y].getPoint();
	}

	changePoint(x: number, y: number, flag: boolean) {
		if (0 > x || x >= 9 || 0 > y || y >= 9) return;
		this.boards[x][y].changeMovePoint(flag);
	}

	clearMovePoint() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				this.boards[i][j].changeMovePoint(false);
			}
		}
	}
}
