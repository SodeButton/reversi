import * as Phaser from 'phaser';
import { BoardPiece } from './BoardPiece';
import { Piece } from './Piece';

export class Board extends Phaser.GameObjects.Container {
	boards: BoardPiece[][] = new Array(8);
	pieces: Piece[][] = new Array(8);
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y);

		this.scene.add.existing(this);
		this.setDepth(1);
		this.setName('Board');

		this.drawEdge();

		this.initialize(scene);
	}

	initialize(scene: Phaser.Scene) {
		this.removeAll();
		for (let i = 0; i < 8; i++) {
			this.boards[i] = new Array(8).fill(null);
			this.pieces[i] = new Array(8).fill(null);
			for (let j = 0; j < 8; j++) {
				this.boards[i][j] = new BoardPiece(scene, i, j);
				this.add(this.boards[i][j]);

				this.pieces[i][j] = new Piece(scene, i, j);

				if ((i == 3 && j == 3) || (i == 4 && j == 4)) {
					this.pieces[i][j].setState('White');
					this.pieces[i][j].changePiece(1);
				}
				if ((i == 3 && j == 4) || (i == 4 && j == 3)) {
					this.pieces[i][j].setState('Black');
					this.pieces[i][j].changePiece(0);
				}
			}
		}
	}

	capturePiece(x: number, y: number) {
		if (this.getPiece(x, y) == null) return;
		this.pieces[x][y]?.destroy();
		// this.pieces[x][y] = null;
		console.log(this.pieces[x][y]);
	}

	public putPiece(x: number, y: number, color: number) {
		if (0 > x || x >= 8 || 0 > y || y >= 8) return;

		if (this.pieces[x][y].state == -1) {
			this.pieces[x][y].state = color;
			this.pieces[x][y].main.setFrame(color);
			this.pieces[x][y].shadow.setFrame(color);
		}
	}

	getPiece(x: number, y: number): Piece | null {
		if (0 > x || x >= 8 || 0 > y || y >= 8) return null;
		return this.pieces[x][y];
	}

	private drawEdge(): void {
		this.scene.add.image(16, 16, 'board_edge', 0);
		this.scene.add.image(32 * 10 - 16, 16, 'board_edge', 2);
		this.scene.add.image(16, 32 * 10 - 16, 'board_edge', 6);
		this.scene.add.image(32 * 10 - 16, 32 * 10 - 16, 'board_edge', 8);

		for (let i = 0; i < 8; i++) {
			this.scene.add.image(i * 32 + 48, 16, 'board_edge', 1);
			this.scene.add.image(i * 32 + 48, 32 * 10 - 16, 'board_edge', 7);
			this.scene.add.image(16, i * 32 + 48, 'board_edge', 3);
			this.scene.add.image(32 * 10 - 16, i * 32 + 48, 'board_edge', 5);
		}
	}
}
