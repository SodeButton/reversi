import * as Phaser from 'phaser';

export class BoardPiece extends Phaser.GameObjects.Image {
	indexX: number;
	indexY: number;
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x * 32 + 32, y * 32 + 32, 'board', 0);

		this.indexX = x;
		this.indexY = y;

		this.scene.add.existing(this);
		this.setDepth(1);
		this.setOrigin(0);
		this.setName('BoardPiece');

		this.setInteractive();

		this.on('pointerdown', () => {
			console.log('clicked!');
		});
	}
}
