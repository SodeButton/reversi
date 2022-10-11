import * as Phaser from 'phaser';
import { Board } from './Board';

export class Piece extends Phaser.GameObjects.Container {
	main: Phaser.GameObjects.Image;
	shadow: Phaser.GameObjects.Image;
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

		this.main = this.scene.add.image(0, 0, texture, Number(this.isEnemy));

		this.shadow = this.scene.add.image(4, 4, texture, Number(this.isEnemy));
		this.shadow.tint = 0x000000;
		this.shadow.setAlpha(0.6);

		this.add([this.shadow, this.main]);
	}

	changePiece(frame: number) {
		this.main.setFrame(frame);
	}
}
