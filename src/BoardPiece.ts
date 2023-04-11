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
		this.setState('None');

		this.setInteractive();
		/*
		this.on('pointerdown', () => {
			console.log('clicked!');
		});
		*/
	}

	public changeValid(valid: any) {
		this.setState(valid);
		this.tint = 0x0000ff;
	}
}
