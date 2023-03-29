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

				this.boards[i][j].on('pointerdown', () => {
					if (this.pieces[i][j].state == 'None') {
						this.pieces[i][j].state = nowPlayer;
						this.pieces[i][j].main.setFrame(1);
						this.pieces[i][j].shadow.setFrame(1);
						nowPlayer = nowPlayer == 'Black' ? 'White' : 'Black';

						// case 'White':
						// 	this.pieces[i][j].state = 'Black';
						// 	this.pieces[i][j].main.setFrame(0);
						// 	this.pieces[i][j].shadow.setFrame(0);
						// 	break;
						// case 'Black':
						// 	this.pieces[i][j].state = 'White';
						// 	this.pieces[i][j].main.setFrame(1);
						// 	this.pieces[i][j].shadow.setFrame(1);
						// 	break;
					}
				});
			}
		}
	}

	capturePiece(x: number, y: number) {
		if (this.getPiece(x, y) == null) return;
		this.pieces[x][y]?.destroy();
		// this.pieces[x][y] = null;
		console.log(this.pieces[x][y]);
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
