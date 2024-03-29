import * as Phaser from 'phaser';
import { BoardPiece } from './BoardPiece';
import { Piece } from './Piece';

export class Board extends Phaser.GameObjects.Container {
	boards: BoardPiece[][] = new Array(8);
	pieces: Piece[][] = new Array(8);
	validMoves: {x: number, y: number}[] = [];

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
					this.pieces[i][j].changePiece(1);
				}
				if ((i == 3 && j == 4) || (i == 4 && j == 3)) {
					this.pieces[i][j].changePiece(0);
				}
			}
		}
	}
	public async flipPieces(x: number, y: number, player: number, enemy: number) {

		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				if (dx === 0 && dy === 0) continue;

				let nx = x + dx;
				let ny = y + dy;

				if (nx < 0 || ny < 0 || nx >= 8 || ny >= 8) continue;

				if (this.pieces[nx][ny].state != enemy) continue; //相手のこまではない

				let flippedPieces: Piece[] = [];

				let valid = false;

				while (1) {

					if (nx < 0 || ny < 0 || nx >= 8 || ny >= 8) break;

					if (this.pieces[nx][ny].state == player) {
						valid = true;
						break;
					}

					if (this.pieces[nx][ny].state == -1) break;

					if (this.pieces[nx][ny].state == enemy) {
						flippedPieces.push(this.pieces[nx][ny]);
					}

					nx += dx;
					ny += dy;
				}

				if (valid) {
					for (const piece of flippedPieces) {
						// piece.flipPiece();
						await piece.flipAnimation();
					}
				}
			}
		}
	}

	public searchValidMoves(player: number, enemy: number) {
		for (let x = 0; x < 8; x++) {
			for (let y = 0; y < 8; y++) {
				if (this.pieces[x][y].state != -1) continue;


				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -1; dy <= 1; dy++) {
						if (dx === 0 && dy === 0) continue;

						let nx = x + dx;
						let ny = y + dy;
						let valid = false;

						if (nx < 0 || ny < 0 || nx >= 8 || ny >= 8) continue;

						if (this.pieces[nx][ny].state != enemy) continue; //相手のこまではない

						while (1) {

							nx += dx;
							ny += dy;

							if (nx < 0 || ny < 0 || nx >= 8 || ny >= 8) break;

							if (this.pieces[nx][ny].state == player) {
								valid = true;
								break;
							}

							if (this.pieces[nx][ny].state == -1) break;
						}

						if (valid) {
							this.validMoves.push({x, y});
							break;
						}
					}
				}
			}
		}
	}

	public drawValidMoves() {
		this.validMoves.forEach((validKey) => {
			this.boards[validKey.x][validKey.y].state = "validMove";
			this.boards[validKey.x][validKey.y].changeValid(1);
		});
	}

	public resetValidMoves() {
		this.validMoves.forEach((validKey) => {
			this.boards[validKey.x][validKey.y].resetValid();
		});
		this.validMoves = [];
	}



	public async putPiece(x: number, y: number, player: number, enemy: number) {
		if (this.pieces[x][y].state == -1) {

			this.pieces[x][y].changePiece(player);
			this.pieces[x][y].playClickSE();

			await this.flipPieces(x, y, player, enemy);
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
