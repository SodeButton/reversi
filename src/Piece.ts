import * as Phaser from 'phaser';
import { Board } from './Board';

export class Piece extends Phaser.GameObjects.Container {
	main: Phaser.GameObjects.Image;
	shadow: Phaser.GameObjects.Image;
	hasPiece: boolean;
	indexX: number;
	indexY: number;
	board: Board;
	isEnemy: boolean;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		board: Board,
		isEnemy: boolean = false
	) {
		super(scene, x * 64 + 96, y * 64 + 256);

		this.indexX = x;
		this.indexY = y;
		this.board = board;
		this.isEnemy = isEnemy;

		this.scene.add.existing(this);
		this.setDepth(4);
		this.setName(texture);
		this.setState('down');

		if (!isEnemy) {
			this.setInteractive(
				new Phaser.Geom.Rectangle(-32, -32, 64, 64),
				Phaser.Geom.Rectangle.Contains
			);
		}
		this.hasPiece = false;

		this.main = this.scene.add.image(0, 0, texture, Number(this.isEnemy));

		this.shadow = this.scene.add.image(4, 4, texture, Number(this.isEnemy));
		this.shadow.tint = 0x000000;
		this.shadow.setAlpha(0.6);

		this.add([this.shadow, this.main]);

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				this.board.boards[i][j].on('pointerdown', () => {
					if (this.board.getPoint(i, j) && this.state == 'up') {
						this.indexX = i;
						this.indexY = j;
						this.setPosition(i * 64 + 96, j * 64 + 256);
						this.switchState('down');
						this.hasPiece = false;
						this.board.clearMovePoint();

						if (this.board.getPiece(i, j)?.isEnemy) {
							// TODO: killing enemy piece.
							this.board.capturePiece(i, j);
						}
					}
				});
			}
		}

		this.on('pointerdown', () => {
			if (this.isEnemy) return;
			if (!this.hasPiece) {
				this.hasPiece = true;
				this.switchState('up');
			} else {
				this.hasPiece = false;
				this.switchState('down');
			}
			this.searchCanMovePosition(this.hasPiece);
		});
	}

	searchCanMovePosition(flag: boolean) {
		switch (this.name) {
			case 'king':
				let p = [-1, 0, 1, -1, 1, -1, 0, 1];
				let q = [-1, -1, -1, 0, 0, 1, 1, 1];

				for (let i = 0; i < 8; i++) {
					let dx = this.indexX + p[i];
					let dy = this.indexY + q[i];
					//if (this.board.getPiece(dx, dy)?.isEnemy) continue;
					this.board.changePoint(dx, dy, flag);
				}
				break;
		}
	}

	switchState(state: string | number) {
		this.setState(state);
		switch (state) {
			case 'up':
				this.main.setPosition(0, 4);
				this.shadow.setPosition(8, 12);
				break;
			case 'down':
				this.main.setPosition(0, 0);
				this.shadow.setPosition(4, 4);
				break;
		}
	}
}
